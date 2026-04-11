import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, GripVertical, Plus, X } from "lucide-react";
import type { FormField, FieldType } from "@/types";

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number Input" },
  { value: "email", label: "Email Input" },
  { value: "password", label: "Password Input" },
  { value: "textarea", label: "Text Area" },
  { value: "select", label: "Dropdown / Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Buttons" },
  { value: "date", label: "Date Picker" },
];

const NEEDS_OPTIONS: FieldType[] = ["select", "radio"];

interface FieldEditorProps {
  field: FormField;
  index: number;
  totalFields: number;
}

export function FieldEditor({ field, index, totalFields }: FieldEditorProps) {
  const { updateField, removeField, moveField } = useFormBuilderStore();
  const showOptions = NEEDS_OPTIONS.includes(field.type);

  function handleAddOption() {
    const current = field.options ?? [];
    updateField(field.id, { options: [...current, ""] });
  }

  function handleUpdateOption(optIndex: number, value: string) {
    const current = [...(field.options ?? [])];
    current[optIndex] = value;
    updateField(field.id, { options: current });
  }

  function handleRemoveOption(optIndex: number) {
    const current = [...(field.options ?? [])];
    current.splice(optIndex, 1);
    updateField(field.id, { options: current });
  }

  return (
    <div className="group relative rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5 cursor-grab text-zinc-300 hover:text-zinc-500"
              onClick={() => {
                if (index > 0) moveField(index, index - 1);
              }}
              disabled={index === 0}
            >
              <GripVertical className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5 cursor-grab text-zinc-300 hover:text-zinc-500"
              onClick={() => {
                if (index < totalFields - 1) moveField(index, index + 1);
              }}
              disabled={index >= totalFields - 1}
            >
              <GripVertical className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
            Field {index + 1}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-red-500"
          onClick={() => removeField(field.id)}
          disabled={totalFields <= 1}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 text-xs text-zinc-500">Field Label / Name</Label>
          <Input
            placeholder="e.g., User Name"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
          />
        </div>

        <div>
          <Label className="mb-1.5 text-xs text-zinc-500">Input Type</Label>
          <Select
            value={field.type}
            onValueChange={(value) => {
              const newType = value as FieldType;
              const updates: Partial<FormField> = { type: newType };
              if (NEEDS_OPTIONS.includes(newType) && (!field.options || field.options.length === 0)) {
                updates.options = ["Option 1", "Option 2"];
              }
              updateField(field.id, updates);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map((ft) => (
                <SelectItem key={ft.value} value={ft.value}>
                  {ft.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 text-xs text-zinc-500">Placeholder</Label>
          <Input
            placeholder="e.g., Enter your name"
            value={field.placeholder ?? ""}
            onChange={(e) =>
              updateField(field.id, { placeholder: e.target.value })
            }
          />
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-zinc-50">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
              className="rounded border-zinc-300"
            />
            <span className="text-zinc-600">Required field</span>
          </label>
        </div>
      </div>

      {showOptions && (
        <div className="mt-3 rounded-md border border-dashed border-zinc-200 bg-zinc-50/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <Label className="text-xs text-zinc-500">Options</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={handleAddOption}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add Option
            </Button>
          </div>
          <div className="space-y-2">
            {(field.options ?? []).map((opt, optIdx) => (
              <div key={optIdx} className="flex items-center gap-2">
                <Input
                  value={opt}
                  onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                  placeholder={`Option ${optIdx + 1}`}
                  className="h-8 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-zinc-400 hover:text-red-500"
                  onClick={() => handleRemoveOption(optIdx)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
