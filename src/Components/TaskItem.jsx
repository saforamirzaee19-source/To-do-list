function TaskItem({ task, onComplete, onDelete }) {
  return (
    <li className="flex items-center p-3 rounded-xl bg-slate-900 border border-slate-700">
      <span
        className={`flex-grow ${
          task.completed ? "line-through text-slate-500" : "text-slate-200"
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
        className="ml-2 px-3 py-1.5 text-sm rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:bg-slate-700 disabled:text-slate-500 transition-colors"
      >
        {task.completed ? "Done" : "Complete"}
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-2 px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
