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
          onChange={(event) => {
            setPriority(event.target.value);
            setPriorityError("");
          }}
          aria-label="Task priority"
          required
          aria-invalid={Boolean(priorityError)}
          className="px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
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
      {priorityError && (
        <p className="mt-2 text-sm text-red-400">{priorityError}</p>
      )}
      {dateError && <p className="mt-2 text-sm text-red-400">{dateError}</p>}
    </div>
  );
}

export default TaskForm;
