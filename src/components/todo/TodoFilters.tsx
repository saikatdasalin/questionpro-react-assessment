import { useTodoStore } from "@/stores/useTodoStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

export function TodoFilters() {
  const { filters, users, setFilter, resetFilters } = useTodoStore();

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-medium text-zinc-500">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search todos..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="w-full sm:w-48">
        <label className="mb-1.5 block text-xs font-medium text-zinc-500">
          User
        </label>
        <Select
          value={filters.userId === null ? "all" : String(filters.userId)}
          onValueChange={(value) =>
            setFilter("userId", value === "all" ? null : Number(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-40">
        <label className="mb-1.5 block text-xs font-medium text-zinc-500">
          Status
        </label>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilter("status", value as "all" | "completed" | "pending")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={resetFilters}
        className="flex items-center gap-1.5"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
