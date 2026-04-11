import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-zinc-100 p-3">
        <Icon className="h-6 w-6 text-zinc-400" />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-zinc-500">{description}</p>
      {action}
    </div>
  );
}
