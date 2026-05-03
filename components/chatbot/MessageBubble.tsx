import { cn } from "@/lib/utils";

export function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", role === "user" ? "ml-auto bg-indigo-600 text-white" : "bg-white border")}>
      {content}
    </div>
  );
}
