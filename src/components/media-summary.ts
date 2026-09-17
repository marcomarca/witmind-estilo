import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/surface.js";
import "../design-system/primitives/icon-button.js";
import "../design-system/primitives/status-pill.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderIcon } from "../utilities/icon.js";

@customElement("wit-media-summary")
export class WitMediaSummary extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .card-inner {
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .icon-box {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: var(--wit-surface-interactive);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-interactive);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-title {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 700;
        color: var(--wit-text-primary);
        letter-spacing: -0.01em;
      }

      .card-subtitle {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        margin-top: 1px;
      }

      .track-box {
        display: flex;
        align-items: center;
        gap: 14px;
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 12px 16px;
      }

      .album-cover {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        background: linear-gradient(135deg, #1b282e, #071118);
        border: 1px solid var(--wit-border-medium);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--wit-accent);
        flex-shrink: 0;
        position: relative;
        overflow: hidden;
      }

      .album-cover::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 50%, rgba(242, 101, 34, 0.2) 0%, transparent 70%);
      }

      .track-info {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .track-title {
        font-size: 13px;
        font-weight: 700;
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .track-artist {
        font-size: 11px;
        color: var(--wit-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .track-album {
        font-size: 10px;
        color: var(--wit-text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .controls-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      .vol-slider {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        max-width: 140px;
      }

      .vol-slider input[type="range"] {
        accent-color: var(--wit-accent);
        width: 100%;
      }

      .buttons-group {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    `
  ];

  private _togglePlayback() {
    if (!this.hass) return;
    this.hass.callService("media_player", "media_play_pause", {
      entity_id: "media_player.sonos_salon"
    });
  }

  private _setVolume(e: any) {
    if (!this.hass) return;
    const vol = Number(e.target.value) / 100;
    this.hass.callService("media_player", "volume_set", {
      entity_id: "media_player.sonos_salon",
      volume_level: vol
    });
  }

  render() {
    const states = this.hass?.states || {};
    const media = states["media_player.sonos_salon"];
    const isPlaying = media?.state === "playing";
    const title = media?.attributes.media_title || "Sin reproducción";
    const artist = media?.attributes.media_artist || "Sonos Architectural";
    const album = media?.attributes.media_album_name || "Awase (ECM Records)";
    const volumePercent = Math.round((media?.attributes.volume_level ?? 0.42) * 100);

    return html`
      <wit-surface level="1" style="height: 100%;">
        <div class="card-inner">
          <div class="card-header">
            <div class="title-group">
              <div class="icon-box">
                ${renderIcon("music", { size: 20 })}
              </div>
              <div>
                <div class="card-title">Audio Multiroom</div>
                <div class="card-subtitle">Sonos Architectural DALI • Salón</div>
              </div>
            </div>
            <wit-status-pill
              status=${isPlaying ? "accent" : "idle"}
              label=${isPlaying ? "Tidal HiFi" : "Pausado"}
            ></wit-status-pill>
          </div>

          <div class="track-box">
            <div class="album-cover">
              ${renderIcon("music", { size: 24 })}
            </div>
            <div class="track-info">
              <div class="track-title">${title}</div>
              <div class="track-artist">${artist}</div>
              <div class="track-album">${album}</div>
            </div>
          </div>

          <div class="controls-bar">
            <div class="vol-slider">
              ${renderIcon("volume-2", { size: 15, color: "var(--wit-text-secondary)" })}
              <input
                type="range"
                min="0"
                max="100"
                .value=${volumePercent}
                @input=${this._setVolume}
              />
              <span style="font-size: 11px; color: var(--wit-text-secondary); width: 28px;" class="tnum">
                ${volumePercent}%
              </span>
            </div>

            <div class="buttons-group">
              <wit-icon-button
                icon="skip-back"
                size="sm"
                variant="ghost"
                label="Anterior"
              ></wit-icon-button>
              <wit-icon-button
                icon=${isPlaying ? "pause" : "play"}
                size="md"
                variant="primary"
                label="Play/Pausa"
                @click=${this._togglePlayback}
              ></wit-icon-button>
              <wit-icon-button
                icon="skip-forward"
                size="sm"
                variant="ghost"
                label="Siguiente"
              ></wit-icon-button>
            </div>
          </div>
        </div>
      </wit-surface>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-media-summary": WitMediaSummary;
  }
}
