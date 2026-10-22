function Header() {
  return (
    <header className="w-full border-b border-slate-700 bg-slate-800">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-4">
        <a href="/" className="text-xl font-bold text-white">
          Todo<span className="text-violet-500">App</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
