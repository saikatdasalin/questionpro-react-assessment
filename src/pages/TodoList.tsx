import { useFetchTodos } from "@/hooks/useFetchTodos";
import { useTodoStore } from "@/stores/useTodoStore";
import { TodoFilters } from "@/components/todo/TodoFilters";
import { TodoTable } from "@/components/todo/TodoTable";
import { TodoPagination } from "@/components/todo/TodoPagination";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, ListChecks } from "lucide-react";

export function TodoListPage() {
  useFetchTodos();

  const { isLoading, error, getFilteredTodos, setError } = useTodoStore();
  const filteredTodos = getFilteredTodos();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Todo List"
        description="Browse and filter todos from JSONPlaceholder API"
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setError(null);
                window.location.reload();
              }}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mt-3 text-sm text-muted-foreground">Loading todos...</span>
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
            <div className="space-y-4">
              <TodoTable />
              <TodoPagination />
            </div>
          )}
        </>
      )}
    </div>
  );
}
