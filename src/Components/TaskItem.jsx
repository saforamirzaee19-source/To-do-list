import { useState } from "react";
import EditTask from "./EditTask";

function TaskItem({ task, onComplete, onDelete, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || "Medium");

  const priorityColor =
    task.priority === "High"
      ? "text-red-400"
      : task.priority === "Medium"
        ? "text-yellow-400"
        : "text-green-400";

  const startEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority || "Medium");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    onSaveEdit(task.id, {
      text: editText.trim(),
      priority: editPriority,
    });

    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-700">
      {isEditing ? (
        <EditTask
          editText={editText}
          editPriority={editPriority}
          onEditTextChange={setEditText}
          onEditPriorityChange={setEditPriority}
          onSave={saveEdit}
          onCancel={cancelEdit}
        />
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
