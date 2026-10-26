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

  // Add a new task
  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority: priority,
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

  // Count incomplete tasks
  const incompleteCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">TaskFlow</h1>

            <p className="text-sm text-slate-400 mt-2">
              {incompleteCount} {incompleteCount === 1 ? "task" : "tasks"} left
            </p>
          </div>

          {/* Add Task */}
          <div className="mb-6 flex flex-col sm:flex-row gap-2">
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
              aria-label="New task priority"
              className="px-3 py-2.5 bg-slate-900 text-white border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              type="button"
              onClick={addTodo}
              className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Task List */}
          {todos.length === 0 ? (
            <p className="text-center text-slate-400 py-8">
              No tasks yet. Add your first task!
            </p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
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
