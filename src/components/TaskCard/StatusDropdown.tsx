import { Task } from "@/types";

interface Props {
  status: Task["status"];
  onChange: (value: Task["status"]) => void;
}

export const StatusDropdown = ({ status, onChange }: Props) => {
  const colorMap = {
    "To-Do": "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as Task["status"])}
      className={`px-3 py-1 rounded-full text-xs font-semibold outline-none cursor-pointer ${colorMap[status]}`}
    >
      <option value="To-Do">To-Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  );
};
