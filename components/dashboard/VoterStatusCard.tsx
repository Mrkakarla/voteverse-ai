import { Badge } from "@/components/ui/badge";

export function VoterStatusCard({ status }: { status: "unknown" | "registered" | "not_registered" }) {
  const map = {
    registered: "bg-green-100 text-green-700",
    unknown: "bg-yellow-100 text-yellow-700",
    not_registered: "bg-red-100 text-red-700",
  } as const;
  return <Badge className={map[status]}>{status.replace("_", " ")}</Badge>;
}
