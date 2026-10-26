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

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const completeTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: true } : t)));
  };

  const incompleteCount = todos.filter((t) => !t.completed).length;

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">My Tasks</h1>
            <p className="text-sm text-slate-400 mt-1">
              {incompleteCount} {incompleteCount === 1 ? "task" : "tasks"} left
            </p>
          </div>

          <div className="mb-5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              type="text"
              placeholder="Add a new task"
              className="flex-grow px-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={addTodo}
              className="bg-violet-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-violet-600 transition-colors"
            >
              Add Task
            </button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <TaskItem
                key={todo.id}
                task={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
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
