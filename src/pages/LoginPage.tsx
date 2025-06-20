import React from "react";
import { useLoginForm } from "@/hooks/useLoginForm";
import { Input } from "@/components/FormElements";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const { register, handleSubmit, errors, loading, onSubmit } = useLoginForm(onLogin);
const testLoading = true;
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md w-full max-w-md p-8 space-y-6"
      >
        <div className="text-center">
          <p className="text-gray-500 text-sm">Please enter your details</p>
          <h2 className="text-2xl font-bold mt-1">Welcome back</h2>
        </div>

        <Input
          label="Email address"
          type="text"
          placeholder="Enter your email"
          {...register("username")}
          error={errors.username?.message}
          loading={loading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          loading={loading}
        />

      <button
  type="submit"
  disabled={loading}
  className={`w-full py-2 rounded transition text-white flex justify-center items-center gap-2 ${
    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
        />
      </svg>
      Logging in...
    </>
  ) : (
    "Login"
  )}
</button>

      </form>
    </div>
  );
};

export default LoginPage;
