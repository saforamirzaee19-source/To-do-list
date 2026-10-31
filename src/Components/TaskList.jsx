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
          className="w-full min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
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
          className="flex-1 px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
        >
          {TASK_SORT_OPTIONS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="text-center text-slate-400 py-6">
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
