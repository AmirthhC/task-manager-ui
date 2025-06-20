import React from "react";
import { Input, Textarea, Select } from "@/components/FormElements";
import { useTaskForm } from "@/hooks/useTaskForm";

interface TaskFormProps {
  onSubmit: (task: any) => void;
  loading?: boolean;
}

export default function TaskForm({ onSubmit, loading = false }: TaskFormProps) {
  const { register, handleSubmit, errors, resetForm } = useTaskForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="grid gap-6 bg-white p-6 rounded-xl shadow-md"
    >
      <Input
        label="Title"
        placeholder="Enter task title"
        {...register("title")}
        error={errors.title?.message}
        loading={loading}
      />

      <Textarea
        label="Description"
        placeholder="Enter task description"
        {...register("description")}
        error={errors.description?.message}
        loading={loading}
      />

      <Input
        label="Due Date"
        type="date"
        {...register("dueDate")}
        error={errors.dueDate?.message}
        loading={loading}
      />

      <Select
        label="Status"
        {...register("status")}
        error={errors.status?.message}
        loading={loading}
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </Select>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-full text-sm shadow text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
