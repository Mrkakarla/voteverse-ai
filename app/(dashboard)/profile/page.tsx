"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { XPBar } from "@/components/gamification/XPBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

const allBadges = ["First Login", "Voter Registered", "Simulator Pro", "Truth Seeker", "Civic Champion"];

export default function ProfilePage() {
  const { profile, supabase } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ full_name: profile?.full_name || "", phone: "", state: profile?.state || "", district: profile?.district || "", language_preference: profile?.language_preference || "en" });
  const fileRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    if (!profile?.id || !supabase) return;
    const { error } = await supabase.from("profiles").update(form).eq("id", profile.id);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
  };

  const upload = async (file?: File) => {
    if (!file || !profile?.id || !supabase) return;
    const path = `${profile.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", profile.id);
    toast.success("Avatar uploaded");
  };

  const deleteAccount = async () => {
    if (!profile?.id) return;

    const confirmed = window.confirm("Delete your account and all profile data? This cannot be undone.");
    if (!confirmed) return;

    const response = await fetch("/api/account/delete", { method: "DELETE" });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      toast.error(payload?.error || "Unable to delete account");
      return;
    }

    toast.success("Account deleted");
    router.push("/");
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="card p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <Input value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} placeholder="Full name" />
          <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="Phone" />
          <Input value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} placeholder="State" />
          <Input value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))} placeholder="District" />
        </div>
        <div className="flex items-center gap-2"><Button onClick={() => fileRef.current?.click()} variant="outline">Upload Avatar</Button><input ref={fileRef} type="file" className="hidden" onChange={(e) => upload(e.target.files?.[0])} /></div>
        <Button onClick={save}>Save Changes</Button>
      </div>
      <div className="card p-4"><p className="mb-2 text-sm">XP Progress</p><XPBar value={Math.min(100, ((profile?.xp_points || 0) % 200) / 2)} /></div>
      <div className="grid gap-2 md:grid-cols-3">{allBadges.map((b, i) => <BadgeCard key={b} name={b} earned={i < 2} />)}</div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="mb-2 font-semibold text-red-700">Danger Zone</p><Button type="button" variant="outline" className="border-red-300 text-red-700" onClick={deleteAccount}>Delete account</Button></div>
    </div>
  );
}
