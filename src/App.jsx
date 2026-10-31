import Header from "./Components/Header";
import Footer from "./Components/Footer";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import useTodos from "./Hooks/useTodos";

function App() {
  const {
    todos,
    deletedTodo,
    addTodo,
    completeTodo,
    deleteTodo,
    undoDelete,
    saveEdit,
  } = useTodos();

  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-100 text-slate-800">
      <Header />

      <main className="flex-grow px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-3xl">
          <section className="mb-7 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-7 text-white shadow-xl shadow-violet-200 sm:p-9">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">
              Your day, organized
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Make space for what matters.
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-violet-100 sm:text-base">
              Keep your tasks clear, set priorities, and take things one step at a time.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-2xl font-bold">{totalCount}</p>
                <p className="mt-1 text-xs text-violet-100 sm:text-sm">Total tasks</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="mt-1 text-xs text-violet-100 sm:text-sm">In progress</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm sm:p-4">
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="mt-1 text-xs text-violet-100 sm:text-sm">Completed</p>
              </div>
            </div>
          </section>

          {deletedTodo && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 shadow-sm"
            >
              <span>Task deleted. You can still bring it back.</span>
              <button
                type="button"
                onClick={undoDelete}
                className="rounded-lg px-3 py-2 font-semibold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Undo
              </button>
            </div>
          )}

          <section className="rounded-3xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Your tasks</h2>
              <p className="mt-1 text-sm text-slate-500">Add a task or pick up where you left off.</p>
            </div>
            <TaskForm onAdd={addTodo} />
            <TaskList
              tasks={todos}
              onComplete={completeTodo}
              onDelete={deleteTodo}
              onSaveEdit={saveEdit}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
