import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onDelete, onSaveEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {["All", "Active", "Completed"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === item
                ? "bg-violet-600 text-white"
                : "bg-slate-900 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-slate-400 py-6">
          {searchTerm.trim() || filter !== "All"
            ? "No matching tasks found."
            : "No tasks yet. Add your first task!"}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onSaveEdit={onSaveEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
