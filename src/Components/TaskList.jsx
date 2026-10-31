import { useState } from "react";
import TaskItem from "./TaskItem";
import {
  DEFAULT_PRIORITY_FILTER,
  DEFAULT_STATUS_FILTER,
  DEFAULT_TASK_SORT,
  PRIORITY_FILTERS,
  TASK_SORT_OPTIONS,
  TASK_STATUS_FILTERS,
} from "../constants";
import { compareIds } from "../utils";

function TaskList({ tasks, onComplete, onDelete, onSaveEdit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(DEFAULT_STATUS_FILTER);
  const [priorityFilter, setPriorityFilter] = useState(DEFAULT_PRIORITY_FILTER);
  const [sortOrder, setSortOrder] = useState(DEFAULT_TASK_SORT);

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
          className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {TASK_STATUS_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === item
                ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
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
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        >
          {PRIORITY_FILTERS.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All priorities" : `${item} priority`}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="Sort tasks"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        >
          {TASK_SORT_OPTIONS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-slate-500">
          {searchTerm.trim() ||
          filter !== DEFAULT_STATUS_FILTER ||
          priorityFilter !== DEFAULT_PRIORITY_FILTER
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

export default TaskList;
