import type { Metadata } from 'next';
import { Logo } from '@/components/layout/Logo';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute top-10 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
      <div className="relative w-full max-w-sm bg-white border border-gray-100 rounded-3xl shadow-xl p-8 animate-fade-up">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-xl font-bold text-gray-900 text-center">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">Sign in to manage your portfolio.</p>
        <LoginForm />
      </div>
    </div>
  );
}
