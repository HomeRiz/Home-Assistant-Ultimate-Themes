import { ThemeConfig } from '../types/theme';

export interface ValidationReport {
  safe: boolean;
  warnings: string[];
  sanitizedTheme: ThemeConfig;
}

/**
 * Sanitizes and validates custom CSS to prevent pointer trapping, layout crashes,
 * and malicious/broken styling in Home Assistant web components and Lovelace dashboards.
 */
export function sanitizeThemeCss(rawCss: string): string {
  if (!rawCss || typeof rawCss !== 'string') return '';
  let css = rawCss;

  // 1. Remove dangerous script injection vectors
  css = css.replace(/javascript\s*:/gi, '');
  css = css.replace(/expression\s*\([^)]*\)/gi, '');
  css = css.replace(/behavior\s*:[^;}]*/gi, '');
  css = css.replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '');
  css = css.replace(/-moz-binding\s*:[^;}]*/gi, '');

  // 2. CRITICAL SECURITY GUARD: Eliminate pointer-trapping fixed overlays in Shadow DOM
  // Any pseudo element with position: fixed must have pointer-events: none !important
  // If :host::before or :host::after has position: fixed, sanitize it immediately.
  css = css.replace(/(:(?:host|ha-sidebar|ha-app-layout|hui-view|ha-card)[^{}]*::(?:before|after)\s*\{[^}]*?position\s*:\s*fixed[^}]*?\})/gi, (block) => {
    if (!/pointer-events\s*:\s*none/i.test(block)) {
      return block.replace(/\}$/, '  pointer-events: none !important;\n}');
    }
    return block;
  });

  // 3. Prevent any rogue click interception on root elements
  css = css.replace(/(\*|\.backdrop|\.overlay|::before|::after)\s*\{([^}]*?position\s*:\s*(?:fixed|absolute)[^}]*?)\}/gi, (match, selector, body) => {
    if (!/pointer-events/i.test(body)) {
      return `${selector} {${body} pointer-events: none !important; }`;
    }
    return match;
  });

  return css;
}

/**
 * Validates and sanitizes custom SVG code to ensure it is well-formed, safe,
 * and cannot cause XML parsing failures or infinite redraw loops.
 */
export function sanitizeSvgCode(rawSvg: string): { valid: boolean; sanitized: string; error?: string } {
  if (!rawSvg || typeof rawSvg !== 'string') {
    return { valid: true, sanitized: '' };
  }

  let cleaned = rawSvg.trim();

  // Strip script tags, event handlers, and data URLs with executable code
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, '');
  cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  cleaned = cleaned.replace(/href\s*=\s*["']?javascript:[^"'>]+/gi, '');

  // Ensure SVG root tag has namespace
  if (!cleaned.includes('xmlns=')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Validate XML well-formedness if browser DOMParser is available
  if (typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleaned, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return {
          valid: false,
          sanitized: '',
          error: `SVG syntax error: ${parserError.textContent?.slice(0, 100) || 'Malformed XML'}`,
        };
      }
    } catch (e: any) {
      return {
        valid: false,
        sanitized: '',
        error: `Could not parse SVG: ${e.message}`,
      };
    }
  }

  return { valid: true, sanitized: cleaned };
}

/**
 * Validates the complete ThemeConfig object, repairing and sanitizing any unsafe values.
 */
export function validateAndSanitizeTheme(theme: ThemeConfig): ValidationReport {
  const warnings: string[] = [];
  const sanitized: ThemeConfig = JSON.parse(JSON.stringify(theme));

  // 1. Sanitize custom CSS
  if (sanitized.customCss) {
    const safeCss = sanitizeThemeCss(sanitized.customCss);
    if (safeCss !== sanitized.customCss) {
      warnings.push('Custom CSS contained potentially unsafe or click-intercepting properties and was auto-sanitized.');
      sanitized.customCss = safeCss;
    }
  }

  // 2. Sanitize custom SVG Overlay
  if (sanitized.customSvgOverlay) {
    const { valid, sanitized: safeSvg, error } = sanitizeSvgCode(sanitized.customSvgOverlay);
    if (!valid) {
      warnings.push(`Custom SVG Overlay was invalid (${error}) and was removed.`);
      sanitized.customSvgOverlay = undefined;
    } else {
      sanitized.customSvgOverlay = safeSvg;
    }
  }

  // 3. Ensure engine values are bounded to safe ranges
  if (sanitized.engine) {
    sanitized.engine.cardRadius = Math.max(0, Math.min(64, sanitized.engine.cardRadius || 24));
    sanitized.engine.blurAmount = Math.max(0, Math.min(48, sanitized.engine.blurAmount || 16));
    sanitized.engine.borderWidth = Math.max(0, Math.min(10, sanitized.engine.borderWidth || 0));
    sanitized.engine.sheenOpacity = Math.max(0, Math.min(1, sanitized.engine.sheenOpacity || 0.2));
    sanitized.engine.sidebarOpacity = Math.max(0.05, Math.min(1.0, sanitized.engine.sidebarOpacity ?? 0.45));
    sanitized.engine.sidebarBlur = Math.max(0, Math.min(32, sanitized.engine.sidebarBlur ?? 20));
    if (!sanitized.engine.sidebarStyle) {
      sanitized.engine.sidebarStyle = 'translucent';
    }
  }

  return {
    safe: warnings.length === 0,
    warnings,
    sanitizedTheme: sanitized,
  };
}
