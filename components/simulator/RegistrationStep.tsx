import { Input } from "@/components/ui/input";

export function RegistrationStep() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Input placeholder="Full name" />
      <Input placeholder="DOB" type="date" />
      <Input placeholder="Address" />
      <Input placeholder="Constituency" />
    </div>
  );
}
