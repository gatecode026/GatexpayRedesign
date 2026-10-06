import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Boxes,
  Briefcase,
  Building2,
  Bus,
  Car,
  CheckCircle2,
  Clock,
  Cloud,
  CodeXml,
  Coins,
  Cpu,
  CreditCard,
  Database,
  Download,
  Droplets,
  FileText,
  Fingerprint,
  Globe,
  HandCoins,
  Handshake,
  Headphones,
  Hotel,
  Landmark,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Lock,
  Luggage,
  Mail,
  MapPin,
  MousePointerClick,
  Network,
  Package,
  PieChart,
  Plane,
  Receipt,
  RefreshCw,
  Rocket,
  ScanSearch,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Target,
  Ticket,
  Train,
  TrendingUp,
  Truck,
  Tv,
  UserCheck,
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
  cloud: Cloud,
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
  "user-check": UserCheck,
  "map-pin": MapPin,
  globe: Globe,
  landmark: Landmark,
  briefcase: Briefcase,
  "building-2": Building2,
  coins: Coins,
  "pie-chart": PieChart,
  settings: Settings,
  plane: Plane,
  bus: Bus,
  car: Car,
  hotel: Hotel,
  truck: Truck,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  server: Server,
  database: Database,
  cpu: Cpu,
  network: Network,
  boxes: Boxes,
  activity: Activity,
  "check-circle": CheckCircle2,
  fingerprint: Fingerprint,
  download: Download,
  shield: Shield,
  train: Train,
  ticket: Ticket,
  luggage: Luggage,
  store: Store,
  package: Package,
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
  const Icon = LUCIDE[name] || Zap;
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
  if (!text) return null;
  const parts = text.split(/\\n|\r?\n/);
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

/** Parses markdown links `[anchor](href)` into accessible Next.js Links */
export function FormattedText({ text }) {
  if (!text || typeof text !== "string") return text;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, anchor, href] = match;
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    parts.push(
      <Link
        key={match.index}
        href={href}
        className="sd-inline-link"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {anchor}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
