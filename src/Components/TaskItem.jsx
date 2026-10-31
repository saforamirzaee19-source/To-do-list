import { useState } from "react";

function TaskItem({ task, onComplete, onDelete, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || "Medium");
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [dateError, setDateError] = useState("");

  const priorityColor =
    task.priority === "High"
      ? "text-red-400"
      : task.priority === "Medium"
        ? "text-yellow-400"
        : "text-green-400";

  const startEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority || "Medium");
    setEditDueDate(task.dueDate || "");
    setDateError("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    if (editDueDate && !isValidDate(editDueDate)) {
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
    <li className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-700">
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
            className="w-full min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
          />

          <select
            value={editPriority}
            onChange={(event) => setEditPriority(event.target.value)}
            aria-label="Edit task priority"
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            type="date"
            value={editDueDate}
            onChange={(event) => {
              setEditDueDate(event.target.value);
              setDateError("");
            }}
            aria-label="Edit due date"
            aria-invalid={Boolean(dateError)}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
          />
          {dateError && <p className="text-sm text-red-400">{dateError}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white"
            >
              Save
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-600 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow min-w-0">
            <span
              className={
                task.completed
                  ? "line-through text-slate-500"
                  : "text-slate-200"
              }
            >
              {task.text}
            </span>

            <span className={`block text-xs mt-1 ${priorityColor}`}>
              Priority: {task.priority || "Medium"}
            </span>
            {task.dueDate && isValidDate(task.dueDate) && (
              <span className="block text-xs mt-1 text-slate-400">
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
            className="px-3 py-1.5 text-sm rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => onComplete(task.id)}
            disabled={task.completed}
            className="px-3 py-1.5 text-sm rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
          >
            {task.completed ? "Done" : "Complete"}
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function isOverdue(value) {
  const today = new Date().toLocaleDateString("en-CA");
  return value < today;
}
