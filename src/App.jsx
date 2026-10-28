import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import useLocalStorage from "./Hooks/useLocalStorage";

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
  const [todos, setTodos] = useLocalStorage(
    "taskflow-todos",
    initialTodos,
    areValidTodos,
  );

  const addTodo = (text, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const saveEdit = (id, changes) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...changes } : todo,
      ),
    );
  };

  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl p-6 sm:p-8">
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

          <TaskForm onAdd={addTodo} />
          <TaskList
            tasks={todos}
            onComplete={completeTodo}
            onDelete={deleteTodo}
            onSaveEdit={saveEdit}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

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

function areValidTodos(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (todo) =>
        todo &&
        (typeof todo.id === "string" || typeof todo.id === "number") &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean" &&
        (todo.dueDate === undefined ||
          todo.dueDate === "" ||
          (typeof todo.dueDate === "string" && isValidDate(todo.dueDate))) &&
        ["Low", "Medium", "High"].includes(todo.priority),
    )
  );
}
