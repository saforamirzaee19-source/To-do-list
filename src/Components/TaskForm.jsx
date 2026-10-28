import { useState } from "react";

function TaskForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const submitTask = () => {
    const text = input.trim();
    if (!text) return;

    onAdd(text, priority);
    setInput("");
    setPriority("Medium");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
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

      <button
        type="button"
        onClick={submitTask}
        className="px-5 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
      >
        Add
      </button>
    </div>
  );
}

export default TaskForm;
