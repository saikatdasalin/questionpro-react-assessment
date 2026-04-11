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
import { CheckCircle2, Clock } from "lucide-react";

export function TodoTable() {
  const { getPaginatedTodos, getUserName } = useTodoStore();
  const todos = getPaginatedTodos();

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-50/80">
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-48">User</TableHead>
            <TableHead className="w-32 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow
              key={todo.id}
              className="transition-colors hover:bg-zinc-50/50"
            >
              <TableCell className="text-center text-xs text-zinc-400">
                {todo.id}
              </TableCell>
              <TableCell className="font-medium text-zinc-700">
                {todo.title}
              </TableCell>
              <TableCell>
                <span className="text-sm text-zinc-500">
                  {getUserName(todo.userId)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {todo.completed ? (
                  <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
