import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "./design-system/styles.js";
import type { HomeAssistant } from "./types/home-assistant.js";
import { globalMockHass } from "./controllers/mock-hass-provider.js";

// Import all subcomponents and views
import "./components/app-header.js";
import "./components/bottom-dock.js";
import "./views/home-view.js";
import "./views/lights-sheet.js";
import "./views/energy-view.js";

@customElement("showroom-witmind-signature")
export class ShowroomWitmindSignature extends LitElement {
  @property({ type: String, reflect: true })
  theme: "dark" | "light" = "dark";

  @property({ type: Object })
  hass?: HomeAssistant;

  @state()
  private _page: number = 0; // 0: Home / Operation, 1: Analytics / Extended Control

  @state()
  private _lightsSheetOpen: boolean = false;

  private _unsubscribeHass?: () => void;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-height: 100dvh;
        background-color: var(--wit-canvas);
        color: var(--wit-text-primary);
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        overflow-x: hidden;
        position: relative;
        background:
          radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.14), transparent 65%),
          radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.06), transparent 70%),
          var(--wit-canvas);
      }

      :host([theme="light"]) {
        background:
          radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.10), transparent 65%),
          radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.04), transparent 70%),
          var(--wit-canvas);
      }

      .app-frame {
        position: relative;
        z-index: 1;
        max-width: 1480px;
        margin: 0 auto;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding:
          max(24px, env(safe-area-inset-top))
          max(32px, env(safe-area-inset-right))
          max(96px, env(safe-area-inset-bottom))
          max(32px, env(safe-area-inset-left));
        gap: 24px;
        box-sizing: border-box;
      }

      .main-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        animation: fade-in 200ms var(--wit-ease-default);
      }

      @keyframes fade-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();

    // Check theme from URL or attribute
    const urlTheme = new URLSearchParams(window.location.search).get("theme");
    if (urlTheme === "light" || urlTheme === "dark") {
      this.theme = urlTheme;
    }

    // Auto-subscribe to mock Hass if no external hass was provided
    if (!this.hass && globalMockHass) {
      this._unsubscribeHass = globalMockHass.subscribe((h) => {
        this.hass = h;
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribeHass) {
      this._unsubscribeHass();
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("theme")) {
      document.documentElement.setAttribute("theme", this.theme);
      if (this.theme === "light") {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      }
    }
  }

  private _handleThemeChange(e: CustomEvent) {
    this.theme = e.detail.theme;
  }

  private _handleViewChange(e: CustomEvent) {
    const view = e.detail.view;
    if (view === "home") {
      this._page = 0;
    } else if (view === "energy") {
      this._page = 1;
    }
  }

  private _handlePageChange(e: CustomEvent) {
    this._page = e.detail.page;
  }

  private _handleDockAction(e: CustomEvent) {
    const action = e.detail.action;
    if (action === "lights") {
      this._lightsSheetOpen = true;
    } else if (action === "energy") {
      this._page = 1;
    } else if (action === "media") {
      if (this.hass) {
        this.hass.callService("media_player", "media_play_pause", {
          entity_id: "media_player.showroom_1"
        });
      }
    }
  }

  private _handlePillAction(e: CustomEvent) {
    const action = e.detail.action;
    if (action === "lights") {
      this._lightsSheetOpen = true;
    } else if (action === "energy") {
      this._page = 1;
    }
  }

  render() {
    return html`
      <div class="app-frame">
        <wit-app-header
          .hass=${this.hass}
          .theme=${this.theme}
          @theme-change=${this._handleThemeChange}
          @pill-action=${this._handlePillAction}
        ></wit-app-header>

        <main class="main-content">
          ${this._page === 0
            ? html`
                <wit-home-view
                  .hass=${this.hass}
                  .theme=${this.theme}
                  @open-lights-sheet=${() => this._lightsSheetOpen = true}
                  @view-change=${this._handleViewChange}
                ></wit-home-view>
              `
            : html`
                <wit-energy-view
                  .hass=${this.hass}
                  .theme=${this.theme}
                  @open-lights-sheet=${() => this._lightsSheetOpen = true}
                  @view-change=${this._handleViewChange}
                ></wit-energy-view>
              `}
        </main>

        <!-- Lighting Sheet Modal -->
        <wit-lights-sheet
          ?open=${this._lightsSheetOpen}
          .hass=${this.hass}
          @close=${() => this._lightsSheetOpen = false}
        ></wit-lights-sheet>

        <!-- Bottom Floating Dock Navigation -->
        <wit-bottom-dock
          .hass=${this.hass}
          .activePage=${this._page}
          @dock-action=${this._handleDockAction}
          @page-change=${this._handlePageChange}
        ></wit-bottom-dock>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "showroom-witmind-signature": ShowroomWitmindSignature;
  }
}
