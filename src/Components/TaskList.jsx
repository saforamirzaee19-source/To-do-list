import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";
import useTodos from "../Hooks/useTodos";
import {
  DEFAULT_PRIORITY_FILTER,
  DEFAULT_STATUS_FILTER,
  DEFAULT_TASK_SORT,
} from "../constants";
import { compareIds } from "../utils";

function TaskList() {
  const { todos: tasks, completeTodo, deleteTodo, saveEdit } = useTodos();
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
      <TaskFilters searchTerm={searchTerm} onSearchChange={setSearchTerm}
        filterState={{ filter, setFilter, priorityFilter, setPriorityFilter, sortOrder, setSortOrder }} />

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
              onComplete={completeTodo}
              onDelete={deleteTodo}
              onSaveEdit={saveEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
