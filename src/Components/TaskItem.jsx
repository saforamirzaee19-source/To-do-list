import { useState } from "react";
import { DEFAULT_PRIORITY, PRIORITIES } from "../constants";
import { isOverdue, isValidDate, isValidPriority } from "../utils";

function TaskItem({ task, onComplete, onDelete, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(
    task.priority || DEFAULT_PRIORITY,
  );
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [dateError, setDateError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const priorityColor =
    task.priority === PRIORITIES[2]
      ? "text-red-400"
      : task.priority === DEFAULT_PRIORITY
        ? "text-yellow-400"
        : "text-green-400";

  const startEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority || DEFAULT_PRIORITY);
    setEditDueDate(task.dueDate || "");
    setDateError("");
    setPriorityError("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    if (!isValidPriority(editPriority)) {
      setPriorityError("Please select a valid priority.");
      return;
    }
    if (!editDueDate) {
      setDateError("Please select a due date.");
      return;
    }
    if (!isValidDate(editDueDate)) {
      setDateError("Please enter a valid due date.");
      return;
    }

    onSaveEdit(task.id, {
      text: editText.trim(),
      priority: editPriority,
      dueDate: editDueDate,
    });

    setIsEditing(false);
  };

  return (
    <li className="group flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-100 hover:shadow-lg hover:shadow-violet-100/70">
      {isEditing ? (
        <div className="flex flex-col gap-3 flex-grow min-w-0">
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") saveEdit();
              if (event.key === "Escape") cancelEdit();
            }}
            aria-label="Edit task name"
            autoFocus
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />

          <select
            value={editPriority}
            onChange={(event) => {
              setEditPriority(event.target.value);
              setPriorityError("");
            }}
            aria-label="Edit task priority"
            required
            aria-invalid={Boolean(priorityError)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item} Priority
              </option>
            ))}
          </select>
          {priorityError && <p className="text-sm text-red-400">{priorityError}</p>}

          <input
            type="date"
            value={editDueDate}
            onChange={(event) => {
              setEditDueDate(event.target.value);
              setDateError("");
            }}
            aria-label="Edit due date"
            required
            aria-invalid={Boolean(dateError)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
          {dateError && <p className="text-sm text-red-400">{dateError}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              Save
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0 break-words">
            <span
              className={
                task.completed
                  ? "text-slate-400 line-through"
                  : "font-semibold leading-6 text-slate-800"
              }
            >
              {task.text}
            </span>

            <span className={`block text-xs mt-1 ${priorityColor}`}>
              Priority: {task.priority || DEFAULT_PRIORITY}
            </span>
            {task.dueDate && isValidDate(task.dueDate) && (
              <span className="mt-2 block text-xs text-slate-500">
                Due: {task.dueDate}
              </span>
            )}
            {task.dueDate && !isValidDate(task.dueDate) && (
              <span className="block text-xs mt-1 text-red-400">
                Invalid due date.
              </span>
            )}
            {!task.completed &&
              task.dueDate &&
              isValidDate(task.dueDate) &&
              isOverdue(task.dueDate) && (
              <span className="block text-xs mt-1 font-semibold text-red-400">
                Overdue
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={startEdit}
            className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => onComplete(task.id)}
            disabled={task.completed}
            className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
          >
            {task.completed ? "Done" : "Complete"}
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
