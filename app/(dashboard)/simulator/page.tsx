"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SimulatorShell } from "@/components/simulator/SimulatorShell";
import { RegistrationStep } from "@/components/simulator/RegistrationStep";
import { BoothWalkStep } from "@/components/simulator/BoothWalkStep";
import { EVMInteraction } from "@/components/simulator/EVMInteraction";
import { VoteCastAnimation } from "@/components/simulator/VoteCastAnimation";
import { CountingVisualization } from "@/components/simulator/CountingVisualization";

const steps = ["Intro", "Registration", "Voter Slip", "Booth Walk", "EVM", "Counting", "Result"];

export default function SimulatorPage() {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (step === steps.length - 1 && !saved) {
      fetch("/api/simulator/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completion_percentage: 100, steps_completed: steps, mock_vote_data: { candidate: "Aditi Rao" } }),
      }).finally(() => setSaved(true));
    }
  }, [saved, step]);

  const content = () => {
    if (step === 0)
      return (
        <div className="space-y-3">
          <p>Welcome to a guided election simulation.</p>
          <Button onClick={() => setStep(1)}>Start Simulation</Button>
        </div>
      );
    if (step === 1) return <RegistrationStep />;
    if (step === 2) return <p className="rounded-xl bg-indigo-50 p-3">Your EPIC voter slip is generated.</p>;
    if (step === 3) return <BoothWalkStep />;
    if (step === 4) return <EVMInteraction />;
    if (step === 5) return <CountingVisualization />;
    return (
      <div className="space-y-3">
        <VoteCastAnimation />
        <p className="text-sm text-slate-600">Your completion has been saved. Badge awarding runs automatically from the server.</p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Election Simulator</h2>
      <div className="grid grid-cols-7 gap-2 text-xs">
        {steps.map((s, i) => <div key={s} className={`rounded p-2 text-center ${i <= step ? "bg-indigo-600 text-white" : "bg-slate-200"}`}>{s}</div>)}
      </div>
      <SimulatorShell>{content()}</SimulatorShell>
      <div className="flex gap-2">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
        <Button disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next</Button>
      </div>
    </div>
  );
}
