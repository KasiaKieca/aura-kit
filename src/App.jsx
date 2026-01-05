function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="p-10 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] text-center">
        <h1 className="text-6xl font-black text-white tracking-tighter mb-2">
          AURA<span className="text-cyan-400">KIT</span>
        </h1>
        <p className="text-cyan-200/60 font-mono text-sm uppercase tracking-[0.3em]">
          System Status: Operational
        </p>
        <div className="mt-8 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_15px_#06b6d4] animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default App