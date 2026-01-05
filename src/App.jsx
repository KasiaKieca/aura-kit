import React, { useEffect, useState } from 'react'

const IconIdea = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h.01"/><path d="M7 6a7 7 0 0 1 10 0 7 7 0 0 1-7 7v4h4"/><path d="M9 22h6"/></svg>
)
const IconLab = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
)
const IconAbout = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
)

function App() {
  const [activeTab, setActiveTab] = useState('forge')
  const [command, setCommand] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [systemStatus, setSystemStatus] = useState("System Ready")
  const [accentColor, setAccentColor] = useState('#2dd4bf')
  const [showHelp, setShowHelp] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  
  const starterKits = [
    { cat: "UI", text: "modern glassmorphism sidebar with neon accents" },
    { cat: "UI", text: "responsive grid with 3 animated statistics cards" },
    { cat: "UI", text: "color palette for a fintech app using mint colors" },
    { cat: "UI", text: "high-fidelity dark mode dashboard for a SaaS" },
    { cat: "UI", text: "neumorphic login form with soft shadows" },
    { cat: "UI", text: "bento-box style feature grid for a landing page" },
    { cat: "UI", text: "minimalist product card with hover zoom effect" },
    { cat: "UI", text: "pricing table with 3 tiers and 'popular' badge" },
    { cat: "UI", text: "animated mobile navigation bar with lottie icons" },
    { cat: "UI", text: "hero section with split layout and mesh gradient" },
    { cat: "Dev", text: "React custom hook for handling local storage" },
    { cat: "Dev", text: "responsive navbar with a mobile hamburger menu" },
    { cat: "Dev", text: "refactor this function to be more readable" },
    { cat: "Dev", text: "fetch data from an API using async/await in React" },
    { cat: "Dev", text: "form validation logic using Zod and React Hook Form" },
    { cat: "Dev", text: "custom debounce function for search inputs" },
    { cat: "Dev", text: "tailwind config for a custom 12-column grid" },
    { cat: "Dev", text: "protect routes in a Next.js application" },
    { cat: "Dev", text: "dark mode toggle implementation with Tailwind" },
    { cat: "Dev", text: "convert JSON data into a downloadable CSV file" },
    { cat: "Data", text: "SQL query to find top 5 customers by revenue" },
    { cat: "Data", text: "Python script to scrape headlines from a news site" },
    { cat: "Data", text: "regex pattern to validate complex passwords" },
    { cat: "Data", text: "Excel formula to calculate weighted averages" },
    { cat: "Data", text: "d3.js bar chart for monthly sales data" },
    { cat: "Data", text: "Pandas function to clean missing values in a dataset" },
    { cat: "Data", text: "generate mock user data for database testing" },
    { cat: "Data", text: "transform XML response into a nested Object" },
    { cat: "Data", text: "MongoDB aggregation to group posts by category" },
    { cat: "Data", text: "PowerBI DAX measure for year-over-year growth" },
    { cat: "Marketing", text: "5 catchy taglines for a Web3 creative agency" },
    { cat: "Marketing", text: "Twitter thread about the future of AI coding" },
    { cat: "Marketing", text: "SEO meta descriptions for a tech blog post" },
    { cat: "Marketing", text: "email campaign template for a product launch" },
    { cat: "Marketing", text: "LinkedIn post summarizing a successful project" },
    { cat: "Marketing", text: "ad copy for a Google Search campaign" },
    { cat: "Marketing", text: "value proposition for a sustainable fashion brand" },
    { cat: "Marketing", text: "YouTube video script for a 'day in the life' vlog" },
    { cat: "Marketing", text: "Instagram captions for a summer sale event" },
    { cat: "Marketing", text: "brand story for a boutique coffee roastery" },
    { cat: "Creative", text: "storyboard outline for a sci-fi short film" },
    { cat: "Creative", text: "midjourney prompt for a futuristic city at sunset" },
    { cat: "Creative", text: "character backstory for a fantasy RPG game" },
    { cat: "Creative", text: "poem about the intersection of nature and tech" },
    { cat: "Creative", text: "lyrics for a lo-fi hip hop track about rain" },
    { cat: "Creative", text: "3D scene description for a minimalist interior" },
    { cat: "Creative", text: "color theory breakdown for a cyberpunk vibe" },
    { cat: "Creative", text: "dialogue for a comedy sketch about remote work" },
    { cat: "Creative", text: "concept for a mobile game about time travel" },
    { cat: "Creative", text: "manifest manifesto for a new digital art movement" }
  ];

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('aura_forge_v12_7')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('aura_forge_v12_7', JSON.stringify(favorites))
  }, [favorites])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSystemStatus("Clipboard Updated")
    setTimeout(() => setSystemStatus("System Ready"), 2000)
  }

  const sendToForge = (text) => {
    setCommand(text)
    setActiveTab('forge')
    setSystemStatus("Awaiting Modification...")
  }

  const handleAction = () => {
    const input = command.trim()
    if (!input) return

    if (input.startsWith('/')) {
      const [cmd, ...args] = input.split(' ')
      if (cmd.toLowerCase() === '/status') {
        setSystemStatus("STABLE • v12.7.0 • 50 KITS • BUILD 2026.01.05")
      } else if (cmd.toLowerCase() === '/vibe' && args[0]) {
        setAccentColor(args[0])
        setSystemStatus(`VIBE CALIBRATED TO: ${args[0]}`)
      }
    } else {
      setSystemStatus("Forging...")
      const cleanInput = input.replace(/^create\s+/i, "")
      setTimeout(() => {
        setGeneratedPrompt(`Create ${cleanInput} using Tailwind CSS and ${accentColor}.`)
        setActiveTab('promptlab')
        setSystemStatus("System Ready")
      }, 500)
    }
    setCommand("")
  }

  const filteredKits = starterKits.filter(kit => 
    kit.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kit.cat.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans overflow-hidden italic-none">
      <aside className="w-64 p-6 m-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col shadow-2xl">
        <div className="mb-10 px-2">
           <h2 className="text-xl font-black italic" style={{ color: accentColor }}>AURA<span className="text-white">KIT</span></h2>
           <p className="text-[9px] opacity-30 uppercase tracking-[0.3em] font-mono">v1.0.0 Stable 'Origin'</p>
        </div>
        <nav className="flex-1 space-y-2 text-[10px] font-bold uppercase tracking-widest">
          <button onClick={() => setActiveTab('forge')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'forge' ? 'bg-white/10 border-l-4' : 'opacity-40 hover:opacity-100'}`} style={{ borderColor: accentColor }}>
            <IconIdea color={activeTab === 'forge' ? accentColor : '#fff'} /> Idea Forge
          </button>
          <button onClick={() => setActiveTab('promptlab')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'promptlab' ? 'bg-white/10 border-l-4' : 'opacity-40 hover:opacity-100'}`} style={{ borderColor: accentColor }}>
            <IconLab color={activeTab === 'promptlab' ? accentColor : '#fff'} /> Prompt Lab
          </button>
          <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-white/10 border-l-4' : 'opacity-40 hover:opacity-100'}`} style={{ borderColor: accentColor }}>
            <IconAbout color={activeTab === 'about' ? accentColor : '#fff'} /> About Kit
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'forge' && (
          <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
            <h1 className="text-8xl font-black mb-4 uppercase tracking-tighter italic" style={{ textShadow: `0 0 40px ${accentColor}40` }}>Aura<span style={{ color: accentColor }}>kit</span></h1>
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mb-12 h-6" style={{ color: systemStatus !== "System Ready" ? accentColor : "white" }}>{systemStatus}</p>
            <div className="w-full max-w-2xl flex gap-3 mb-6">
              <input type="text" placeholder="Describe or enter command..." className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-white/20 shadow-inner transition-all" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAction()} />
              <button onClick={handleAction} className="px-8 rounded-2xl font-black uppercase text-xs text-slate-900 shadow-xl transition-all hover:scale-105" style={{ backgroundColor: accentColor }}>Create</button>
              <button onClick={() => setShowHelp(!showHelp)} className="w-16 rounded-2xl border font-bold text-xl opacity-40 hover:opacity-100 flex items-center justify-center shadow-lg" style={{ borderColor: accentColor + '40', color: accentColor }}>?</button>
            </div>
            {showHelp && (
              <div className="mt-4 w-full max-w-2xl p-6 bg-white/5 border border-white/10 rounded-2xl font-mono text-[11px] opacity-70 animate-in slide-in-from-top-4">
                <p className="mb-2 uppercase font-black" style={{ color: accentColor }}>Manual:</p>
                <p>/vibe [color] • /status • Type idea to trigger Forge</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'promptlab' && (
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 flex justify-between items-end border-b border-white/10 pb-8">
              <div>
                <h2 className="text-4xl font-black uppercase italic mb-2">Prompt Lab</h2>
                <input type="text" placeholder="Search 50+ prompts..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono focus:outline-none focus:border-white/30 w-80 shadow-inner" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </header>

            {generatedPrompt && (
              <div className="p-8 rounded-3xl bg-slate-900 border-2 mb-16 shadow-2xl transition-all" style={{ borderColor: accentColor }}>
                <p className="text-xl italic mb-8 leading-relaxed">"{generatedPrompt}"</p>
                <div className="flex gap-4">
                  <button onClick={() => copyToClipboard(generatedPrompt)} className="px-6 py-3 rounded-xl font-bold uppercase text-[10px] text-slate-900 hover:scale-105 transition-all shadow-lg" style={{ backgroundColor: accentColor }}>Copy Result</button>
                  <button onClick={() => {setFavorites([{ id: Date.now(), text: generatedPrompt }, ...favorites]); setGeneratedPrompt("")}} className="px-6 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all">Save to Collection</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-8 border-l-2 pl-3" style={{ borderColor: accentColor }}>Power Library ({filteredKits.length})</h3>
                <div className="space-y-4">
                  {filteredKits.map((kit, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                      <p className="text-sm opacity-60 mb-4 italic leading-relaxed">"{kit.text}"</p>
                      <div className="flex gap-4 items-center">
                        <button onClick={() => copyToClipboard(`Create ${kit.text} using Tailwind CSS and ${accentColor}`)} className="text-[9px] font-black uppercase opacity-30 hover:opacity-100 transition-all" style={{ color: accentColor }}>Copy</button>
                        <button onClick={() => sendToForge(kit.text)} className="text-[9px] font-black uppercase opacity-30 hover:opacity-100 transition-all">Edit</button>
                        <span className="ml-auto text-[9px] font-mono opacity-20 uppercase tracking-widest">{kit.cat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-8 border-l-2 pl-3" style={{ borderColor: accentColor }}>Your Collection ({favorites.length})</h3>
                <div className="space-y-4">
                  {favorites.map(fav => (
                    <div key={fav.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 group transition-all">
                      <p className="text-sm opacity-60 mb-6 italic">"{fav.text}"</p>
                      <div className="flex gap-4">
                        <button onClick={() => copyToClipboard(fav.text)} className="text-[9px] font-black uppercase opacity-30 hover:opacity-100 transition-all">Copy</button>
                        <button onClick={() => setFavorites(favorites.filter(f => f.id !== fav.id))} className="text-[9px] font-black uppercase text-red-500/50 hover:text-red-500 transition-all">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto pt-10 text-left">
            <h2 className="text-5xl font-black uppercase italic mb-12 transition-all" style={{ color: accentColor }}>Technical Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 border-l-2 pl-3" style={{ borderColor: accentColor }}>Identity</h3>
                <p className="text-lg font-light italic opacity-70 leading-relaxed">AuraKit is a specialized workbench for Vibe Coders. Bridge between abstract thought and AI execution.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 border-l-2 pl-3" style={{ borderColor: accentColor }}>Environment</h3>
                <ul className="text-xs font-mono space-y-3 opacity-50">
                  <li>[Version] : v1.0.0 Stable 'Origin'</li>
                  <li>[Release] : Jan 2026</li>
                  <li>[Status] : Production Ready</li>
                  <li>[Theme] : #2DD4BF Mint</li>
                </ul>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
               <h3 className="text-sm font-bold mb-4 italic" style={{ color: accentColor }}>Project Status</h3>
               <p className="text-sm opacity-50 leading-relaxed italic-none">Ta wersja AuraKit powstała w styczniu 2026 jako narzędzie wspierające No-Coderów w precyzyjnym promptowaniu.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App