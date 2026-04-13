import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  const labelElement = (
    <Label
      htmlFor={field.id}
      className="text-sm font-medium"
    >
      {field.label}
      {field.required && <span className="ml-0.5 text-destructive">*</span>}
    </Label>
  );

  const errorMessage = hasError ? (
    <p id={errorId} className="mt-1.5 text-xs font-medium text-destructive">
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
        <div className="space-y-2">
          {labelElement}
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(hasError && "border-destructive focus-visible:ring-destructive")}
          />
          {errorMessage}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          {labelElement}
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn("min-h-24", hasError && "border-destructive focus-visible:ring-destructive")}
          />
          {errorMessage}
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          {labelElement}
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              id={field.id}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={cn(hasError && "border-destructive focus:ring-destructive")}
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
        <div className="space-y-2">
          {labelElement}
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
              hasError && "border-destructive"
            )}
          >
            <Checkbox
              id={`${field.id}-check`}
              checked={value === "true"}
              onCheckedChange={(checked) => onChange(String(checked))}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            />
            <Label htmlFor={`${field.id}-check`} className="cursor-pointer text-sm font-normal">
              {field.placeholder || field.label}
            </Label>
          </div>
          {errorMessage}
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {labelElement}
          <RadioGroup
            value={value}
            onValueChange={onChange}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
          >
            {(field.options ?? []).map((opt, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
                  hasError && "border-destructive",
                  value === opt && "border-primary bg-primary/5"
                )}
              >
                <RadioGroupItem value={opt} id={`${field.id}-${i}`} />
                <Label htmlFor={`${field.id}-${i}`} className="cursor-pointer text-sm font-normal">
                  {opt || `Option ${i + 1}`}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errorMessage}
        </div>
      );

    default:
      return null;
  }
}
