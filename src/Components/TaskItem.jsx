import EditTask from "./EditTask";

function TaskItem({
  task,
  onComplete,
  onDelete,
  isEditing,
  editText,
  onEditTextChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <li className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-700">
      {isEditing ? (
        <EditTask
          editText={editText}
          onEditTextChange={onEditTextChange}
          onSave={() => onSaveEdit(task.id)}
          onCancel={onCancelEdit}
        />
      ) : (
        <>
          <span
            className={`flex-grow ${
              task.completed ? "line-through text-slate-500" : "text-slate-200"
            }`}
          >
            {task.text}
          </span>

          <button
            onClick={() => onStartEdit(task)}
            className="ml-2 px-3 py-1.5 text-sm rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="ml-2 px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>

          <button
            onClick={() => onComplete(task.id)}
            disabled={task.completed}
            className="ml-2 px-3 py-1.5 text-sm rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
          >
            {task.completed ? "Done" : "Complete"}
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
