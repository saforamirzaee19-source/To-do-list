import { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const initialTodos = [
  { id: 1, text: "Buy groceries", completed: true },
  { id: 2, text: "Finish the React project", completed: false },
  { id: 3, text: "Read 20 pages of a book", completed: false },
  { id: 4, text: "Go for a walk", completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">My Tasks</h1>
            <p className="mt-1 text-sm text-slate-400">
              {doneCount} of {todos.length} completed
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full bg-violet-500 transition-all duration-300"
                style={{
                  width: `${todos.length ? (doneCount / todos.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              type="text"
              placeholder="Add a new task"
              className="flex-grow rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={addTodo}
              className="rounded-xl bg-violet-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-violet-600"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {todos.length === 0 && (
              <li className="py-6 text-center text-slate-500">
                No tasks yet. Add your first one above.
              </li>
            )}
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center rounded-xl border border-slate-700 bg-slate-900 p-3"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3 h-5 w-5 cursor-pointer accent-violet-500"
                />
                <span
                  className={`flex-grow ${
                    todo.completed
                      ? "text-slate-500 line-through"
                      : "text-slate-200"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-2 rounded-lg px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
