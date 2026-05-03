"use client";

import { Mic } from "lucide-react";

export function VoiceInput({ onTranscript }: { onTranscript: (text: string) => void }) {
  const start = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.onresult = (e: any) => onTranscript(e.results[0][0].transcript);
    rec.start();
  };

  return <button type="button" onClick={start} className="rounded-xl border p-2"><Mic className="h-4 w-4" /></button>;
}
