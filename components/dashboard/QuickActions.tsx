import Link from "next/link";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      <Link href="/simulator" className="rounded-xl border bg-white p-3 text-sm">Start Simulation</Link>
      <Link href="/chatbot" className="rounded-xl border bg-white p-3 text-sm">Chat with AI</Link>
      <Link href="/fake-news" className="rounded-xl border bg-white p-3 text-sm">Check News</Link>
      <Link href="/booth-locator" className="rounded-xl border bg-white p-3 text-sm">Find Booth</Link>
    </div>
  );
}
