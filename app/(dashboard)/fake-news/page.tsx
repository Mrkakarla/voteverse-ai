"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CredibilityMeter } from "@/components/fake-news/CredibilityMeter";
import { VerdictCard } from "@/components/fake-news/VerdictCard";

export default function FakeNewsPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    const res = await fetch("/api/fake-news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Fake News Checker</h2>
      <div className="card p-4 space-y-3">
        <Textarea rows={6} placeholder="Paste a headline, claim, or article URL" value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={check} disabled={loading}>{loading ? "Checking..." : "Check Now"}</Button>
      </div>
      {result?.credibility_score !== undefined && (
        <div className="space-y-3">
          <CredibilityMeter score={result.credibility_score} />
          <VerdictCard verdict={result.verdict} explanation={result.explanation} />
        </div>
      )}
    </div>
  );
}
