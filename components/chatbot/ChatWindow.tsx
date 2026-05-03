"use client";

import { useEffect, useState } from "react";
import { MessageBubble } from "@/components/chatbot/MessageBubble";
import { TypingIndicator } from "@/components/chatbot/TypingIndicator";
import { VoiceInput } from "@/components/chatbot/VoiceInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; language: string };

type ChatWindowProps = {
  initialPrompt?: string;
};

export function ChatWindow({ initialPrompt }: ChatWindowProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/chat/conversations");
      if (!res.ok) return;
      const data = await res.json();
      setConversations(data.conversations || []);
      if ((data.conversations || []).length > 0) {
        setConversationId(data.conversations[0].id);
        const msgRes = await fetch(`/api/chat/messages?conversationId=${data.conversations[0].id}`);
        if (msgRes.ok) {
          const msgData = await msgRes.json();
          setMessages(msgData.messages || []);
        }
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setText(initialPrompt);
    }
  }, [initialPrompt]);

  const newChat = async () => {
    const res = await fetch("/api/chat/conversations", { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setConversations((prev) => [data.conversation, ...prev]);
    setConversationId(data.conversation.id);
    setMessages([]);
  };

  const loadConversation = async (id: string) => {
    setConversationId(id);
    const res = await fetch(`/api/chat/messages?conversationId=${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data.messages || []);
  };

  const send = async () => {
    if (!text.trim()) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setText("");
    setLoading(true);
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next, conversationId, language: "en" }) });
    const data = await res.json();
    setLoading(false);
    setMessages((m) => [...m, { role: "assistant", content: data.message || "Please try again." }]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold">Conversations</h3>
          <Button variant="outline" onClick={newChat}>New Chat</Button>
        </div>
        <div className="space-y-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-slate-500">No chats yet.</p>
          ) : (
            conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => loadConversation(c.id)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${conversationId === c.id ? "bg-indigo-600 text-white" : "bg-white"}`}
              >
                {c.title}
              </button>
            ))
          )}
        </div>
      </aside>

      <div className="card flex h-[70vh] flex-col p-4">
        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {messages.map((m, i) => <MessageBubble key={i} role={m.role} content={m.content} />)}
          {loading && <TypingIndicator />}
        </div>
        <div className="mt-3 grid gap-2">
          <div className="flex gap-2 text-xs text-slate-500">
            {["Am I eligible to vote?", "What documents do I need?", "How does counting work?", "When is the next election?"].map((chip) => (
              <button key={chip} className="rounded-full border px-3 py-1" onClick={() => setText(chip)}>
                {chip}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about voting, registration, counting..." onKeyDown={(e) => e.key === "Enter" && send()} />
            <VoiceInput onTranscript={(t) => setText(t)} />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
