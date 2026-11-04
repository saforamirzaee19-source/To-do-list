import {
  DEFAULT_PRIORITY_FILTER,
  PRIORITY_FILTERS,
  TASK_SORT_OPTIONS,
  TASK_STATUS_FILTERS,
} from "../constants";

function TaskFilters({ searchTerm, onSearchChange, filterState }) {
  const {
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    sortOrder,
    setSortOrder,
  } = filterState;

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100"
        />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {TASK_STATUS_FILTERS.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${filter === item ? "bg-violet-600 text-white shadow-md shadow-violet-200" : "bg-slate-100 text-slate-600 hover:bg-violet-50 hover:text-violet-700"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row">
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} aria-label="Filter by priority"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
          {PRIORITY_FILTERS.map((item) => <option key={item} value={item}>{item === DEFAULT_PRIORITY_FILTER ? "All priorities" : `${item} priority`}</option>)}
        </select>
        <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort tasks"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
          {TASK_SORT_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </>
  );
}

export default TaskFilters;
