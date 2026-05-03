import { Progress } from "@/components/ui/progress";

export function XPBar({ value }: { value: number }) {
  return <Progress value={value} />;
}
