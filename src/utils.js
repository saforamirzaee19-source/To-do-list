import { PRIORITIES } from "./constants";

export function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (parsed.getUTCFullYear() !== year) return false;
  if (parsed.getUTCMonth() !== month - 1) return false;
  if (parsed.getUTCDate() !== day) return false;

  return true;
}

export function isValidPriority(value) {
  return PRIORITIES.includes(value);
}

export function isOverdue(value) {
  return value < new Date().toLocaleDateString("en-CA");
}

export function areValidTodos(value) {
  if (!Array.isArray(value)) return false;

  for (const todo of value) {
    if (!todo) return false;
    if (typeof todo.id !== "string" && typeof todo.id !== "number") return false;
    if (typeof todo.text !== "string") return false;
    if (typeof todo.completed !== "boolean") return false;

    const hasNoDate = todo.dueDate === undefined || todo.dueDate === "";
    if (!hasNoDate && !isValidDate(todo.dueDate)) return false;
    if (!isValidPriority(todo.priority)) return false;
  }

  return true;
}

export function compareIds(firstId, secondId) {
  if (typeof firstId === "number" && typeof secondId === "number") {
    return firstId - secondId;
  }
  return String(firstId).localeCompare(String(secondId), undefined, {
    numeric: true,
  });
}
