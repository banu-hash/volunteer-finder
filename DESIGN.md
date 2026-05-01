# Design Brief

## Overview
Volunteer Finder System — professional NGO platform connecting volunteers with tasks using AI matching. Trust-centered, purpose-driven interface with card-based task display and role-specific dashboards.

## Tone & Aesthetic
Professional + purposeful. Warm, human-centered, accessible. Community-focused (not corporate coldness). No unnecessary decoration — functional clarity prioritized.

## Color Palette
| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| **Primary** | `0.5 0.16 193` (Teal) | `0.68 0.16 193` | Community, trust, NGO credibility |
| **Accent** | `0.68 0.17 68` (Amber) | `0.78 0.17 68` | Urgent tasks, CTAs, time-sensitive actions |
| **Success** | `0.65 0.22 155` (Emerald) | `0.75 0.22 155` | Completed tasks, verified proof |
| **Destructive** | `0.55 0.22 25` (Coral) | `0.65 0.19 22` | Rejections, urgent warnings |
| **Neutral** | `0.98→0.12` Grays | `0.12→0.95` Grays | Backgrounds, text, borders |

## Typography
| Layer | Font | Use |
|-------|------|-----|
| Display | Bricolage Grotesque | Headers, badges, Match Score labels |
| Body | General Sans | Content, task descriptions, UI text |
| Mono | Geist Mono | Technical data, timestamps, tracking IDs |

## Shape Language
Soft rounded corners: `0.5rem` (8px) default radius. Card-based layout with intentional shadows. Slightly playful but professional — never harsh edges.

## Elevation & Shadows
- **Card**: `0 2px 8px rgba(foreground / 0.08)` — baseline card shadow
- **Elevated**: `0 4px 16px rgba(foreground / 0.12)` — hover state, modals, floating elements
- No neon/glow effects — all shadows use foreground color with opacity

## Structural Zones
| Zone | Light BG | Dark BG | Purpose |
|------|----------|---------|---------|
| Header | `0.98` (near-white) | `0.14` (dark slate) | Navigation, branding, theme toggle |
| Content | `0.98` | `0.12` | Main dashboard grid |
| Cards | `0.99` | `0.16` | Task cards, stat cards, content blocks |
| Sidebar | `0.98` | `0.14` | Role navigation, filters, secondary menu |
| Footer | `0.93` | `0.2` | Legal, status, secondary links |

## Component Patterns
- **Task Cards**: Featured Match Score % badge top-right, amber accent for urgency level, location + distance displayed prominently
- **Dashboards**: Grid layout (responsive), card-based sections for Volunteers (assigned, recommended, history), NGOs (overview, tasks, analytics), Admins (platform stats, user management)
- **Badges**: Inline `badge-match` utility for Match Score %, semantic colors for status (success/destructive)
- **Interactive**: Hover elevates shadows, smooth transitions on all interactive elements

## Motion & Interactions
- **Default transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- **Micro-animations**: 
  - `pulse-gentle`: 2s pulsing for attention (notifications, active indicators)
  - `fade-in`: 0.3s entry animation for cards/content
  - `slide-up`: 0.3s entrance from below for task recommendations
- Choreography: Stagger animations on card grids (100-150ms between items)

## Differentiation
**Hero element**: Match Score % badge displayed as prominent teal/amber badge on task cards. Central to AI matching narrative. Visible immediately on volunteer dashboard.

## Mobile-First Breakpoints
- **sm**: 640px — single column cards → 2-column grid
- **md**: 768px — sidebar becomes collapsible
- **lg**: 1024px — full dashboard layout with sidebar
- **xl**: 1280px — expanded content width

## Dark Mode Implementation
- Background gradient from `0.12` (pure dark) to `0.2` (elevated surfaces)
- Teal primary brightened to `0.68 L` for visibility against dark
- Amber accent brightened to `0.78 L` for action prominence
- Text locked at `0.95 L` for WCAG AAA contrast

## Constraints
- No full-page gradients — depth via layers, not overlays
- Max chroma on accent colors to avoid harshness
- No semi-transparent text (opacity on containers instead)
- Spacing multiples of 4px (Tailwind standard) — 8px, 12px, 16px, 24px, 32px
- Icon sizes: 16px (xs), 20px (sm), 24px (md), 32px (lg)

## Signature Detail
Teal accent border on left edge of task cards to reinforce primary brand color and create quick visual scanning path. Combined with amber accent badge creates distinctive "trusted + urgent" visual language.
