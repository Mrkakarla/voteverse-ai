import { ChatWindow } from "@/components/chatbot/ChatWindow";

export default function ChatbotPage({
  searchParams,
}: {
  searchParams?: { topic?: string };
}) {
  const initialPrompt = searchParams?.topic || "";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vira AI Assistant</h2>
      <ChatWindow initialPrompt={initialPrompt} />
    </div>
  );
}
