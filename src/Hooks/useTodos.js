import { useEffect, useRef, useState } from "react";
import {
  INITIAL_TODOS,
  TASK_STORAGE_KEY,
  UNDO_DELETE_DURATION_MS,
} from "../constants";
import { areValidTodos } from "../utils";
import useLocalStorage from "./useLocalStorage";

function useTodos() {
  const [todos, setTodos] = useLocalStorage(
    TASK_STORAGE_KEY,
    INITIAL_TODOS,
    areValidTodos,
  );
  const [deletedTodo, setDeletedTodo] = useState(null);
  const undoTimeoutRef = useRef(null);

  // Clear the undo timer if the app closes.
  useEffect(() => {
    return function () {
      clearTimeout(undoTimeoutRef.current);
    };
  }, []);

  // Add a new task to the end of the list.
  function addTodo(text, priority, dueDate) {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate,
    };

    setTodos([...todos, task]);
  }

  // Mark one task as complete.
  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  // Delete a task and show the undo button for a few seconds.
  function deleteTodo(id) {
    const taskToDelete = todos.find((todo) => todo.id === id);
    if (!taskToDelete) return;

    const taskPosition = todos.indexOf(taskToDelete);
    setDeletedTodo({ task: taskToDelete, index: taskPosition });

    clearTimeout(undoTimeoutRef.current);
    undoTimeoutRef.current = setTimeout(function () {
      setDeletedTodo(null);
      undoTimeoutRef.current = null;
    }, UNDO_DELETE_DURATION_MS);

    const remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  }

  // Put the deleted task back in its old position.
  function undoDelete() {
    if (deletedTodo === null) return;

    clearTimeout(undoTimeoutRef.current);

    const restoredTodos = [...todos];
    restoredTodos.splice(deletedTodo.index, 0, deletedTodo.task);
    setTodos(restoredTodos);

    setDeletedTodo(null);
    undoTimeoutRef.current = null;
  }

  // Save the changed information for one task.
  function saveEdit(id, changes) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...changes };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return {
    todos,
    deletedTodo,
    addTodo,
    completeTodo,
    deleteTodo,
    undoDelete,
    saveEdit,
  };
}

export default useTodos;
