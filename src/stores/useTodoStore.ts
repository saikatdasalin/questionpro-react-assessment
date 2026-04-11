import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, User } from "@/types";

interface TodoFilters {
  userId: number | null;
  status: "all" | "completed" | "pending";
  search: string;
}

interface TodoState {
  todos: Todo[];
  users: User[];
  filters: TodoFilters;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;

  setTodos: (todos: Todo[]) => void;
  setUsers: (users: User[]) => void;
  setFilter: <K extends keyof TodoFilters>(key: K, value: TodoFilters[K]) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFilteredTodos: () => Todo[];
  getPaginatedTodos: () => Todo[];
  getTotalPages: () => number;
  getUserName: (userId: number) => string;
}

const DEFAULT_FILTERS: TodoFilters = {
  userId: null,
  status: "all",
  search: "",
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      users: [],
      filters: { ...DEFAULT_FILTERS },
      currentPage: 1,
      pageSize: 10,
      isLoading: false,
      error: null,

      setTodos: (todos) => set({ todos }),
      setUsers: (users) => set({ users }),
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
          currentPage: 1,
        })),
      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS }, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      getFilteredTodos: () => {
        const { todos, filters } = get();
        return todos.filter((todo) => {
          if (filters.userId !== null && todo.userId !== filters.userId) return false;
          if (filters.status === "completed" && !todo.completed) return false;
          if (filters.status === "pending" && todo.completed) return false;
          if (
            filters.search &&
            !todo.title.toLowerCase().includes(filters.search.toLowerCase())
          )
            return false;
          return true;
        });
      },

      getPaginatedTodos: () => {
        const { currentPage, pageSize } = get();
        const filtered = get().getFilteredTodos();
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
      },

      getTotalPages: () => {
        const { pageSize } = get();
        const filtered = get().getFilteredTodos();
        return Math.ceil(filtered.length / pageSize);
      },

      getUserName: (userId: number) => {
        const { users } = get();
        const user = users.find((u) => u.id === userId);
        return user?.name ?? `User ${userId}`;
      },
    }),
    {
      name: "todo-store",
      partialize: (state) => ({
        filters: state.filters,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
      }),
    }
  )
);
