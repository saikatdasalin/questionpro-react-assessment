import { useFetchTodos } from "@/hooks/useFetchTodos";
import { useTodoStore } from "@/stores/useTodoStore";
import { TodoFilters } from "@/components/todo/TodoFilters";
import { TodoTable } from "@/components/todo/TodoTable";
import { TodoPagination } from "@/components/todo/TodoPagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Loader2, AlertCircle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TodoListPage() {
  useFetchTodos();

  const { isLoading, error, getFilteredTodos, setError } = useTodoStore();
  const filteredTodos = getFilteredTodos();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Todo List"
        description="Browse and filter todos from JSONPlaceholder API"
      />

      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-3 text-sm text-zinc-500">Loading todos...</span>
        </div>
      ) : (
        <>
          <TodoFilters />

          {filteredTodos.length === 0 ? (
            <EmptyState
              icon={ListChecks}
              title="No todos found"
              description="Try adjusting your filters or search query to find what you're looking for."
            />
          ) : (
            <>
              <TodoTable />
              <TodoPagination />
            </>
          )}
        </>
      )}
    </div>
  );
}
