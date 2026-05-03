"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function PledgeForm() {
  const [text, setText] = useState("I pledge to cast my vote in the upcoming election.");
  const [isPublic, setIsPublic] = useState(true);

  const submit = async () => {
    const res = await fetch("/api/pledge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pledgeText: text, isPublic }) });
    const data = await res.json();
    if (!res.ok) return toast.error(data.error || "Failed");
    confetti({ particleCount: 150, spread: 70, colors: ["#FF671F", "#FFFFFF", "#046A38"] });
    toast.success("Pledge submitted");
  };

  return (
    <div className="card p-4 space-y-3">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
      <div className="flex items-center justify-between"><span className="text-sm">Public</span><Switch checked={isPublic} onCheckedChange={setIsPublic} /></div>
      <Button className="w-full" onClick={submit}>Make My Pledge</Button>
    </div>
  );
}
