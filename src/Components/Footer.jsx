function Footer() {
  return (
    <footer className="w-full border-t border-violet-100 bg-white/60">
      <div className="mx-auto max-w-5xl px-6 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TaskFlow. One step at a time.
      </div>
    </footer>
  );
}

export default Footer;
