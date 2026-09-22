export type EngineType = 'glass' | 'velvet' | 'neon' | 'kids' | 'flat' | 'custom';

export interface PaletteColors {
  primary: string;
  accent: string;
  red: string;
  pink: string;
  purple: string;
  indigo: string;
  blue: string;
  lightBlue: string;
  cyan: string;
  teal: string;
  green: string;
  yellow: string;
  orange: string;
  brown: string;
  grey: string;
}

export interface EngineSettings {
  engineType: EngineType;
  blurAmount: number;        // e.g. 16px
  saturateAmount: number;    // e.g. 1.45
  brightnessAmount: number;  // e.g. 1.0
  cardRadius: number;        // e.g. 30px
  badgeRadius: number;       // e.g. 24px
  mushRadius: number;        // e.g. 24px
  borderWidth: number;       // e.g. 0px or 1px
  borderColor: string;       // e.g. rgba(255, 255, 255, 0.18)
  glassTint: string;         // e.g. rgba(255, 255, 255, 0.06)
  sheenOpacity: number;      // 0 to 1
  sheenAngle: number;        // e.g. 160deg
  sheenBlend: 'normal' | 'screen' | 'overlay' | 'soft-light';
  insetShadow: string;
  hoverGlow: boolean;
  glowColor: string;
  hoverGlowIntensity: number; // e.g. 24px
  backgroundScrim: string;
  fallbackCardBg: string;
  scanlines: boolean;
  scanlineIntensity: number;
}

export interface BackgroundSettings {
  type: 'image' | 'gradient' | 'svg' | 'solid';
  imageUrl?: string;
  imageFileName?: string;
  gradientString?: string;
  svgCode?: string;
  solidColor?: string;
  darken: number;          // 0 to 1 (brightness multiplier = 1 - darken)
  blur: number;            // background blur 0 to 20px
  saturation: number;      // 0.5 to 2
  vignette: number;        // 0 to 1
  headerTintAuto: boolean;
  headerTintColor?: string;
  avgColor?: string;
}

export interface RecommendedCard {
  name: string;
  slug: string;
  hacsRepositoryId?: string;
  hacsUrl?: string;
  description: string;
  installUrl?: string;
}

export interface ThemeRequirements {
  requiresCardMod: boolean;
  requiresThemesDirective?: boolean;
  recommendedCards?: RecommendedCard[];
  note?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  category: 'Glass' | 'Velvet' | 'Neon' | 'Kids' | 'Retro' | 'Nature' | 'SciFi' | 'Minimal' | 'Community';
  author: string;
  authorGithub?: string;
  description: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  isCustom?: boolean;
  requirements?: ThemeRequirements;
  palette: PaletteColors;
  engine: EngineSettings;
  background: BackgroundSettings;
  customCss?: string;
  customSvgOverlay?: string;
  dark: {
    primaryBackground: string;
    secondaryBackground: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
  };
  light: {
    primaryBackground: string;
    secondaryBackground: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export interface CommunityThemeSubmission {
  id: string;
  theme: ThemeConfig;
  status: 'pending' | 'approved' | 'in_review' | 'pruned';
  upvotes: number;
  downvotes: number;
  userVoted?: 'up' | 'down';
  prUrl?: string;
  commentsCount: number;
}
