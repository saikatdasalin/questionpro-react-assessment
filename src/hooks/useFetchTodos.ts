import { useEffect } from "react";
import { useTodoStore } from "@/stores/useTodoStore";
import type { Todo, User } from "@/types";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export function useFetchTodos() {
  const { todos, users, setTodos, setUsers, setIsLoading, setError } =
    useTodoStore();

  useEffect(() => {
    if (todos.length > 0 && users.length > 0) return;

    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const [todosRes, usersRes] = await Promise.all([
          fetch(TODOS_URL),
          fetch(USERS_URL),
        ]);

        if (!todosRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const [todosData, usersData] = (await Promise.all([
          todosRes.json(),
          usersRes.json(),
        ])) as [Todo[], User[]];

        if (!cancelled) {
          setTodos(todosData);
          setUsers(usersData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [todos.length, users.length, setTodos, setUsers, setIsLoading, setError]);
}
