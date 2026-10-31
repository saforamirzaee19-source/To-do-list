import { useState } from "react";

function TaskForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");

  const submitTask = () => {
    const text = input.trim();
    if (!dueDate) {
      setDateError("Please select a due date.");
      return;
    }
    if (!isValidDate(dueDate)) {
      setDateError("Please enter a valid due date.");
      return;
    }
    if (!text) return;

    onAdd(text, priority, dueDate);
    setInput("");
    setPriority("Medium");
    setDueDate("");
    setDateError("");
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitTask();
          }}
          placeholder="Add a new task..."
          aria-label="New task"
          className="flex-grow min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          aria-label="Task priority"
          className="px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => {
            setDueDate(event.target.value);
            setDateError("");
          }}
          aria-label="Task due date"
          required
          aria-invalid={Boolean(dateError)}
          className="px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
        />

        <button
          type="button"
          onClick={submitTask}
          className="px-5 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        >
          Add
        </button>
      </div>
      {dateError && <p className="mt-2 text-sm text-red-400">{dateError}</p>}
    </div>
  );
}

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

export default TaskForm;
