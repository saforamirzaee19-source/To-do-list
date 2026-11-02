function Header() {
  return (
    <header className="w-full border-b border-violet-100 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">✓</span>
          Task<span className="text-violet-600">Flow</span>
        </a>
        <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">Stay on track</span>
      </div>
    </header>
  );
}

export default Header;
