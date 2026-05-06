"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/validators";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

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

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-emerald-700
        text-white p-10 flex-col justify-between">
        <h1 className="text-2xl font-bold">Content Broadcasting</h1>
        <div>
          <h2 className="text-3xl font-semibold mb-3">
            Manage & Broadcast Educational Content
          </h2>
          <p className="text-sm opacity-80">
            Upload, approve, and share learning materials seamlessly.
          </p>
        </div>
        <p className="text-xs opacity-70">© 2026 CBS</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center p-6
        bg-green-50 dark:bg-gray-950">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl
          shadow-lg border border-green-100 dark:border-gray-700">

          <h2 className="text-2xl font-semibold mb-1 text-green-700 dark:text-green-400">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="you@school.com"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition
                  focus:ring-2 focus:ring-green-500 focus:border-transparent
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  ${errors.email
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-600'
                  }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition
                  focus:ring-2 focus:ring-green-500 focus:border-transparent
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  ${errors.password
                    ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-600'
                  }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20
                border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5
                rounded-lg transition duration-200 text-sm font-medium
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent
                    rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>

            {/* Register link */}
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/auth/register"
                className="font-medium text-green-600 dark:text-green-400 hover:underline">
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}