# APEX - Simracing Beginner Curriculum & Self-Assessment Web App

> **Task Plan**: `apex-simracing-app.md`
> **Project Type**: WEB (React + Vite + Modern Vanilla CSS SPA)
> **Primary Focus**: Chapter 1 - *A Plan of Attack* (Skip Barber Curriculum)

---

## Overview

APEX is an interactive web app built for beginner simracers to learn racing physics, self-assess driving techniques, and track progress using Skip Barber's *Going Faster!* methodology.

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS with Telemetry Dark Design Tokens (glassmorphic dark UI, neon apex green accents, monospaced metrics)
- **Icons**: Lucide-React
- **Persistence**: Browser LocalStorage & IndexedDB with JSON Export/Import
- **Visuals**: HTML5 Canvas for racing line dynamics & interactive telemetry map

---

## Task Breakdown

### Phase 1: Environment & Foundation Setup
- [x] Task 1.1: Initialize Vite React app manifest (`package.json`, `vite.config.js`, `index.html`)
- [x] Task 1.2: Build Telemetry Dark design system in `src/index.css` (variables, glassmorphic cards, neon glow effects)
- [x] Task 1.3: Create LocalStorage persistence manager (`src/utils/storage.js`) and physics helpers (`src/utils/physics.js`)

### Phase 2: Curriculum Data & Header Navigation
- [x] Task 2.1: Author Skip Barber Chapter 1 structured dataset (`src/data/chapter1Data.js` & `src/data/quizData.js`)
- [x] Task 2.2: Create Navigation Header & Tab Switcher (`src/components/Header.jsx`, `src/components/Navigation.jsx`)

### Phase 3: Interactive Chapter 1 Workbench Components
- [x] Task 3.1: Build Interactive Racing Line & Radius Simulator Canvas (`src/components/LineSimulator.jsx`)
- [x] Task 3.2: Build Sebring Test Circuit Telemetry Walkthrough (`src/components/SebringWalkthrough.jsx`)
- [x] Task 3.3: Build Self-Assessment Rubric & Mastery Score Calculator (`src/components/SelfAssessment.jsx`)
- [x] Task 3.4: Build Sim Practice Session Tracker (`src/components/SessionTracker.jsx`)
- [x] Task 3.5: Build Skip Barber Scenario Quiz Component (`src/components/ChapterQuiz.jsx`)
- [x] Task 3.6: Build Local Data Backup/Restore Modal (`src/components/DataManager.jsx`)

### Phase 4: Assembly & Verification
- [x] Task 4.1: Assemble main layout in `src/App.jsx` and `src/main.jsx`
- [x] Task 4.2: Execute `npm run build` verification
- [x] Task 4.3: Perform UX audit and test state persistence across refreshes

---

## ✅ PHASE X COMPLETE
- Build: ✅ Success (`npm run build` completed in 1.89s with 0 errors)
- Local Server: ✅ Running at `http://localhost:3000/`
- Persistence: ✅ LocalStorage + JSON Export/Import verified
