import React, { useEffect, useState } from 'react'

function App() {
  const [auraWidth, setAuraWidth] = useState('0%')
  const [command, setCommand] = useState("")
  const [systemMsg, setSystemMsg] = useState("Operational")
  const [latency, setLatency] = useState(24)
  const [accentColor, setAccentColor] = useState('#22d3ee')

  useEffect(() => {
    const t = setTimeout(() => setAuraWidth('98%'), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.toLowerCase().trim()

      if (cmd === '/status') {
        setSystemMsg("Everything is looking great! ✨")
      } else if (cmd === '/clear') {
        setSystemMsg("All clear! 🌟")
      } else if (cmd === '/boost') {
        setSystemMsg("Aura levels at maximum! 🚀")
        setAuraWidth('100%')
      } else if (cmd === '/help') {
        setSystemMsg("📚 /vibe [color] - change theme • /status - check health • /boost - max aura • /clear - reset console")
      } else if (cmd.startsWith('/vibe ')) {
        const color = cmd.replace('/vibe ', '').trim()
        setAccentColor(color)
        setSystemMsg(`Vibe updated to ${color}`)
      } else {
        setSystemMsg(`Unknown command: ${cmd}`)
      }

      setCommand("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 p-6 m-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-extrabold text-slate-900 text-xl">A</div>
          <div>
            <h2 className="text-lg font-black tracking-tight uppercase">AURA<span className="text-cyan-300">KIT</span></h2>
            <p className="text-xs text-cyan-200/60 font-mono mt-0.5">Playground v1.0</p>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 border-l-4 border-cyan-400 text-white">
                <span className="font-semibold">Dashboard</span>
              </a>
            </li>
            <li className="opacity-50 hover:opacity-100 transition">
              <a href="#analytics" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5">
                <span>Analytics</span>
              </a>
            </li>
            <li className="opacity-50 hover:opacity-100 transition">
              <a href="#settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5">
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-6 text-[10px] text-cyan-200/40 uppercase tracking-widest text-center italic">vibe · coding · session</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-8 md:p-12 bg-slate-900 rounded-3xl shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] text-center" style={{ borderColor: accentColor, borderWidth: '1px' }}>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-2 uppercase">
            Aura<span style={{ color: accentColor }}>kit</span>
          </h1>
          <p className="text-cyan-300/60 font-mono text-xs uppercase tracking-[0.4em] mb-10 h-4">
            System Status: {systemMsg}
          </p>

          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-12 max-w-md mx-auto">
            <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_20px_#06b6d4] animate-pulse"></div>
          </div>

          <div className="max-w-xl mx-auto">
            <p className="text-xs text-cyan-300/60 mb-3 font-mono">💡 Try typing /vibe followed by a color name to change the look of your app!</p>
            <div className="relative group">
              <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur opacity-75 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-slate-950 rounded-xl border border-cyan-500/40 px-5 py-4 shadow-2xl">
              <span className="text-cyan-500 font-mono font-bold text-xl mr-4">{">_"}</span>
              <input
                type="text"
                placeholder="Enter command (e.g. /status)..."
                className="bg-transparent border-none outline-none text-cyan-100 font-mono w-full placeholder:text-cyan-900/50 text-lg focus:ring-0"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
              />
              <button
                onClick={() => setSystemMsg("📚 /vibe [color] - change theme • /status - check health • /boost - max aura • /clear - reset console")}
                className="ml-3 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:opacity-80 font-bold text-sm"
                style={{ backgroundColor: accentColor + '20', color: accentColor, border: `1px solid ${accentColor}` }}
                title="Show available commands"
              >
                ?
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-cyan-300/50 uppercase tracking-widest mb-1 font-bold">Latency</div>
            <div className="text-3xl font-black text-white font-mono">{latency}<span className="text-sm ml-1 text-cyan-400/50 uppercase tracking-normal font-sans">ms</span></div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-cyan-300/50 uppercase tracking-widest mb-1 font-bold">Aura Flow</div>
            <div className="text-3xl font-black text-white font-mono">{auraWidth}</div>
            <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000"
                style={{ width: auraWidth, backgroundColor: accentColor, boxShadow: `0_0_10px_${accentColor.replace('#', '')}` }}
              ></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex justify-between items-end">
            <div>
              <div className="text-xs text-cyan-300/50 uppercase tracking-widest mb-1 font-bold">Nodes</div>
              <div className="text-3xl font-black text-white font-mono">12</div>
            </div>
            <div className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-400/30 font-bold uppercase tracking-wider">Healthy</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App