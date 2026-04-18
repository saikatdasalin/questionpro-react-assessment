import { NavLink, useLocation } from "react-router-dom";
import {
  CheckSquare,
  FileEdit,
  Layout,
  PanelLeftClose,
  PanelLeft,
  LayoutDashboard,
} from "lucide-react";
import questionProLogo from "@/assets/questionpro-logo.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { to: "/todos", label: "Todo List", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: FileEdit },
  { to: "/form-preview", label: "Form Preview", icon: Layout },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-background transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center px-4">
        <NavLink to="/" className="flex items-center gap-2 overflow-hidden">
          {collapsed ? (
            <LayoutDashboard className="h-6 w-6 shrink-0 text-primary" />
          ) : (
            <img
              src={questionProLogo}
              alt="QuestionPro logo"
              className="h-7 w-auto"
            />
          )}
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-3">
        <p
          className={cn(
            "mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-opacity",
            collapsed ? "opacity-0" : "opacity-100"
          )}
        >
          Navigation
        </p>
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;

          const link = (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );

          if (collapsed) {
            return (
              <Tooltip key={to} delayDuration={0}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return link;
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "sm"}
          onClick={onToggle}
          className={cn("w-full", !collapsed && "justify-start gap-2")}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

/** Simplified sidebar content for mobile sheet */
export function MobileSidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center px-4">
        <NavLink to="/" className="flex items-center gap-2" onClick={onNavigate}>
          <img
            src={questionProLogo}
            alt="QuestionPro logo"
            className="h-7 w-auto"
          />
        </NavLink>
      </div>

      <nav className="flex-1 space-y-2 p-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
