import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormValues } from "@/validation/formSchemas";

export const useTaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "To-Do",
    },
  });

  const resetForm = () => reset();

  return {
    register,
    handleSubmit,
    errors,
    resetForm,
  };
};
