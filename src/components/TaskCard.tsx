import { Task } from "@/types";
import { Trash } from "phosphor-react";
import { StatusDropdown } from "./TaskCard/StatusDropdown";
import { SkeletonTaskCard } from "./TaskCard/SkeletonTaskCard";

interface TaskCardProps {
  task?: Task;
  onUpdate?: (id: number, updates: Partial<Task>) => void;  
  onDelete?: (id: number) => void;                          
  loading?: boolean;
}

export default function TaskCard({ task, onUpdate, onDelete, loading = false }: TaskCardProps) {
  if (loading) return <SkeletonTaskCard />;
  if (!task) return null;

  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 text-sm text-gray-700 border-t min-w-[600px]">
      <div className="truncate">{task.title}</div>

      <div className="text-blue-600 cursor-text whitespace-pre-wrap break-words">
        {task.description}
      </div>

      <div className="text-gray-500">{formattedDate}</div>

      <div>
        <StatusDropdown
          status={task.status}
          onChange={(newStatus) => onUpdate?.(task.id, { status: newStatus })}  
        />
      </div>

      <div>
        <button
          onClick={() => onDelete?.(task.id)}  
          className="text-red-500 hover:text-red-600"
          title="Delete Task"
        >
          <Trash size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}
