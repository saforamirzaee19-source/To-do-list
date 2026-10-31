import { useState } from "react";
import { DEFAULT_PRIORITY, PRIORITIES } from "../constants";
import { isValidDate, isValidPriority } from "../utils";

function TaskForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(DEFAULT_PRIORITY);
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const submitTask = () => {
    const text = input.trim();
    if (!isValidPriority(priority)) {
      setPriorityError("Please select a valid priority.");
      return;
    }
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
    setPriority(DEFAULT_PRIORITY);
    setDueDate("");
    setDateError("");
    setPriorityError("");
  };

  return (
    <div className="mb-8">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitTask();
          }}
          placeholder="Add a new task..."
          aria-label="New task"
          className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
        />

        <select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
            setPriorityError("");
          }}
          aria-label="Task priority"
          required
          aria-invalid={Boolean(priorityError)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        >
          {PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
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
          className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        />

        <button
          type="button"
          onClick={submitTask}
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-200"
        >
          Add
        </button>
      </div>
      {priorityError && (
        <p className="mt-2 text-sm text-red-400">{priorityError}</p>
      )}
      {dateError && <p className="mt-2 text-sm text-red-400">{dateError}</p>}
    </div>
  );
}

export default TaskForm;
