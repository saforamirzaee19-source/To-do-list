function EditTask({
  editText,
  editPriority,
  onEditTextChange,
  onEditPriorityChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="flex flex-col gap-3 flex-grow min-w-0">
      <input
        type="text"
        value={editText}
        onChange={(e) => onEditTextChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave();
          }

          if (e.key === "Escape") {
            onCancel();
          }
        }}
        aria-label="Edit task name"
        autoFocus
        className="w-full min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
      />

      <select
        value={editPriority}
        onChange={(e) => onEditPriorityChange(e.target.value)}
        aria-label="Edit task priority"
        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm rounded-lg bg-slate-600 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTask;
