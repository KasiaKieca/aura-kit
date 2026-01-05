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
        setSystemMsg("Operational")
      } else if (cmd === '/boost') {
        setSystemMsg("Aura levels at maximum! 🚀")
        setAuraWidth('100%')
      } else if (cmd.startsWith('/vibe ')) {
        const color = cmd.replace('/vibe ', '').trim()
        setAccentColor(color)
        setSystemMsg(`Vibe updated to ${color}`)
      } else if (cmd.startsWith('/refine ')) {
        const idea = cmd.replace('/refine ', '').trim()
        const refined = `PROMPT FOR AI: Add ${idea} using Tailwind CSS and the ${accentColor} color scheme. Ensure it matches the AuraKit design.`
        setSystemMsg(refined)
      } else if (cmd === '/help') {
        setSystemMsg("Commands: /vibe [color], /refine [idea], /status, /boost, /clear")
      } else {
        setSystemMsg(`Unknown: ${cmd}. Click '?' for help.`)
      }
      setCommand("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans overflow-x-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 p-6 m-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center font-extrabold text-slate-900 text-xl">A</div>
          <div>
            <h2 className="text-lg font-black tracking-tight uppercase">AURA<span style={{ color: accentColor }}>KIT</span></h2>
            <p className="text-[10px] text-cyan-200/40 font-mono mt-0.5">Vibe Coder v1.0</p>
          </div>
        </div>
        <nav className="mt-4 flex-1">
          <ul className="space-y-2">
            <li><a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 border-l-4" style={{ borderColor: accentColor }}>Dashboard</a></li>
            <li className="opacity-50"><a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg">Prompt Lab 🧪</a></li>
            <li className="opacity-50"><a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-8 md:p-12 bg-slate-900 rounded-3xl shadow-2xl text-center border transition-all duration-500" style={{ borderColor: accentColor + '40' }}>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-2 uppercase italic">
            Aura<span style={{ color: accentColor }}>kit</span>
          </h1>
          <p className="text-cyan-300/40 font-mono text-[10px] uppercase tracking-[0.4em] mb-10">
            System Status: {systemMsg}
          </p>

          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-500" style={{ backgroundColor: accentColor }}></div>
              <div className="relative flex items-center bg-slate-950 rounded-xl border border-white/10 px-5 py-4">
                <span className="font-mono font-bold text-xl mr-4" style={{ color: accentColor }}>{">_"}</span>
                <input
                  type="text"
                  placeholder="Enter command or idea..."
                  className="bg-transparent border-none outline-none text-white font-mono w-full text-lg focus:ring-0"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleCommand}
                />
                <button
                  onClick={() => setSystemMsg("Commands: /vibe [color], /refine [idea], /status, /boost, /clear")}
                  className="ml-3 w-8 h-8 rounded-lg font-bold border"
                  style={{ color: accentColor, borderColor: accentColor }}
                >?</button>
              </div>
            </div>
            <p className="mt-4 text-[10px] text-cyan-300/30 font-mono uppercase">💡 Try /refine [idea] to build your prompt</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] opacity-40 uppercase mb-1 font-bold">Latency</div>
            <div className="text-3xl font-black font-mono">{latency}ms</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] opacity-40 uppercase mb-1 font-bold">Aura Flow</div>
            <div className="text-3xl font-black font-mono">{auraWidth}</div>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-1000" style={{ width: auraWidth, backgroundColor: accentColor }}></div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-end">
            <div>
              <div className="text-[10px] opacity-40 uppercase mb-1 font-bold">Nodes</div>
              <div className="text-3xl font-black font-mono">12</div>
            </div>
            <div className="text-[10px] px-2 py-1 rounded font-bold uppercase border" style={{ color: accentColor, borderColor: accentColor + '40' }}>Healthy</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App