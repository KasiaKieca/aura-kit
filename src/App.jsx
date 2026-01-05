function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar - Glassmorphism */}
      <aside className="hidden md:flex flex-col w-72 p-6 m-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg text-white">
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
              <a href="#dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 border-l-4 border-cyan-400">
                <span className="font-semibold">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#analytics" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#aura-core" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
                <span>Aura-Core</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-6 text-xs text-cyan-200/60 uppercase tracking-widest text-center">vibe · prototype</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-6 md:p-10 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2 uppercase">
            Aura<span className="text-cyan-400">kit</span>
          </h1>
          <p className="text-cyan-200/60 font-mono text-sm uppercase tracking-[0.3em] mb-8">
            System Status: Operational
          </p>
          
          {/* Status Bar */}
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-10">
            <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_15px_#06b6d4] animate-pulse"></div>
          </div>

          {/* Command Center Input */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-lg blur opacity-75 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-950 rounded-lg border border-cyan-500/50 px-4 py-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="text-cyan-500 font-mono font-bold mr-3">{">_"}</span>
              <input 
                type="text" 
                placeholder="Enter command..." 
                className="bg-transparent border-none outline-none text-cyan-100 font-mono w-full placeholder:text-cyan-900 focus:ring-0"
              />
              <div className="ml-2 w-2 h-5 bg-cyan-500/80 animate-[pulse_0.8s_infinite]"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;