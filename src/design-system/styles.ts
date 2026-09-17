import { css } from "lit";

export const sharedStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  :host {
    display: block;
    font-family: var(--wit-font-sans, "Manrope", system-ui, -apple-system, sans-serif);
    color: var(--wit-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Numeric Tabular Alignment Standard */
  .tnum,
  [data-tnum="true"] {
    font-feature-settings: "tnum" 1;
    font-variant-numeric: tabular-nums;
  }

  /* Standard Focus Ring */
  :focus-visible {
    outline: 2px solid var(--wit-accent);
    outline-offset: 2px;
  }

  /* Micro-interactions */
  .interactive {
    cursor: pointer;
    user-select: none;
    transition: transform var(--wit-duration-fast, 140ms) var(--wit-ease-default, cubic-bezier(0.2, 0.8, 0.2, 1)),
                background-color var(--wit-duration-fast, 140ms) var(--wit-ease-default, cubic-bezier(0.2, 0.8, 0.2, 1)),
                border-color var(--wit-duration-fast, 140ms) var(--wit-ease-default, cubic-bezier(0.2, 0.8, 0.2, 1)),
                box-shadow var(--wit-duration-fast, 140ms) var(--wit-ease-default, cubic-bezier(0.2, 0.8, 0.2, 1)),
                opacity var(--wit-duration-fast, 140ms) var(--wit-ease-default, cubic-bezier(0.2, 0.8, 0.2, 1));
  }

  .interactive:active:not([disabled]) {
    transform: scale(0.98);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
