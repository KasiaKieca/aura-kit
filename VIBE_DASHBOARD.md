# 🗺️ VIBE_DASHBOARD - AuraKit

## 🎯 Product Vision
An interactive playground and starter kit for learning Vibe Coding. This tool helps users translate natural language into functional apps using GitHub Copilot, bridging the gap between "idea" and "code".

---

## ✅ MVP Features (Must-have)
- [x] **"Vibe-first" structure**: Core UI reacts to commands like `/vibe` and `/status`.
- [x] **Prompt Refiner**: The `/refine` command is active and generates AI instructions.
- [x] **Setup Environment**: React + Tailwind CSS is fully configured and running.
- [ ] **Interactive Examples**: Add a "Before & After" panel for prompt learning.
- [ ] **Prompt History**: Save previous refinements so they don't disappear.

---

## 🛠️ Technical Operations (Manual Re-Setup)
If the system fails or you move to a new machine:
1. **Check Node:** Use Node 20+.
2. **Fresh Install:** `rm -rf node_modules package-lock.json && npm install`.
3. **Run Dev:** `npm run dev`.

---

## 🪄 AuraKit Strategy & Flow
1. **Idea Phase**: Describe a "vibe" (e.g., "retro neon").
2. **Refine Phase**: Use AuraKit's `/refine` to get the technical prompt.
3. **Apply Phase**: Paste the refined prompt into GitHub Copilot.
4. **Vibe Check**: Verify the result in the live dashboard.

---

## 🚀 Roadmap
1. **Phase 1**: Core Dashboard & CLI (DONE ✅)
2. **Phase 2**: Prompt Lab & Refiner Logic (DONE ✅)
3. **Phase 3**: Persistence (Saving prompts to local storage).
4. **Phase 4**: Exporting results to a standalone React component.