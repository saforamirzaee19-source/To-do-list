import { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TaskItem from "./Components/TaskItem";

const initialTodos = [
  {
    id: 1,
    text: "Buy groceries",
    completed: false,
    priority: "Medium",
  },
  {
    id: 2,
    text: "Finish the React project",
    completed: false,
    priority: "High",
  },
  {
    id: 3,
    text: "Go for a walk",
    completed: false,
    priority: "Low",
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Add a new task
  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput("");
    setPriority("Medium");
  };

  // Complete a task
  const completeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditPriority(task.priority || "Medium");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditPriority("Medium");
  };

  // Save edited task
  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: editText.trim(),
              priority: editPriority,
            }
          : todo,
      ),
    );

    cancelEdit();
  };

  // Task counts
  const totalCount = todos.length;

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const completedCount = todos.filter((todo) => todo.completed).length;

  // Search and filter
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !todo.completed) ||
      (filter === "Completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-6 sm:p-8">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">TaskFlow</h1>

            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span className="text-slate-300">Total: {totalCount}</span>

              <span className="text-blue-400">Active: {activeCount}</span>

              <span className="text-green-400">
                Completed: {completedCount}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="w-full min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-5">
            {["All", "Active", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === item
                    ? "bg-violet-600 text-white"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Add Task */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              placeholder="Add a new task..."
              className="flex-grow min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Task priority"
              className="px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              type="button"
              onClick={addTodo}
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          {filteredTodos.length === 0 ? (
            <p className="text-center text-slate-400 py-6">
              {searchTerm.trim() || filter !== "All"
                ? "No matching tasks found."
                : "No tasks yet. Add your first task!"}
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredTodos.map((todo) => (
                <TaskItem
                  key={todo.id}
                  task={todo}
                  onComplete={completeTodo}
                  onDelete={deleteTodo}
                  isEditing={editingId === todo.id}
                  editText={editText}
                  editPriority={editPriority}
                  onEditTextChange={setEditText}
                  onEditPriorityChange={setEditPriority}
                  onStartEdit={startEdit}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                />
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
