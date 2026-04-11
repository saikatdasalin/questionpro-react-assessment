import { NavLink } from "react-router-dom";
import { CheckSquare, FileEdit, Layout } from "lucide-react";
import questionProLogo from "@/assets/questionpro-logo.svg";

const navItems = [
  { to: "/todos", label: "Todo List", icon: CheckSquare },
  { to: "/form-builder", label: "Form Builder", icon: FileEdit },
  { to: "/form-preview", label: "Form Preview", icon: Layout },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center" aria-label="QuestionPro">
          <img
            src={questionProLogo}
            alt="QuestionPro logo"
            className="h-8 w-auto"
          />
        </NavLink>

        <ul className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
