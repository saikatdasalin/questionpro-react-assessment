import { NavLink } from "react-router-dom";
import { CheckSquare, FileEdit, Layout } from "lucide-react";
import questionProLogo from "@/assets/questionpro-logo.svg";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/todos", label: "Todo List", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: FileEdit },
  { to: "/form-preview", label: "Form Preview", icon: Layout },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2" aria-label="QuestionPro">
          <img
            src={questionProLogo}
            alt="QuestionPro logo"
            className="h-7 w-auto"
          />
        </NavLink>

        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
