import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <LoginForm />
    </div>
  );
}