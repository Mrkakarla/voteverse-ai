"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  language: string;
  firstTime?: boolean;
  terms: boolean;
};

const states = ["Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];

export function SignupForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      state: "Andhra Pradesh",
      language: "en",
      firstTime: false,
      terms: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!hasSupabaseEnv) {
      toast.error("Connect Supabase to enable sign up.");
      return;
    }
   
     setLoading(true);
     const { data, error } = await supabase.auth.signUp({
       email: values.email,
       password: values.password,
       options: {
         data: {
           full_name: values.fullName,
           state: values.state,
           language_preference: values.language,
           is_first_time_voter: values.firstTime || false,
         },
       },
     });
     setLoading(false);
     if (error) return toast.error(error.message);

    // Supabase returns no session when email confirmation is required.
    if (!data.session) {
      toast.success("Account created. Please confirm your email, then log in.");
      router.push("/login");
      return;
    }

    toast.success("Account created");
    router.push("/dashboard?onboarding=true");
  };

  const onGoogle = async () => {
    if (!hasSupabaseEnv) {
      toast.error("Connect Supabase and enable Google OAuth to continue with Google.");
      return;
    }
   
     await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/callback` } });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Full Name</Label>
        <Input {...register("fullName", { required: "Full name is required", minLength: { value: 2, message: "Full name must be at least 2 characters" } })} />
        {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <Label>Confirm</Label>
          <Input type="password" {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value, formValues) => value === formValues.password || "Passwords do not match",
          })} />
          {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <div>
        <Label>State</Label>
        <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2" {...register("state", { required: "Choose a state" })}>{states.map((s) => <option key={s} value={s}>{s}</option>)}</select>
        {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
      </div>
      <div>
        <Label>Language</Label>
        <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2" {...register("language", { required: "Choose a language" })}>
          <option value="en">English</option><option value="hi">Hindi</option><option value="te">Telugu</option><option value="ta">Tamil</option><option value="kn">Kannada</option><option value="bn">Bengali</option><option value="mr">Marathi</option>
        </select>
        {errors.language && <p className="text-xs text-red-600">{errors.language.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("firstTime")} /> I am a first-time voter</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("terms", { validate: (value) => value || "Accept terms to continue" })} /> I accept Terms</label>
      {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}
      <Button className="w-full" type="submit" disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
      <Button className="w-full" type="button" variant="outline" onClick={onGoogle} disabled={!hasSupabaseEnv}>Continue with Google</Button>
      {process.env.NODE_ENV !== "production" && (
        <Link
          href="/api/dev/guest-access"
          className="block w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-800"
        >
          Skip signup (local guest mode)
        </Link>
      )}
      <p className="text-sm text-slate-600">Already have an account? <Link className="text-indigo-600" href="/login">Login</Link></p>
      {!hasSupabaseEnv && <p className="text-xs text-center text-amber-600">Connect Supabase to enable sign up and Google OAuth.</p>}
    </form>
  );
}
