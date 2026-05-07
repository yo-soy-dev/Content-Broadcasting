"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/validators";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { Eye, EyeOff, Radio } from "lucide-react";

// ─── Demo credentials ────────────────────────────────────────────────────────
const DEMO_CREDENTIALS = [
  {
    role: "Principal",
    email: "principal@school.edu",
    password: "password123",
  },
  {
    role: "Teacher",
    email: "teacher@school.edu",
    password: "password123",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      const user = await login(data);
      router.push(
        user?.role === "teacher"
          ? ROUTES.TEACHER.DASHBOARD
          : ROUTES.PRINCIPAL.DASHBOARD
      );
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  // ── Fill demo creds ───────────────────────────────────────────────────────
  const fillCredentials = (email: string, password: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
    setError("");
  };

  // ─── Shared input class ───────────────────────────────────────────────────
  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    bg-indigo-950/40 text-white placeholder:text-indigo-300/40
    ${
      hasError
        ? "border-red-500/60 bg-red-900/10"
        : "border-indigo-500/30 hover:border-indigo-400/50"
    }`;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1235] px-4">

      {/* ── Decorative background blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full
          bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full
          bg-violet-600/15 blur-3xl" />
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div className="relative w-full max-w-sm">

        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/90 flex items-center
            justify-center shadow-lg shadow-indigo-500/30">
            <Radio className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              EduBroadcast
            </h1>
            <p className="text-indigo-300/70 text-sm mt-0.5">
              Content Broadcasting System
            </p>
          </div>
        </div>

        {/* Glass card */}
        <div className="rounded-2xl bg-indigo-900/30 border border-indigo-500/20
          backdrop-blur-md shadow-2xl shadow-black/40 p-7">

          {/* Sign in heading */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Sign in</h2>
            <p className="text-sm text-indigo-300/60 mt-0.5">
              Access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-indigo-200">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@school.edu"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-indigo-200">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(!!errors.password)} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-indigo-300/50 hover:text-indigo-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* API / auth error */}
            {error && (
              <div className="px-3.5 py-2.5 rounded-xl bg-red-500/10
                border border-red-500/30">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600
                text-white py-2.5 rounded-xl transition-all duration-200 text-sm
                font-semibold tracking-wide shadow-lg shadow-indigo-500/25
                disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40
                    border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* ── Demo credentials ── */}
          <div className="mt-6 pt-5 border-t border-indigo-500/20">
            <p className="text-[10px] font-semibold uppercase tracking-widest
              text-indigo-400/50 mb-3">
              Demo Credentials
            </p>

            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillCredentials(cred.email, cred.password)}
                  className="w-full flex items-center justify-between px-4 py-3
                    rounded-xl border border-indigo-500/20 bg-indigo-950/40
                    hover:border-indigo-400/50 hover:bg-indigo-500/10
                    transition-all duration-150 group text-left"
                >
                  <div>
                    <p className="text-xs font-semibold text-indigo-200">
                      {cred.role}
                    </p>
                    <p className="text-[11px] text-indigo-300/50 font-mono mt-0.5">
                      {cred.email}
                    </p>
                  </div>
                  <span className="text-xs text-indigo-400 opacity-0
                    group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Click to use →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Register link */}
          <p className="text-sm text-center text-indigo-300/50 mt-5">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-300 hover:text-white
                transition-colors hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
