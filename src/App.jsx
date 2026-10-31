import { useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import useLocalStorage from "./Hooks/useLocalStorage";
import {
  INITIAL_TODOS,
  TASK_STORAGE_KEY,
  UNDO_DELETE_DURATION_MS,
} from "./constants";
import { areValidTodos } from "./utils";

function App() {
  const [todos, setTodos] = useLocalStorage(
    TASK_STORAGE_KEY,
    INITIAL_TODOS,
    areValidTodos,
  );
  const [deletedTodo, setDeletedTodo] = useState(null);
  const undoTimeoutRef = useRef(null);

  useEffect(
    () => () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    },
    [],
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
    const taskToDelete = todos.find((todo) => todo.id === id);
    if (!taskToDelete) return;

    setDeletedTodo({ task: taskToDelete, index: todos.indexOf(taskToDelete) });
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    undoTimeoutRef.current = setTimeout(() => {
      setDeletedTodo(null);
      undoTimeoutRef.current = null;
    }, UNDO_DELETE_DURATION_MS);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const undoDelete = () => {
    if (!deletedTodo) return;

    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    setTodos((prevTodos) => {
      if (prevTodos.some((todo) => todo.id === deletedTodo.task.id)) {
        return prevTodos;
      }

      const restoredTodos = [...prevTodos];
      restoredTodos.splice(
        Math.min(deletedTodo.index, restoredTodos.length),
        0,
        deletedTodo.task,
      );
      return restoredTodos;
    });
    setDeletedTodo(null);
    undoTimeoutRef.current = null;
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

          {deletedTodo && (
            <div
              role="status"
              className="mb-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm text-white"
            >
              <span>Deleted</span>
              <button
                type="button"
                onClick={undoDelete}
                className="font-semibold text-violet-400 hover:text-violet-300"
              >
                Undo
              </button>
            </div>
          )}

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
