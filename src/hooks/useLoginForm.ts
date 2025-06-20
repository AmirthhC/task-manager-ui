import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, loginSchema } from "@/validation/formSchemas";
import { showToast } from "@/utils/toastHelper";

export const useLoginForm = (onLogin: () => void) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const { username, password } = data;

    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );
      const users = await res.json();

      if (users.length > 0) {
        localStorage.setItem("token", "fake-token");
        showToast("Logged in successfully!", "success");
        onLogin();
        navigate("/dashboard");
      } else {
        showToast("Invalid credentials", "error");
      }
    } catch {
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  };
};
