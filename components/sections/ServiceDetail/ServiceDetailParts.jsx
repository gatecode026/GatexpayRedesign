import Image from "next/image";
import {
  BarChart3,
  Clock,
  CodeXml,
  CreditCard,
  Droplets,
  FileText,
  HandCoins,
  Handshake,
  Headphones,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Lock,
  Mail,
  MousePointerClick,
  Receipt,
  RefreshCw,
  Rocket,
  ScanSearch,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingUp,
  Tv,
  Wifi,
  Workflow,
  Zap,
} from "lucide-react";
const LUCIDE = {
  zap: Zap,
  "shield-check": ShieldCheck,
  "hand-coins": HandCoins,
  "layout-dashboard": LayoutDashboard,
  "code-xml": CodeXml,
  "scan-search": ScanSearch,
  workflow: Workflow,
  rocket: Rocket,
  "credit-card": CreditCard,
  "file-text": FileText,
  clock: Clock,
  headphones: Headphones,
  "refresh-cw": RefreshCw,
  search: Search,
  "mouse-pointer-click": MousePointerClick,
  "trending-up": TrendingUp,
  target: Target,
  mail: Mail,
  "share-2": Share2,
  "bar-chart-3": BarChart3,
  smartphone: Smartphone,
  lightbulb: Lightbulb,
  tv: Tv,
  wifi: Wifi,
  droplets: Droplets,
  receipt: Receipt,
  lock: Lock,
  handshake: Handshake,
  layers: Layers,
};
/**
 * Figma uses Lucide icons throughout. lucide-react 0.469 has no
 * "monitor-cloud", so that one is the Figma export of the same icon
 * (35×32 artwork inside the 38px icon box).
 */
export function ServiceDetailIcon({ name, size, strokeWidth }) {
  if (name === "monitor-cloud") {
    return (
      <Image
        src="/assets/service_detail_payment_gateway/icons/icon_21_Vector.svg"
        alt=""
        aria-hidden="true"
        width={Math.round((size * 35) / 38)}
        height={Math.round((size * 32) / 38)}
        className="sd-icon"
      />
    );
  }
  const Icon = LUCIDE[name];
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className="sd-icon"
      aria-hidden="true"
    />
  );
}
/** Two-line serif heading; the last words carry the brand gradient. */
export function SectionTitle({ heading, id, className = "" }) {
  return (
    <h2 id={id} className={`sd-heading ${className}`.trim()}>
      {heading.line1}
      <br />
      {heading.line2Lead}
      <span className="sd-accent">{heading.accent}</span>
    </h2>
  );
}
/** Renders Figma's forced "\n" breaks; CSS drops them on narrow screens. */
export function BrokenLines({ text }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <br className="sd-desk-br" />}
          {i > 0 && " "}
          {part}
        </span>
      ))}
    </>
  );
}
