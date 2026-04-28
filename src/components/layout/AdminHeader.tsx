import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useThemeStore } from "@/stores/useThemeStore";

const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
  "/todos": { title: "Todo List", breadcrumb: "Todos" },
  "/form-builder": { title: "Form Builder", breadcrumb: "Form Builder" },
  "/form-preview": { title: "Form Preview", breadcrumb: "Form Preview" },
};

interface AdminHeaderProps {
  onMobileMenuOpen: () => void;
}

export function AdminHeader({ onMobileMenuOpen }: AdminHeaderProps) {
  const location = useLocation();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const pageInfo = pageTitles[location.pathname] ?? {
    title: "Dashboard",
    breadcrumb: "Home",
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 bg-zinc-50 px-4 dark:bg-black sm:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden"
        onClick={onMobileMenuOpen}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Admin</span>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{pageInfo.breadcrumb}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden items-center sm:flex">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-8 w-[200px] pl-8 lg:w-[260px]"
          />
        </div>
      </div>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        <span className="sr-only">Notifications</span>
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* User avatar */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          A
        </div>
        <span className="hidden text-sm font-medium sm:inline-block">
          Admin
        </span>
      </div>
    </header>
  );
}
