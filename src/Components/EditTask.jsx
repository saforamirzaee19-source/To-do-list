function EditTask({ editText, onEditTextChange, onSave, onCancel }) {
  return (
    <div className="flex items-center gap-2 flex-grow">
      <input
        type="text"
        value={editText}
        onChange={(e) => onEditTextChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
        className="flex-grow min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
      />

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
  );
}

export default EditTask;
