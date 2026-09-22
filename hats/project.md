# Home Assistant Theme Store (HATS)

> **The Interactive Visual Designer, Community Store, and Generator for Home Assistant Themes**

---

## 1. Executive Summary & Vision

**HATS** (**H**ome **A**ssistant **T**heme **S**tore) is a standalone, browser-based visual design studio and community management application built to work in parallel with the **Home Assistant Ultimate Themes** ecosystem. 

It bridges the gap between raw YAML/Jinja build scripts and everyday creators by providing an intuitive, real-time sandbox. Users can visually design themes, upload artwork, compose custom SVG patterns, write live-injected CSS, customize color engines, preview realistic Home Assistant dashboards, manage their local theme collection, and **submit their themes directly as GitHub Pull Requests to the official Ultimate Themes repository**.

Furthermore, it integrates community-driven lifecycle management, allowing the community to propose, vote on, adopt, or prune themes over time.

---

## 2. Parallel Ecosystem with Home Assistant Ultimate Themes

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                       HATS HOME ASSISTANT ADD-ON (INGRESS)                     │
│                                                                                │
│  ┌───────────────────────┐   ┌────────────────────────┐   ┌─────────────────┐  │
│  │ Visual Theme Designer │   │  Live Lovelace Sandbox │   │ In-App PR Engine│  │
│  │ (Palette, CSS, SVG)   │◄──┤ (Glass / Velvet / Neon)│──►│ (GitHub OAuth)  │  │
│  └──────────┬────────────┘   └────────────────────────┘   └────────┬────────┘  │
│             │                                                      │           │
│             ▼ Direct /config/themes & supervisor/reload_themes     ▼ Submit PR │
├─────────────┼──────────────────────────────────────────────────────┼───────────┤
│             ▼                                                      ▼           │
│ ┌──────────────────────────┐                             ┌───────────────────┐ │
│ │ Home Assistant Instance  │                             │Official Repository│ │
│ │ (/config/themes/*.yaml)  │                             │ (Ultimate Themes) │ │
│ └──────────────────────────┘                             └───────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────┘
```

The app functions as both an independent theme builder for individual Home Assistant instances and the official visual authoring interface for the **Home-Assistant-Ultimate-Themes** project.

1. **Two-Way Theme Compatibility**:
   - Reads existing theme configurations and presets from the Ultimate Themes catalogue (Glass, Velvet, Neon, Cottagecore, Solarpunk, Cyberpunk, Cyberprep, Art Deco, Dark Academia, Synthwave, Ionut, and new Kids/Playful themes).
   - Generates fully compliant YAML themes that adhere to Home Assistant's native schema and `card-mod` multi-layer injection.
2. **Community Submissions & Upstream Sync**:
   - Users can create custom aesthetic worlds (e.g. *Space Odyssey*, *Pastel Storybook*, *Retro Arcade*, *Nordic Minimal*).
   - With a single click inside the app, the theme, background assets, and metadata are packaged into a GitHub Pull Request directed to `HomeRiz/Home-Assistant-Ultimate-Themes`.
3. **Community Voting & Theme Pruning**:
   - Community dashboard allowing users to vote on proposed themes.
   - Mechanism for the community to vote on retiring or deprecating themes to keep the core pack lightweight and high quality.

---

## 3. Core Feature Pillars

### A. Real-Time Lovelace Sandbox & Live Preview
- **Simulated Home Assistant Dashboard**:
  - Top Navigation Header with dynamic translucent chrome.
  - Sidebar navigation with collapsible state and active highlights.
  - Mushroom-style cards, modern Tile cards, Glance cards, Weather widgets, Climate/Thermostat controls, and Media Player bars.
  - Badges, status chips, and button-card layouts.
- **Physical Glassmorphism Engine**:
  - True `backdrop-filter: blur(...)` with saturation boosts.
  - Directional specular sheen (`::after` rim gradient) simulating overhead physical light.
  - Inset borders and atmospheric outer glow.
  - Scrim overlay and graceful degradation fallbacks for older devices.
- **Dark / Light Mode Preview**: Instant toggle to verify readability and contrast across both day and night modes.

### B. Artwork & Background Studio
- **Image Upload & Formatting**:
  - Drag-and-drop support for PNG, JPG, WebP, and SVG.
  - Smart 16:9 (2560×1440) aspect ratio crop with focal-point centering.
- **Real-Time Image Processing**:
  - Sliders for *Darken Factor* (ensures card text and glass layers remain legible).
  - Saturation, contrast, blur, vignette, and ambient gradient adjustments.
- **Auto-Palette & Dominant Color Extraction**:
  - Analyzes background image pixels to compute the average color (for header chrome) and dominant spectral accent (for primary buttons and active states).
- **SVG & Vector Layer Studio**:
  - Paste raw SVG code or choose from generative procedural patterns (dots, noise, waves, geometric grids, space stars, storybook clouds).

### C. Visual Engine & Palette Tuner
- **Engine Selection**:
  - `Glass`: Heavy blur (`16px`), large radii (`30px`), specular sheen.
  - `Velvet`: Soft matte blur (`12px`), medium radii (`18px`), pastel low-contrast tones.
  - `Neon`: Tight radii (`12px`), high-contrast glowing borders, scanline textures.
  - `Kids / Playful`: Bubbly extra-large radii (`32px`), vibrant candy palette, soft playful shadows.
  - `Custom Engine`: Full manual control over every slider.
- **Automated HA Token Ladder**:
  - Automatically calculates Home Assistant's `--ha-color-primary-05` through `--ha-color-primary-95` luminosity ramp.
  - Derives RGB tokens (`--token-rgb-*`) for deep integration with official HA components.

### D. Custom CSS & Code Sandbox
- **Live CSS Injection**: Real-time CSS code editor injecting styles directly into the live preview DOM.
- **Custom Fonts & Keyframes**: Import web fonts (Google Fonts, custom typefaces) and CSS animations.
- **Card-Mod Inspector**: Visually see how CSS targets `card-mod-card`, `card-mod-root`, `card-mod-view`, `card-mod-sidebar`, and `card-mod-config`.

### E. Theme Management & Theme List
- **Local Theme Registry**:
  - View all active themes with visual thumbnail cards.
  - Add, duplicate, modify, rename, or delete themes.
  - Filter by category (Glass, Matte, Cyber, Kids, Nature, Retro, Minimal).
- **Import / Export**:
  - Download single `theme.yaml` or unified multi-theme files.
  - Export copy-paste `per-view-backgrounds.yaml` snippets for individual dashboard views.
  - Import existing Home Assistant theme YAML files to reverse-engineer and customize them.

### F. In-App GitHub PR Engine & Community Governance
- **One-Click GitHub Pull Request**:
  - Authenticate securely via GitHub Personal Access Token or OAuth.
  - Automatically forks repository, creates a new branch, commits the theme YAML, background image, and metadata, and opens a PR to `HomeRiz/Home-Assistant-Ultimate-Themes`.
- **Submission Validation**: Runs automated sanity checks (YAML syntax, image dimensions, contrast ratios, card-mod theme key matching) before sending the PR.
- **Community Upvotes & Review**:
  - Community tab displaying pending theme submissions.
  - Voting system for new theme proposals.
  - Deprecation / pruning voting to manage package size and relevance.

---

## 4. Technical Architecture & Stack

```
HATS (Home Assistant Theme Store)
├── index.html                   # HTML entry point with meta & fonts
├── package.json                 # Dependencies & build scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS styling system
├── src/
│   ├── main.tsx                 # React application entry
│   ├── App.tsx                  # Master layout & tab navigation
│   ├── types/
│   │   └── theme.ts             # TypeScript definitions for themes, engines, tokens
│   ├── state/
│   │   └── useThemeStore.ts     # Global state (Theme list, active theme, history)
│   ├── services/
│   │   ├── yamlGenerator.ts     # Generates HA-compliant theme.yaml & snippets
│   │   ├── yamlParser.ts        # Parses existing HA theme YAML files
│   │   ├── colorEngine.ts       # Palette ladders, RGB tokens, color mixing
│   │   ├── imageProcessor.ts    # Canvas resizing, auto-darkening, color extraction
│   │   └── githubService.ts     # GitHub API PR creation & validation
│   ├── components/
│   │   ├── navbar/              # Top navigation, mode switch, export actions
│   │   ├── preview/             # Simulated Home Assistant Lovelace dashboard
│   │   │   ├── DashboardPreview.tsx
│   │   │   ├── MockCard.tsx
│   │   │   ├── MockMushroomCard.tsx
│   │   │   ├── MockHeader.tsx
│   │   │   └── MockSidebar.tsx
│   │   ├── editor/              # Control panels
│   │   │   ├── EngineSettings.tsx
│   │   │   ├── PaletteEditor.tsx
│   │   │   ├── BackgroundStudio.tsx
│   │   │   ├── SvgPatternEditor.tsx
│   │   │   └── CustomCssEditor.tsx
│   │   ├── library/             # Theme registry (list, add, remove, search)
│   │   │   ├── ThemeGallery.tsx
│   │   │   └── ThemeCard.tsx
│   │   ├── github/              # PR creation modal & community voting
│   │   │   ├── SubmitPrModal.tsx
│   │   │   └── CommunityVoting.tsx
│   │   └── common/              # Color pickers, sliders, modals, tooltips
│   └── presets/                 # Built-in presets (Ultimate Glass, Velvet, Neon, Kids, etc.)
│       └── defaultThemes.ts
```

---

## 5. Development Milestones

1. **Phase 1: Foundation & Sandbox (Core)**
   - Vite + React + TypeScript + Tailwind setup.
   - Full data model (`ThemeConfig`, `EngineMode`, `ColorRamp`).
   - Interactive Lovelace Dashboard Preview with live glassmorphism & cards.
   - Built-in default presets (Glass, Velvet, Neon, Kids/Playful).

2. **Phase 2: Customization & Studio Tools**
   - Palette & Accent Ladder Generator (`--ha-color-primary-05..95`).
   - Image & Artwork Studio (Upload, Canvas Darken, Crop, Auto-Color Extraction).
   - SVG Pattern Designer & Custom CSS Live Injector.

3. **Phase 3: Theme Management & YAML Exporter**
   - Theme Library (Add / Edit / Clone / Delete themes).
   - Home Assistant YAML Exporter (theme file, view snippets, button-card templates).
   - Theme YAML Import parser.

4. **Phase 4: GitHub PR Engine & Community Hub**
   - In-app GitHub integration (automated Fork, Branch, Commit, and PR creation).
   - PR preview & automated pre-flight checks.
   - Community proposal & voting dashboard.
