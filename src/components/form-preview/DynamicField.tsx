import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FormField } from "@/types";

interface DynamicFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DynamicField({ field, value, onChange, error }: DynamicFieldProps) {
  const hasError = Boolean(error);
  const errorId = `${field.id}-error`;
  const errorBorder = "border-red-500 focus-visible:ring-red-500";

  const labelElement = (
    <Label
      htmlFor={field.id}
      className="mb-1.5 block text-sm font-medium text-zinc-700"
    >
      {field.label}
      {field.required && <span className="ml-0.5 text-red-500">*</span>}
    </Label>
  );

  const errorMessage = hasError ? (
    <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
      {error}
    </p>
  ) : null;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "date":
      return (
        <div>
          {labelElement}
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(hasError && errorBorder)}
          />
          {errorMessage}
        </div>
      );

    case "textarea":
      return (
        <div>
          {labelElement}
          <textarea
            id={field.id}
            className={cn(
              "flex min-h-24 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              hasError && errorBorder
            )}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
          />
          {errorMessage}
        </div>
      );

    case "select":
      return (
        <div>
          {labelElement}
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              id={field.id}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={cn(hasError && errorBorder)}
            >
              <SelectValue placeholder={field.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((opt, i) => (
                <SelectItem key={i} value={opt || `option-${i}`}>
                  {opt || `Option ${i + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorMessage}
        </div>
      );

    case "checkbox":
      return (
        <div>
          {labelElement}
          <label
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-zinc-50",
              hasError && "border-red-500"
            )}
          >
            <input
              id={field.id}
              type="checkbox"
              checked={value === "true"}
              onChange={(e) => onChange(String(e.target.checked))}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className="rounded border-zinc-300"
            />
            <span className="text-zinc-600">
              {field.placeholder || field.label}
            </span>
          </label>
          {errorMessage}
        </div>
      );

    case "radio":
      return (
        <div>
          {labelElement}
          <div
            role="radiogroup"
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className="space-y-2"
          >
            {(field.options ?? []).map((opt, i) => (
              <label
                key={i}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-zinc-50",
                  hasError && "border-red-500"
                )}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(e.target.value)}
                  className="border-zinc-300"
                />
                <span className="text-zinc-600">{opt || `Option ${i + 1}`}</span>
              </label>
            ))}
          </div>
          {errorMessage}
        </div>
      );

    default:
      return null;
  }
}
