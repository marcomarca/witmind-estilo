import { html, type TemplateResult } from "lit";
import {
  Home,
  Lightbulb,
  Sun,
  Moon,
  Zap,
  Music,
  Sliders,
  Activity,
  Shield,
  Power,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  AlertTriangle,
  AlertCircle,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Tv,
  Cpu,
  RefreshCw,
  Eye,
  Settings,
  Flame,
  Radio,
  Wifi,
  WifiOff,
  Maximize2,
  Minimize2,
  Gauge,
  TrendingUp,
  Grid,
  Info,
  Pencil,
  Move,
  RotateCcw,
  Save,
  ZoomIn,
  ZoomOut,
  type IconNode
} from "lucide";

const iconMap: Record<string, IconNode> = {
  home: Home,
  lightbulb: Lightbulb,
  sun: Sun,
  moon: Moon,
  zap: Zap,
  music: Music,
  sliders: Sliders,
  activity: Activity,
  shield: Shield,
  power: Power,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  x: X,
  check: Check,
  "alert-triangle": AlertTriangle,
  "alert-circle": AlertCircle,
  clock: Clock,
  thermometer: Thermometer,
  droplets: Droplets,
  wind: Wind,
  sparkles: Sparkles,
  play: Play,
  pause: Pause,
  "skip-forward": SkipForward,
  "skip-back": SkipBack,
  "volume-2": Volume2,
  "volume-x": VolumeX,
  "arrow-up-right": ArrowUpRight,
  "arrow-down-right": ArrowDownRight,
  layers: Layers,
  tv: Tv,
  cpu: Cpu,
  "refresh-cw": RefreshCw,
  eye: Eye,
  settings: Settings,
  flame: Flame,
  radio: Radio,
  wifi: Wifi,
  "wifi-off": WifiOff,
  maximize: Maximize2,
  minimize: Minimize2,
  gauge: Gauge,
  "trending-up": TrendingUp,
  grid: Grid,
  info: Info,
  pencil: Pencil,
  edit: Pencil,
  move: Move,
  "rotate-ccw": RotateCcw,
  save: Save,
  "zoom-in": ZoomIn,
  "zoom-out": ZoomOut
};

export interface IconOptions {
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

/**
 * Renders a Lucide icon as a clean SVG Lit Template
 */
export function renderIcon(name: string, options: IconOptions = {}): TemplateResult {
  const size = options.size || 22;
  const strokeWidth = options.strokeWidth || 1.8;
  const color = options.color || "currentColor";
  const className = options.className || "";

  const iconDef = iconMap[name.toLowerCase()];
  if (!iconDef) {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${color}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="wit-icon ${className}"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `;
  }

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${color}"
      stroke-width="${strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="wit-icon ${className}"
    >
      ${iconDef.map(([tag, attrs]) => {
        if (tag === "path") {
          return html`<path d="${attrs.d}"></path>`;
        }
        if (tag === "circle") {
          return html`<circle cx="${attrs.cx}" cy="${attrs.cy}" r="${attrs.r}"></circle>`;
        }
        if (tag === "line") {
          return html`<line x1="${attrs.x1}" y1="${attrs.y1}" x2="${attrs.x2}" y2="${attrs.y2}"></line>`;
        }
        if (tag === "rect") {
          return html`<rect width="${attrs.width}" height="${attrs.height}" x="${attrs.x}" y="${attrs.y}" rx="${attrs.rx || 0}"></rect>`;
        }
        if (tag === "polygon") {
          return html`<polygon points="${attrs.points}"></polygon>`;
        }
        if (tag === "polyline") {
          return html`<polyline points="${attrs.points}"></polyline>`;
        }
        return null;
      })}
    </svg>
  `;
}
