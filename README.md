<div align="center">

# Home Assistant Ultimate Themes

**154 themes. 11 aesthetics. 14 colours. A background for every dashboard and every tab.**

[![Latest release](https://img.shields.io/github/v/release/HomeRiz/Home-Assistant-Ultimate-Themes?style=flat-square&label=release)](https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes/releases/latest)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://hacs.xyz)
[![Validate](https://img.shields.io/github/actions/workflow/status/HomeRiz/Home-Assistant-Ultimate-Themes/validate.yml?branch=main&style=flat-square&label=validate)](https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes/actions/workflows/validate.yml)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes/blob/main/LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.11%2B-41BDF5.svg?style=flat-square)](https://www.home-assistant.io)

[![Ultimate Glass, Violet](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/glass/violet.webp)](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/glass/violet.webp)

</div>

---

Eleven aesthetics, each rendered in fourteen colours. Every combination gets its
own artwork, its own accent and its own theme entry, so each dashboard or tab can
carry a different one.

```
10 aesthetics  ×  (1 base + 14 colours)  =  150 themes
 1 aesthetic   ×  (1 base +  3 patterns) =    4 themes
                                          =  154 themes
```

Three of them are complete engines — **Glass**, **Velvet** and **Neon** — defining
how a card behaves: blur character, radii, border language. The rest borrow the
engine that suits their material and bring their own world.

---

## How to Install

You can install this project in **two ways from the same repository**:

```
                               ┌──────────────────────────────────────────────────┐
                               │ https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes
                               └─────────┬───────────────────────────────┬────────┘
                                         │                               │
                      ┌──────────────────┴───────────────┐ ┌─────────────┴─────────────────┐
                      │  METHOD 1: HATS ADD-ON (Ingress) │ │  METHOD 2: HACS THEME PACK    │
                      │  Visual Designer, Live Sandbox,  │ │  Pure YAML theme pack         │
                      │  1-Click Pack & Theme Installer  │ │  (154 Themes)                 │
                      └──────────────────────────────────┘ └───────────────────────────────┘
```

### Option A (Recommended) — Install the HATS Add-on 🎩

1. In Home Assistant, go to **Settings** → **Add-ons** → **Add-on Store**.
2. Click the top-right menu (**⋮**) → **Repositories** → Paste `https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes` → **Add**.
3. Select **HATS - Home Assistant Theme Store** from the store list → Click **Install** → Toggle **Show in sidebar** → **Start**.
4. Open **HATS** from your sidebar: you can visually design new themes (including kids & custom themes), customize blurs/palettes, or click **"Install Full Theme Pack"** to install all 154 themes with 1 click!

---

### Option B — Install via HACS (Theme Pack only)

#### Step 1 — install card-mod

**This theme does not work without it.** card-mod is what draws the glass and the
backgrounds; without it you get the colours and nothing else, and no error
explaining why.

[![Open card-mod in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=lovelace-card-mod&category=plugin)

Or in HACS, search for **card-mod** and download it.

#### Step 2 — install this theme pack

[![Open this theme in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=HomeRiz&repository=Home-Assistant-Ultimate-Themes&category=theme)

The button adds it as a custom repository. If you would rather do it by hand:
**HACS → ⋮ (top right) → Custom repositories**, paste
`https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes`, type **Theme**, **Add**.

Then search HACS for **Home Assistant Ultimate Themes** and **Download**.

### Step 3 — find your card-mod URL

Go to **Settings → Dashboards → ⋮ (top right) → Resources**.

Find the row for card-mod. It has this shape, ending in a 12-digit number:

```
/hacsfiles/lovelace-card-mod/card-mod.js?hacstag=############
```

**Copy the real line from your own screen, number included.** Do not copy the
one above — `hacstag` is the version stamp HACS puts on the file, so it differs
per instance and changes whenever card-mod updates. A number taken from
somewhere else gives you a 404 that only shows up on Settings, while dashboards
keep working — which makes it look like a theme bug rather than a wrong URL.

### Step 4 — add one line to `configuration.yaml`

You most likely already have this block:

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

Add `extra_module_url` to it, with the line you just copied:

```yaml
frontend:
  themes: !include_dir_merge_named themes
  extra_module_url:
    - /hacsfiles/lovelace-card-mod/card-mod.js?hacstag=XXXXXXXXXXXX
```

Replace `XXXXXXXXXXXX` with your own number from Step 3.

> **Why this line is needed:** dashboard resources are only loaded on Lovelace
> dashboards. Without `extra_module_url`, card-mod never runs on Settings,
> Developer Tools or HACS — those pages get the colours but no background and no
> glass. Keep the Resources entry as it is; you need both.

### Step 5 — restart and pick a theme

**Restart Home Assistant.** A theme reload is not enough — `extra_module_url` is
only read at startup.

Then: your username, bottom left → **Theme** → pick one. Start with
`Ultimate Glass - Cobalt`, and set the dropdown beside it to **Dark**.

> **Give it a few seconds on the first load.** The module is fetched separately
> from the rest of the frontend, so Settings can render plain and then pick up the
> background a moment later. That is not a broken install.

> **Why dark?** All backgrounds are dark so white card text stays readable. Light
> mode works and uses lighter card surfaces, but keeps light text.

**Something not working?** → [Troubleshooting](INSTALL.md#troubleshooting)

---

## A theme per tab

Every colour exists as a full theme, so a single dashboard can change backdrop as
you move between tabs. Your tabs stay whatever they are — you just choose a colour
for each. In the dashboard's **Raw configuration editor**:

```yaml
theme: Ultimate Glass - Cobalt        # the whole dashboard

views:
  - title: Kitchen
    path: kitchen
    theme: Ultimate Glass - Amber      # just this tab

  - title: Energy
    path: energy
    theme: Ultimate Neon - Citrine
```

Each tab gets that theme's colours *and* its backdrop. Mixing aesthetics across
tabs works — Glass on one, Neon on the next.

[Full guide, including image-only overrides →](docs/PER-VIEW-BACKGROUNDS.md)

---

## Gallery

Eleven aesthetics down, seven of the fourteen colours across. Same colour, same
composition — only the aesthetic changes.

[![Three aesthetics across seven colours](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/aesthetics.webp)](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/aesthetics.webp)

<sub>Click to view full size.</sub>

<details>
<summary><b>All fourteen colours, one aesthetic at a time</b></summary>

**Ultimate Glass** — heavy blur, 30px radii, no borders, bright specular rim.

[![All 14 colours in Ultimate Glass](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/glass.webp)](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/glass.webp)

**Ultimate Velvet** — softer blur, 18px radii, hairline borders, muted pastels.

[![All 14 colours in Ultimate Velvet](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/velvet.webp)](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/velvet.webp)

**Ultimate Neon** — near-black, 12px radii, accent borders with outer glow.

[![All 14 colours in Ultimate Neon](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/neon.webp)](https://raw.githubusercontent.com/HomeRiz/Home-Assistant-Ultimate-Themes/main/docs/previews/neon.webp)

</details>

---

## The eleven aesthetics

| Aesthetic | Engine | Character |
|---|---|---|
| **Glass** | — | heavy blur, 30px radii, no borders, bright specular rim |
| **Velvet** | — | softer blur, 18px radii, hairline borders, muted pastels |
| **Neon** | — | near-black, 12px radii, accent borders with outer glow |
| **Cyberprep** | Glass | polished graphite and chrome, clean cyan light |
| **Solarpunk** | Velvet | canopy light, gold and green, overgrown |
| **Dark Academia** | Velvet | candlelight, oxblood, chiaroscuro |
| **Cottagecore** | Velvet | dusk hearth light, sage and cream, matte |
| **Cyberpunk** | Neon | wet asphalt, signage bokeh, grimy |
| **Synthwave** | Neon | grid horizon, banded sun, VHS artefacts |
| **Art Deco** | Neon, no glow | black lacquer, brass geometry, symmetrical |
| **Ionut** | Glass | deep navy, low-poly and circuit patterns |

An aesthetic that borrows an engine keeps its card behaviour and changes only
the world it is set in. A theme does not need its own answer to *how round is a
card* — it needs its own artwork.

Art Deco is the exception that proves it: Neon's geometry, none of its light.
Brass reflects rather than emits, and a glowing border reads as neon signage.

## The 14 colours

Roughly 25–30° apart on the colour wheel, plus two neutrals. Listed in spectral
order — the theme picker reads as a gradient.

| | | |
|---|---|---|
| `Ember` | `Rose` | `Amber` |
| `Citrine` | `Lime` | `Verdant` |
| `Jade` | `Lagoon` | `Azure` |
| `Cobalt` | `Indigo` | `Violet` |
| `Sand` | `Graphite` | |

Adding or retiring one is a single line in `build/areas.py`.

**Ionut is the exception.** Its variants are patterns, not colours — Circuit,
Facet and Fusion — because an aesthetic defined by a pattern has no Ember. It
declares its own set in `VARIANTS`; everything else renders the fourteen above.

---

## Documentation

| | |
|---|---|
| [Install guide](INSTALL.md) | Every route, in detail, plus troubleshooting |
| [Per-tab backgrounds](docs/PER-VIEW-BACKGROUNDS.md) | Profile, dashboard and view level |
| [Customising](docs/CUSTOMISING.md) | Feature list, rebuilding, your own artwork |
| [Architecture](docs/ARCHITECTURE.md) | How the glass engine and build pipeline work |
| [Image prompts](docs/IMAGE-PROMPTS.md) | Every prompt behind the artwork |
| [Changelog](CHANGELOG.md) | What changed, and what turned out to be wrong |

## Contributing

Issues and pull requests welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Screenshots are the review for anything visual.

## Licence

[MIT](https://github.com/HomeRiz/Home-Assistant-Ultimate-Themes/blob/main/LICENSE). Portions of the CSS derive from other MIT-licensed themes; those
notices are in [NOTICE.md](NOTICE.md).
