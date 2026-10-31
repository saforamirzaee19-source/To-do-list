import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onDelete, onSaveEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const visibleTasks = tasks
    .filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesStatus =
        filter === "All" ||
        (filter === "Active" && !task.completed) ||
        (filter === "Completed" && task.completed);
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((first, second) => {
      if (sortOrder === "Newest") return compareIds(second.id, first.id);
      if (sortOrder === "Oldest") return compareIds(first.id, second.id);

      const firstDate = first.dueDate || "9999-12-31";
      const secondDate = second.dueDate || "9999-12-31";
      return (
        firstDate.localeCompare(secondDate) || compareIds(first.id, second.id)
      );
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

      <div className="flex flex-col sm:flex-row gap-2 mb-5">
        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Filter by priority"
          className="flex-1 px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
        >
          <option value="All">All priorities</option>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="Sort tasks"
          className="flex-1 px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Due Date">Due Date</option>
        </select>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="text-center text-slate-400 py-6">
          {searchTerm.trim() || filter !== "All" || priorityFilter !== "All"
            ? "No matching tasks found."
            : "No tasks yet. Add your first task!"}
        </p>
      ) : (
        <ul className="space-y-2">
          {visibleTasks.map((task) => (
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

function compareIds(firstId, secondId) {
  if (typeof firstId === "number" && typeof secondId === "number") {
    return firstId - secondId;
  }
  return String(firstId).localeCompare(String(secondId), undefined, {
    numeric: true,
  });
}

export default TaskList;
