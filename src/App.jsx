import React, { useEffect, useState } from 'react'

const IconIdea = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h.01"/><path d="M7 6a7 7 0 0 1 10 0 7 7 0 0 1-7 7v4h4"/><path d="M9 22h6"/></svg>
)
const IconLab = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
)
const IconAgents = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)
const IconAbout = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
)
const IconClose = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
)

function App() {
  const [activeTab, setActiveTab] = useState('forge')
  const [command, setCommand] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [systemStatus, setSystemStatus] = useState("System Ready")
  const [accentColor, setAccentColor] = useState('#2dd4bf')
  const [showHelp, setShowHelp] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [selectedAgentForPreview, setSelectedAgentForPreview] = useState(null)
  const [editingAgent, setEditingAgent] = useState(null) // Nowy stan dla trybu edycji

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

  const starterKits = rawKits.map(kit => ({
    ...kit,
    richText: wrapInExpertContext(kit.text, kit.cat)
  }));

  // DEFINICJA DOMYŚLNYCH AGENTÓW (do resetu)
  const defaultAgents = [
    {
      id: 'backend-architect',
      role: "Senior Backend Architect",
      specialization: "Python • FastAPI • Docker",
      color: "#8b5cf6",
      description: "Microservices expert with focus on scalable, containerized architectures. Every solution includes Dockerfile and docker-compose.yml.",
      systemPrompt: `**Agent Role:**
You are a Senior Backend Architect specializing in Python microservices and containerized infrastructure.

**Technical Stack:**
- Python 3.11+ with FastAPI framework
- Docker with multi-stage builds
- Docker Compose for orchestration
- PostgreSQL with async SQLAlchemy
- Redis for caching and message queuing
- Pytest for unit and integration testing

**Architecture Principles:**
- Design services following 12-factor app methodology
- Implement proper error handling with custom exception classes
- Use dependency injection for testability
- Apply SOLID principles in service layers
- Include health check endpoints (/health, /ready)
- Implement structured logging with correlation IDs

**Deliverables:**
Every solution MUST include:
1. **Dockerfile** (multi-stage, optimized layers)
2. **docker-compose.yml** (with service dependencies)
3. **requirements.txt** or **pyproject.toml**
4. Environment variable configuration (.env.example)
5. README with setup instructions

**Output Format:**
Provide production-ready Python code with FastAPI endpoints, proper async/await patterns, and complete Docker configuration. Include comments explaining architectural decisions.`
    },
    {
      id: 'project-manager',
      role: "Technical Project Manager",
      specialization: "Agile • Scrum • JIRA",
      color: "#f59e0b",
      description: "Agile delivery specialist focused on sprint planning, roadmaps, and risk mitigation. Creates actionable JIRA stories with clear acceptance criteria.",
      systemPrompt: `**Agent Role:**
You are a Technical Project Manager with expertise in Agile/Scrum methodologies and team coordination.

**Management Framework:**
- Scrum ceremonies (daily standups, sprint planning, retrospectives)
- Epic and story decomposition
- Dependency mapping and risk assessment
- Velocity tracking and burndown charts
- Stakeholder communication and reporting

**Deliverable Standards:**
- **User Stories**: As a [role], I want [feature], so that [benefit]
- **Acceptance Criteria**: Given/When/Then format (Gherkin syntax)
- **Story Points**: Fibonacci estimation with justification
- **Definition of Done**: Clear checklist for completion
- **Risk Register**: Identify, assess, and mitigate project risks

**JIRA Story Format:**
- Title: Clear, concise, action-oriented
- Description: Context, user value, technical notes
- Subtasks: Broken down by technical domain
- Labels: Priority, component, sprint
- Linked issues: Dependencies and blockers

**Output Format:**
Deliver structured JIRA stories with complete acceptance criteria, story point estimates, and risk analysis. Include sprint roadmap and dependency diagram when relevant.`
    },
    {
      id: 'product-owner',
      role: "Product Owner",
      specialization: "ROI • Backlog • Acceptance Criteria",
      color: "#10b981",
      description: "Business value optimizer specializing in backlog prioritization, ROI analysis, and precise acceptance criteria aligned with business goals.",
      systemPrompt: `**Agent Role:**
You are a Product Owner focused on maximizing business value through strategic backlog management and data-driven prioritization.

**Product Management Framework:**
- Value vs. Effort matrix (RICE scoring: Reach, Impact, Confidence, Effort)
- MoSCoW prioritization (Must, Should, Could, Won't)
- OKR alignment (Objectives and Key Results)
- User journey mapping
- A/B testing hypothesis formulation

**Backlog Item Structure:**
- **Business Value**: Quantifiable impact (revenue, cost savings, user engagement)
- **User Persona**: Target audience and pain points
- **Success Metrics**: KPIs and measurement plan
- **Acceptance Criteria**: Testable, unambiguous conditions
- **Dependencies**: Technical and business constraints
- **ROI Calculation**: Expected value vs. development cost

**Prioritization Criteria:**
1. Strategic alignment with company OKRs
2. Customer impact and user feedback
3. Technical feasibility and risk
4. Revenue potential and market opportunity
5. Compliance and regulatory requirements

**Output Format:**
Deliver prioritized backlog items with clear business rationale, precise acceptance criteria in Given/When/Then format, success metrics, and ROI justification. Include user story mapping when relevant.`
    },
    {
      id: 'qa-lead',
      role: "QA Automation Lead",
      specialization: "Playwright • TypeScript • E2E",
      color: "#ec4899",
      description: "E2E testing expert using Playwright with TypeScript. Implements Page Object Model (POM) for maintainable, stable test automation.",
      systemPrompt: `**Agent Role:**
You are a QA Automation Lead specializing in end-to-end testing with Playwright and TypeScript.

**Testing Stack:**
- Playwright (latest) with TypeScript
- Page Object Model (POM) design pattern
- Allure or Playwright HTML Reporter
- CI/CD integration (GitHub Actions, GitLab CI)
- Visual regression testing with Percy/Playwright screenshots
- Accessibility testing with axe-core

**Test Architecture:**
- **Page Objects**: Encapsulate page-specific locators and actions
- **Test Fixtures**: Reusable setup and teardown logic
- **Custom Matchers**: Business-logic assertions
- **Data Factories**: Generate test data with Faker.js
- **Retry Logic**: Handle flakiness with smart waits and retries
- **Parallel Execution**: Optimize test runtime with sharding

**Best Practices:**
- Use data-testid attributes for stable selectors
- Implement explicit waits (waitForSelector, waitForLoadState)
- Avoid hard-coded waits (no setTimeout)
- Group tests by feature/module
- Use beforeEach/afterEach for test isolation
- Include clear test descriptions and comments

**Deliverables:**
Every test suite MUST include:
1. **Page Object Classes** (TypeScript with proper typing)
2. **Test Specs** (organized by feature)
3. **playwright.config.ts** (with proper timeouts, retries)
4. **CI/CD pipeline config** (GitHub Actions example)
5. **README** with setup and execution instructions

**Output Format:**
Provide production-ready Playwright tests with POM structure, TypeScript types, and comprehensive assertions. Include CI/CD configuration and best practice comments.`
    }
  ];

  // PRZENIESIENIE AGENTÓW DO STANU - z persystencją w localStorage
  const [companyAgents, setCompanyAgents] = useState(() => {
    const saved = localStorage.getItem('aura_agents_v1.0')
    return saved ? JSON.parse(saved) : defaultAgents
  })

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('aura_forge_v1.0')
    return saved ? JSON.parse(saved) : []
  })

  // Persystencja agentów w localStorage
  useEffect(() => {
    localStorage.setItem('aura_agents_v1.0', JSON.stringify(companyAgents))
  }, [companyAgents])

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

  const activateAgent = (agent) => {
    copyToClipboard(agent.systemPrompt)
    setSystemStatus(`AGENT ${agent.role.toUpperCase()} INITIALIZED! READY TO PASTE`)
    setTimeout(() => setSystemStatus("System Ready"), 4000)
  }

  // FUNKCJA ZAPISYWANIA ZMIAN W AGENCIE
  const saveAgentChanges = (updatedAgent) => {
    setCompanyAgents(prevAgents => 
      prevAgents.map(agent => 
        agent.id === updatedAgent.id ? updatedAgent : agent
      )
    )
    setEditingAgent(null)
    setSystemStatus("AGENT CUSTOMIZATION SAVED!")
    setTimeout(() => setSystemStatus("System Ready"), 3000)
  }

  // FUNKCJA RESETOWANIA AGENTA DO WARTOŚCI DOMYŚLNYCH
  const resetAgentToDefault = (agentId) => {
    const defaultAgent = defaultAgents.find(a => a.id === agentId)
    if (defaultAgent) {
      setCompanyAgents(prevAgents => 
        prevAgents.map(agent => 
          agent.id === agentId ? { ...defaultAgent } : agent
        )
      )
      setEditingAgent(null)
      setSystemStatus("AGENT RESET TO DEFAULT")
      setTimeout(() => setSystemStatus("System Ready"), 3000)
    }
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
          <button onClick={() => setActiveTab('agents')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'agents' ? 'bg-white/10 border-l-4' : 'opacity-40 hover:opacity-100'}`} style={{ borderColor: accentColor }}>
            <IconAgents color={activeTab === 'agents' ? accentColor : '#fff'} /> Agents
          </button>
          <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-white/10 border-l-4' : 'opacity-40 hover:opacity-100'}`} style={{ borderColor: accentColor }}>
            <IconAbout color={activeTab === 'about' ? accentColor : '#fff'} /> About Kit
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Status bar - widoczny globalnie */}
        <div className="fixed top-8 right-8 z-50">
          <p 
            className="text-[10px] font-mono uppercase tracking-[0.3em] px-6 py-3 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all"
            style={{ 
              color: systemStatus.includes("AGENT") ? accentColor : "white",
              borderColor: systemStatus.includes("AGENT") ? accentColor : "rgba(255,255,255,0.1)"
            }}
          >
            {systemStatus}
          </p>
        </div>

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
                            const newFavs = favorites.filter(f => f.id !== fav.id);
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

        {activeTab === 'agents' && (
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 border-b border-white/10 pb-8">
              <h2 className="text-4xl font-black uppercase italic mb-2">Company Agents</h2>
              <p className="text-sm opacity-50 font-mono">Activate and customize specialized AI personas for your team</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyAgents.map((agent, i) => (
                <div 
                  key={agent.id} 
                  className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all shadow-2xl group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-black mb-2" style={{ color: agent.color }}>{agent.role}</h3>
                      <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{agent.specialization}</p>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full animate-pulse" 
                      style={{ backgroundColor: agent.color, boxShadow: `0 0 20px ${agent.color}` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm opacity-70 leading-relaxed mb-8 font-light">{agent.description}</p>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => activateAgent(agent)}
                      className="w-full px-6 py-4 rounded-xl font-bold uppercase text-[10px] text-slate-900 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
                      style={{ backgroundColor: agent.color }}
                    >
                      Activate Agent
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedAgentForPreview(agent)}
                        className="flex-1 px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all"
                      >
                        View Instructions
                      </button>
                      <button
                        onClick={() => setEditingAgent({ ...agent })}
                        className="flex-1 px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all"
                      >
                        Customize Agent
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">Quick Start Guide:</h3>
              <ol className="text-sm opacity-70 space-y-2 font-mono">
                <li>1. Click "Activate Agent" - instructions are copied to clipboard instantly</li>
                <li>2. Use "Customize Agent" to adapt prompts for specific client requirements</li>
                <li>3. Use "View Instructions" to preview agent's full system prompt</li>
                <li>4. Paste customized instructions into Cursor/Copilot settings</li>
              </ol>
            </div>

            {/* MODAL Z PODGLĄDEM INSTRUKCJI AGENTA */}
            {selectedAgentForPreview && (
              <div 
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-8"
                onClick={() => setSelectedAgentForPreview(null)}
              >
                <div 
                  className="max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-3xl bg-slate-900 border-2 shadow-2xl"
                  style={{ borderColor: selectedAgentForPreview.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2" style={{ color: selectedAgentForPreview.color }}>
                        {selectedAgentForPreview.role}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-widest opacity-40">
                        {selectedAgentForPreview.specialization}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedAgentForPreview(null)}
                      className="p-2 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <IconClose color="#fff" />
                    </button>
                  </div>

                  <div className="mb-6 p-4 rounded-xl bg-white/5">
                    <p className="text-sm opacity-70 leading-relaxed">{selectedAgentForPreview.description}</p>
                  </div>

                  <div className="p-6 rounded-xl bg-slate-950 border border-white/10">
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">System Prompt:</h4>
                    <pre className="text-xs font-mono opacity-70 whitespace-pre-wrap leading-relaxed">
                      {selectedAgentForPreview.systemPrompt}
                    </pre>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button 
                      onClick={() => {
                        activateAgent(selectedAgentForPreview);
                        setSelectedAgentForPreview(null);
                      }}
                      className="flex-1 px-6 py-4 rounded-xl font-bold uppercase text-[10px] text-slate-900 shadow-lg transition-all hover:scale-105"
                      style={{ backgroundColor: selectedAgentForPreview.color }}
                    >
                      Copy to Clipboard
                    </button>
                    <button 
                      onClick={() => setSelectedAgentForPreview(null)}
                      className="px-6 py-4 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL EDYCJI AGENTA */}
            {editingAgent && (
              <div 
                className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-8"
                onClick={() => setEditingAgent(null)}
              >
                <div 
                  className="max-w-5xl w-full max-h-[85vh] overflow-y-auto p-8 rounded-3xl bg-slate-900 border-2 shadow-2xl"
                  style={{ borderColor: editingAgent.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-black mb-2" style={{ color: editingAgent.color }}>
                        Customize {editingAgent.role}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-widest opacity-40">
                        Adapt agent for client-specific requirements
                      </p>
                    </div>
                    <button 
                      onClick={() => setEditingAgent(null)}
                      className="p-2 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <IconClose color="#fff" />
                    </button>
                  </div>

                  {/* FORMULARZ EDYCJI */}
                  <div className="space-y-6">
                    {/* Specialization */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-3">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={editingAgent.specialization}
                        onChange={(e) => setEditingAgent({ ...editingAgent, specialization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-sm font-mono transition-all"
                        placeholder="e.g., Python • FastAPI • Docker"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-3">
                        Description
                      </label>
                      <textarea
                        value={editingAgent.description}
                        onChange={(e) => setEditingAgent({ ...editingAgent, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none text-sm resize-none transition-all"
                        rows="3"
                        placeholder="Brief description of agent's expertise..."
                      />
                    </div>

                    {/* System Prompt - duże pole tekstowe */}
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-3">
                        System Prompt
                      </label>
                      <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                        <textarea
                          value={editingAgent.systemPrompt}
                          onChange={(e) => setEditingAgent({ ...editingAgent, systemPrompt: e.target.value })}
                          className="w-full h-[400px] bg-transparent border-none focus:outline-none text-xs font-mono opacity-80 resize-none"
                          placeholder="Paste client-specific guidelines, coding standards, or custom instructions here..."
                        />
                      </div>
                      <p className="text-[9px] opacity-40 mt-2 font-mono">
                        💡 Tip: Paste client's coding standards, architectural patterns, or compliance requirements
                      </p>
                    </div>
                  </div>

                  {/* Przyciski akcji */}
                  <div className="mt-8 flex gap-4">
                    <button 
                      onClick={() => saveAgentChanges(editingAgent)}
                      className="flex-1 px-6 py-4 rounded-xl font-bold uppercase text-[10px] text-slate-900 shadow-lg transition-all hover:scale-105"
                      style={{ backgroundColor: editingAgent.color }}
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => resetAgentToDefault(editingAgent.id)}
                      className="px-6 py-4 rounded-xl font-bold uppercase text-[10px] border border-yellow-500/50 text-yellow-500/70 hover:bg-yellow-500/10 transition-all"
                    >
                      Reset to Default
                    </button>
                    <button 
                      onClick={() => setEditingAgent(null)}
                      className="px-6 py-4 rounded-xl font-bold uppercase text-[10px] border border-white/20 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
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