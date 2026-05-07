'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/validators';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import Link from "next/link";
import { Radio } from "lucide-react";

export default function RegisterForm() {
  const { register: registerInContext } = useAuth();
  const router = useRouter();

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'teacher' },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');

      await registerInContext(data);

      router.push(
        data.role === 'teacher'
          ? ROUTES.TEACHER.DASHBOARD
          : ROUTES.PRINCIPAL.DASHBOARD
      );
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  // ─── Shared Input Class ─────────────────────────
  const inputCls = (hasError?: boolean) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none
    transition-all duration-200
    focus:ring-2 focus:ring-green-500 focus:border-transparent
    bg-green-950/40 text-white placeholder:text-green-300/40
    ${
      hasError
        ? 'border-red-500/60 bg-red-900/10'
        : 'border-green-500/30 hover:border-green-400/50'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a12] px-4">

      {/* ── Decorative background blobs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full
          bg-green-600/20 blur-3xl"
        />

        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full
          bg-emerald-600/15 blur-3xl"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #86efac 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div className="relative w-full max-w-md">

        {/* Logo + title */}
        <div className="flex flex-col items-center mb-8 gap-3">

          <div
            className="w-14 h-14 rounded-2xl bg-green-500/90
            flex items-center justify-center
            shadow-lg shadow-green-500/30"
          >
            <Radio className="w-7 h-7 text-white" />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              PulseBoard
            </h1>

            <p className="text-green-300/70 text-sm mt-0.5">
              Content Broadcasting System
            </p>
          </div>
        </div>

        {/* ── Glass Card ── */}
        <div
          className="rounded-2xl bg-green-900/30 border
          border-green-500/20 backdrop-blur-md
          shadow-2xl shadow-black/40 p-7"
        >

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Create account
            </h2>

            <p className="text-sm text-green-300/60 mt-0.5">
              Join as a teacher or principal
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-green-200">
                Full name
              </label>

              <input
                {...register('name')}
                type="text"
                placeholder="Devansh Tiwari"
                className={inputCls(!!errors.name)}
              />

              {errors.name && (
                <p className="text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-green-200">
                Email
              </label>

              <input
                {...register('email')}
                type="email"
                placeholder="you@school.com"
                className={inputCls(!!errors.email)}
              />

              {errors.email && (
                <p className="text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-green-200">
                Password
              </label>

              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className={inputCls(!!errors.password)}
              />

              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-green-200">
                I am a
              </label>

              <div className="grid grid-cols-2 gap-2">

                {(['teacher', 'principal'] as const).map((role) => (

                  <label
                    key={role}
                    className={`flex items-center justify-center gap-2
                    px-3 py-3 rounded-xl border transition-all
                    duration-200 text-sm font-medium cursor-pointer

                    ${
                      selectedRole === role
                        ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20'
                        : 'bg-green-950/40 text-green-200 border-green-500/20 hover:border-green-400/50 hover:bg-green-500/10'
                    }`}
                  >

                    <input
                      {...register('role')}
                      type="radio"
                      value={role}
                      className="hidden"
                    />

                    {role === 'teacher' ? '🎓' : '🏫'}

                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                ))}
              </div>

              {errors.role && (
                <p className="text-xs text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-3.5 py-2.5 rounded-xl
                bg-red-500/10 border border-red-500/30"
              >
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-400
              active:bg-green-600 text-white py-2.5 rounded-xl
              transition-all duration-200 text-sm font-semibold
              tracking-wide shadow-lg shadow-green-500/25
              disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">

                  <span
                    className="w-4 h-4 border-2 border-white/40
                    border-t-white rounded-full animate-spin"
                  />

                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>

            {/* Login link */}
            <p className="text-sm text-center text-green-300/50 mt-5">
              Already have an account?{' '}

              <Link
                href="/auth/login"
                className="font-medium text-green-300 hover:text-white
                transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
