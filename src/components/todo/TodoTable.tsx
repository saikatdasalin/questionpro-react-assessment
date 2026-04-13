import { useTodoStore } from "@/stores/useTodoStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export function TodoTable() {
  const { getPaginatedTodos, getUserName } = useTodoStore();
  const todos = getPaginatedTodos();

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-16 text-center font-semibold">#</TableHead>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="w-48 font-semibold">User</TableHead>
            <TableHead className="w-36 text-center font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="text-center font-mono text-xs text-muted-foreground">
                {todo.id}
              </TableCell>
              <TableCell className="font-medium">
                {todo.title}
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {getUserName(todo.userId)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {todo.completed ? (
                  <Badge variant="secondary" className="gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
                    <Clock className="h-3 w-3" />
                    Pending
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
