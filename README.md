# 🧪 AuraKit - Vibe Coding Assistant

AuraKit is a specialized dashboard designed for **Vibe Coders** who want to build applications through creative intent and precise prompting, rather than manual coding.

## 🚀 Key Features
- **Prompt Refiner**: Use the `/refine [idea]` command to transform raw thoughts into professional AI instructions.
- **Dynamic Vibe Control**: Instantly change the entire look of the UI using the `/vibe [color]` command.
- **Real-time Analytics**: Monitor system "Aura Flow" and simulated latency to feel like a true system operator.

## 💡 How to use it?
1. Open your terminal and run `npm run dev`.
2. Access the dashboard at `localhost`.
3. Click the **?** button or type `/help` to see all available commands.
4. Use `/refine` to generate perfect prompts for GitHub Copilot.

## 🎯 Goal
Empowering non-technical and technical users to communicate better with AI and build software faster through "Vibes".
## 🚀 Getting Started

### For New Users (Cloning the repo)
1. **Clone the repo**
2. **Install dependencies:**
   `npm install`
3. **Run development server:**
   `npm run dev`

### 🛠️ Manual Re-Setup (If system fails)
If you need to re-initialize the environment:
1. **Node Check:** Use Node 18+ (Vite 5) or Node 20+ (Vite 6).
2. **Sync:** `rm -rf node_modules package-lock.json && npm install`
3. **Tailwind Fix:** Ensure `postcss.config.js` uses `@tailwindcss/postcss`.

---

## 🧪 Testing & Quality Assurance (Health Check)
To verify if the environment is stable:
- **Visual Test:** The background must be dark (`#020617`) with a cyan-glowing logo.
- **Config Audit:** Ensure `tailwind.config.js` and `postcss.config.js` exist in the root folder.
- **Build Test:** Run `npm run build` to check if Tailwind styles compile without errors.

---

## ⌨️ Terminal Mastery (Linux Tips)
- **New Tab:** Use the `+` icon in the VS Code terminal to keep the server running in one tab and use Git in another.
- **Stop Server:** `Ctrl + C`
- **Force Refresh:** Use `npm run dev -- --force` if styles don't update.

---

## 🪄 AuraKit Prompt Library

### 🎨 Visual & Layout (Vibe Phase)
- "Add a glassmorphism sidebar with navigation links: Dashboard, Analytics, Settings, and Aura-Core."
- "Design a centered 'Command Center' input field that looks like a terminal prompt with a pulsing neon border."

### ⚙️ Functional Components
- "Create a 'Vibe Level' card with a circular progress bar that changes color from purple to gold."
- "Build a responsive grid of 3 cards showing real-time stats (Latency, Aura Flow, Active Nodes)."
- "Implement a smooth 'Fade In' animation for all components using Tailwind and Framer Motion."

### 🛠️ Refactoring & Clean Code
- "Review App.jsx and extract the Navigation Sidebar into a separate component file."
- "Optimize the Tailwind classes in the main container for better readability."