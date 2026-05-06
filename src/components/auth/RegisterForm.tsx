'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/utils/validators';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import Link from "next/link";

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

  const inputCls = (hasError?: boolean) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition
    focus:ring-2 focus:ring-green-500 focus:border-transparent
    bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    ${hasError
      ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
      : 'border-gray-200 dark:border-gray-600'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center p-6
      bg-green-50 dark:bg-gray-950">

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl
        shadow-lg border border-green-100 dark:border-gray-700">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400">
            Create account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join as a teacher or principal
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full name
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Rajesh Kumar"
              className={inputCls(!!errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="you@school.com"
              className={inputCls(!!errors.email)}
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
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className={inputCls(!!errors.password)}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['teacher', 'principal'] as const).map((role) => (
                <label
                  key={role}
                  className={`flex items-center justify-center gap-2 px-3 py-3
                    rounded-xl border transition text-sm font-medium cursor-pointer
                    ${selectedRole === role
                      ? "bg-green-600 text-white border-green-600 shadow"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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
              <p className="text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20
              border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-green-600 text-white text-sm font-medium
              rounded-lg hover:bg-green-700 active:scale-[0.98] transition
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent
                  rounded-full animate-spin" />
                Creating account...
              </span>
            ) : 'Create account'}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login"
              className="text-green-600 dark:text-green-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}