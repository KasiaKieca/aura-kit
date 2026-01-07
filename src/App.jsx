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

  // FUNKCJA Z RÓŻNYMI SZABLONAMI DLA KAŻDEJ KATEGORII
  const wrapInExpertContext = (text, category = 'UI') => {
    const templates = {
      UI: `**System Context:**
You are a Senior UI/UX Designer & Frontend Developer specializing in modern web aesthetics and glassmorphism.

**Technical Stack:**
- Tailwind CSS v4 with custom backdrop-blur utilities
- Framer Motion for smooth micro-interactions
- Lucide React for consistent iconography

**Component Specs:**
- Apply glassmorphism effect using backdrop-blur-xl and bg-white/10
- Use neon accent borders with color ${accentColor}
- Ensure responsive behavior across mobile, tablet, and desktop
- Include hover states with scale transforms and glow effects
- Apply proper spacing using Tailwind's spacing scale

**User Intent:**
${text} - zaprojektuj z naciskiem na estetykę i user experience.

**Output Format:**
Deliver clean React component code with Tailwind classes. No explanations, only production-ready code.`,

      Dev: `**System Context:**
You are a Senior Software Engineer specializing in clean architecture, SOLID principles, and modern React patterns.

**Technical Stack:**
- React 18+ with TypeScript
- Custom hooks for state management
- ESLint + Prettier for code quality
- Jest + React Testing Library for unit tests

**Component Specs:**
- Follow Single Responsibility Principle
- Use descriptive variable names (no abbreviations)
- Implement proper error handling with try/catch
- Add JSDoc comments for public functions
- Ensure type safety with TypeScript
- Include accessibility features (ARIA labels, keyboard navigation)

**User Intent:**
${text} - zaimplementuj zgodnie z najlepszymi praktykami clean code.

**Output Format:**
Deliver TypeScript code with proper types and error handling. Include usage example in comments.`,

      Data: `**System Context:**
You are a Senior Data Engineer specializing in SQL optimization, data transformation, and analytics pipelines.

**Technical Stack:**
- SQL (PostgreSQL/MySQL) with query optimization
- Python with Pandas for data manipulation
- ETL pipeline design patterns
- Data validation and cleaning strategies

**Component Specs:**
- Write optimized queries with proper indexing
- Use window functions for complex aggregations
- Handle NULL values and edge cases
- Include comments explaining business logic
- Suggest performance improvements
- Add data quality checks

**User Intent:**
${text} - zoptymalizuj pod kątem wydajności i czytelności.

**Output Format:**
Deliver SQL queries or Python code with performance notes. Include sample output structure.`,

      Marketing: `**System Context:**
You are a Senior Content Strategist & Copywriter specializing in conversion-focused messaging and brand storytelling.

**Technical Stack:**
- SEO best practices (keyword density, meta tags)
- A/B testing frameworks
- Emotional triggers and persuasion techniques
- Platform-specific formats (Twitter threads, LinkedIn posts, email campaigns)

**Component Specs:**
- Use active voice and power words
- Include clear call-to-action (CTA)
- Optimize for readability (short paragraphs, bullet points)
- Add emotional hooks in first sentence
- Target specific audience segment
- Ensure brand voice consistency

**User Intent:**
${text} - stwórz z naciskiem na engagement i konwersję.

**Output Format:**
Deliver copy with character counts and formatting notes. Include A/B testing suggestions.`,

      Creative: `**System Context:**
You are a Senior Creative Director specializing in visual storytelling, concept development, and artistic vision.

**Technical Stack:**
- Color theory and composition principles
- Midjourney/DALL-E prompt engineering
- Storyboarding and narrative structure
- Typography and visual hierarchy

**Component Specs:**
- Use sensory language and vivid imagery
- Create emotional resonance through storytelling
- Apply rule of thirds and golden ratio
- Include lighting, mood, and atmosphere details
- Specify visual style (cyberpunk, minimalist, etc.)
- Add cultural references when relevant

**User Intent:**
${text} - zaprojektuj z artystyczną wizją i attention to detail.

**Output Format:**
Deliver creative brief or detailed description. Include mood board suggestions and reference examples.`
    };

    return templates[category] || templates.UI;
  };

  const rawKits = [
    { cat: "UI", text: "modern glassmorphism sidebar with neon accents" },
    { cat: "UI", text: "responsive grid with 3 animated statistics cards" },
    { cat: "UI", text: "high-fidelity dark mode dashboard for a SaaS" },
    { cat: "Dev", text: "React custom hook for handling local storage" },
    { cat: "Dev", text: "form validation logic using Zod and React Hook Form" },
    { cat: "Data", text: "SQL query to find top 5 customers by revenue" },
    { cat: "Marketing", text: "Twitter thread about the future of AI coding" },
    { cat: "Creative", text: "midjourney prompt for a futuristic city at sunset" }
  ];

  // Każdy starter używa SWOJEGO szablonu na podstawie kategorii
  const starterKits = rawKits.map(kit => ({
    ...kit,
    richText: wrapInExpertContext(kit.text, kit.cat)
  }));

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('aura_forge_v1.0')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('aura_forge_v1.0', JSON.stringify(favorites))
  }, [favorites])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSystemStatus("Clipboard Updated")
    setTimeout(() => setSystemStatus("System Ready"), 2000)
  }

  const handleAction = (customText) => {
    const input = customText || command.trim()
    if (!input) return
    
    setSystemStatus("Forging...")
    setTimeout(() => {
      setGeneratedPrompt(wrapInExpertContext(input))
      setActiveTab('promptlab')
      setSystemStatus("System Ready")
    }, 500)
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
              <input type="text" placeholder="Describe your idea..." className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-white/20 transition-all shadow-inner" value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAction()} />
              <button onClick={() => handleAction()} className="px-8 rounded-2xl font-black uppercase text-xs text-slate-900 shadow-xl transition-all hover:scale-105" style={{ backgroundColor: accentColor }}>Create</button>
              <button onClick={() => setShowHelp(!showHelp)} className="w-16 rounded-2xl border font-bold text-xl opacity-40 hover:opacity-100 flex items-center justify-center shadow-lg transition-all" style={{ borderColor: accentColor + '40', color: accentColor }}>?</button>
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
                <input type="text" placeholder="Search expert prompts..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono w-80 shadow-inner focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </header>

            {generatedPrompt && (
              <div className="p-8 rounded-3xl bg-slate-900 border-2 mb-16 shadow-2xl transition-all" style={{ borderColor: accentColor }}>
                 <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">Generated Expert Output:</h3>
                 <textarea readOnly className="w-full h-48 bg-transparent border-none resize-none text-sm font-mono opacity-80 focus:outline-none mb-6 scrollbar-hide" value={generatedPrompt} />
                 <div className="flex gap-4">
                  <button onClick={() => copyToClipboard(generatedPrompt)} className="px-6 py-3 rounded-xl font-bold uppercase text-[10px] text-slate-900 shadow-lg transition-all hover:scale-105" style={{ backgroundColor: accentColor }}>Copy Result</button>
                  <button onClick={() => {
                    const newFav = { id: Date.now(), text: generatedPrompt };
                    setFavorites([newFav, ...favorites]);
                    setGeneratedPrompt("");
                  }} className="px-6 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all">Save to Collection</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-8 border-l-2 pl-3" style={{ borderColor: accentColor }}>Power Library ({filteredKits.length})</h3>
                <div className="space-y-4">
                  {filteredKits.map((kit, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                      <p className="text-[10px] font-black uppercase opacity-20 mb-2">{kit.cat}</p>
                      <textarea readOnly className="w-full h-24 bg-transparent border-none resize-none text-[11px] font-mono opacity-50 mb-4 focus:outline-none" value={kit.richText} />
                      <div className="flex gap-4">
                        <button onClick={() => copyToClipboard(kit.richText)} className="text-[9px] font-black uppercase opacity-40 hover:opacity-100 transition-all" style={{ color: accentColor }}>Copy Expert</button>
                        <button onClick={() => {setCommand(kit.text); setActiveTab('forge')}} className="text-[9px] font-black uppercase opacity-40 hover:opacity-100 transition-all">Edit in Forge</button>
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
                      <textarea readOnly className="w-full h-24 bg-transparent border-none resize-none text-[11px] font-mono opacity-50 mb-4 focus:outline-none" value={fav.text} />
                      <div className="flex gap-4">
                        <button onClick={() => copyToClipboard(fav.text)} className="text-[9px] font-black uppercase opacity-40 hover:opacity-100 transition-all">Copy</button>
                        <button 
                          onClick={() => {
                            console.log('Deleting:', fav.id);
                            console.log('Before:', favorites.map(f => f.id));
                            const newFavs = favorites.filter(f => f.id !== fav.id);
                            console.log('After:', newFavs.map(f => f.id));
                            setFavorites(newFavs);
                          }} 
                          className="text-[9px] font-black uppercase text-red-500/50 hover:text-red-500 transition-all"
                        >
                          Delete
                        </button>
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
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 border-l-2 pl-3" style={{ borderColor: accentColor }}>AuraKit v1.0</h3>
                <p className="text-lg font-light italic opacity-70 leading-relaxed">An LLM prompt engine that converts abstract concepts into production-ready technical specifications</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 border-l-2 pl-3" style={{ borderColor: accentColor }}>Environment</h3>
                <ul className="text-xs font-mono space-y-3 opacity-50">
                  <li>[Version] : v1.0.0 Stable</li>
                  <li>[Stack] : React + Tailwind v4</li>
                  <li>[Author] : KasiaKieca</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App