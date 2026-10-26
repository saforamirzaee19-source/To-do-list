import { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TaskItem from "./Components/TaskItem";

const initialTodos = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish the React project", completed: false },
  { id: 3, text: "Go for a walk", completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  // Editing states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add a new task
  const addTodo = () => {
    if (!input.trim()) {
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
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

    // Cancel editing if the deleted task was being edited
    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Cancel editing without changing the original text
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Save edited task
  const saveEdit = (id) => {
    if (!editText.trim()) {
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo,
      ),
    );

    cancelEdit();
  };

  // Count incomplete tasks
  const incompleteCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">TaskFlow</h1>

            <p className="text-sm text-slate-400 mt-1">
              {incompleteCount} {incompleteCount === 1 ? "task" : "tasks"} left
            </p>
          </div>

          {/* Add Task */}
          <div className="mb-5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              type="text"
              placeholder="Add a new task"
              className="flex-grow min-w-0 px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              onClick={addTodo}
              className="bg-violet-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-violet-600 transition-colors"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TaskItem
                key={todo.id}
                task={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
                isEditing={editingId === todo.id}
                editText={editText}
                onEditTextChange={setEditText}
                onStartEdit={startEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
              />
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
