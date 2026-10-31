export const PRIORITIES = ["Low", "Medium", "High"];
export const DEFAULT_PRIORITY = "Medium";
export const TASK_STORAGE_KEY = "taskflow-todos";
export const UNDO_DELETE_DURATION_MS = 5000;
export const DEFAULT_TASK_SORT = "Newest";
export const DEFAULT_STATUS_FILTER = "All";
export const DEFAULT_PRIORITY_FILTER = "All";

export const INITIAL_TODOS = [
  {
    id: 1,
    text: "Buy groceries",
    completed: false,
    priority: DEFAULT_PRIORITY,
  },
  {
    id: 2,
    text: "Finish the React project",
    completed: false,
    priority: "High",
  },
  { id: 3, text: "Go for a walk", completed: false, priority: "Low" },
];

export const TASK_STATUS_FILTERS = ["All", "Active", "Completed"];
export const PRIORITY_FILTERS = ["All", ...PRIORITIES];
export const TASK_SORT_OPTIONS = ["Newest", "Oldest", "Due Date"];
