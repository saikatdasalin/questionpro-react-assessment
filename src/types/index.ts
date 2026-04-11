export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type FieldType = "text" | "number" | "email" | "password" | "textarea" | "select" | "checkbox" | "radio" | "date";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  required: boolean;
  placeholder?: string;
}

export interface FormConfig {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: number;
  updatedAt: number;
}
