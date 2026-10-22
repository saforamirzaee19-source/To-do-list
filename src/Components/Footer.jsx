function Footer() {
  return (
    <footer className="w-full border-t border-slate-700 bg-slate-800">
      <div className="mx-auto max-w-5xl px-6 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TodoApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
