# TaskFlow

TaskFlow is a task list app built with React and Vite. It supports task priorities, due dates, search, status and priority filters, sorting, local storage, and a five-second undo option after deleting a task.

## Where the state lives and why

- **Tasks:** The task list lives in `App.jsx` through the `useLocalStorage` hook. `App` owns tasks because adding, editing, completing, deleting, and undoing tasks can affect more than one component. The hook loads and saves the list and falls back safely when stored data is invalid.
- **Search, status filter, priority filter, and sort order:** These live in `TaskList.jsx` because they only control which tasks that component displays. The visible list is derived from the task prop each render; it is not stored separately in state.
- **New task fields:** The task text, priority, and due date live in `TaskForm.jsx` because they are only needed while creating a task.
- **Edit fields:** The edited text, priority, and due date, along with whether the item is being edited and any date error, live in `TaskItem.jsx` because they belong to one task item.
- **Undo notice:** The recently deleted task and its original position live in `App.jsx`, where the task list can be restored. A ref holds the five-second timeout ID so it can be cleared when needed.

## Help and sources

I used AI for help implementing the five-second delete and undo feature.

## Run locally

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```
