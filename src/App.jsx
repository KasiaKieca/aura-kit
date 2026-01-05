function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar - Glassmorphism */}
      <aside className="hidden md:flex flex-col w-72 p-6 m-6 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-extrabold text-slate-900">A</div>
          <div>
            <h2 className="text-lg font-black tracking-tight">AURA<span className="text-cyan-300">KIT</span></h2>
            <p className="text-xs text-cyan-200/60 font-mono mt-0.5">Playground</p>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/8 border-l-4 border-cyan-400">
                <span className="font-semibold">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/6 transition">
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/6 transition">
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#aura-core" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/6 transition">
                <span>Aura-Core</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-6 text-xs text-cyan-200/60">vibe · prototype</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="p-6 md:p-10 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] text-center mx-2">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2">
            AURA<span className="text-cyan-400">KIT</span>
          </h1>
          <p className="text-cyan-200/60 font-mono text-sm uppercase tracking-[0.3em]">
            System Status: Operational
          </p>
          <div className="mt-8 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_15px_#06b6d4] animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App