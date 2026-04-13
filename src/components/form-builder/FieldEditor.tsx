import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, ChevronUp, ChevronDown, Plus, X, GripVertical } from "lucide-react";
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
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={() => { if (index > 0) moveField(index, index - 1); }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move up</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={() => { if (index < totalFields - 1) moveField(index, index + 1); }}
                    disabled={index >= totalFields - 1}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move down</TooltipContent>
              </Tooltip>
            </div>
            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
            <Badge index={index} />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeField(field.id)}
                disabled={totalFields <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove field</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Field Label / Name</Label>
            <Input
              placeholder="e.g., User Name"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Input Type</Label>
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

          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              placeholder="e.g., Enter your name"
              value={field.placeholder ?? ""}
              onChange={(e) =>
                updateField(field.id, { placeholder: e.target.value })
              }
            />
          </div>

          <div className="flex items-end">
            <div className="flex items-center gap-3 rounded-lg border px-4 py-2.5">
              <Switch
                id={`required-${field.id}`}
                checked={field.required}
                onCheckedChange={(checked) =>
                  updateField(field.id, { required: checked as boolean })
                }
              />
              <Label htmlFor={`required-${field.id}`} className="cursor-pointer text-sm">
                Required field
              </Label>
            </div>
          </div>
        </div>

        {showOptions && (
          <div className="rounded-lg border border-dashed bg-muted/30 p-4">
            <div className="mb-3 flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Options</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-xs"
                onClick={handleAddOption}
              >
                <Plus className="h-3 w-3" />
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {(field.options ?? []).map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {optIdx + 1}
                  </span>
                  <Input
                    value={opt}
                    onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                    className="h-8 text-sm"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveOption(optIdx)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove option</TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Badge({ index }: { index: number }) {
  return (
    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
      Field {index + 1}
    </span>
  );
}
