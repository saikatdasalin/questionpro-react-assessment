import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { FieldEditor } from "@/components/form-builder/FieldEditor";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function FormBuilderPage() {
  const {
    fields,
    formName,
    setFormName,
    addField,
    saveForm,
    clearForm,
    savedForm,
  } = useFormBuilderStore();
  const navigate = useNavigate();

  const handleSave = useCallback(() => {
    const validFields = fields.filter((f) => f.label.trim() !== "");
    if (validFields.length === 0) {
      alert("Please add at least one field with a label before saving.");
      return;
    }
    saveForm();
  }, [fields, saveForm]);

  const handleSaveAndPreview = useCallback(() => {
    const validFields = fields.filter((f) => f.label.trim() !== "");
    if (validFields.length === 0) {
      alert("Please add at least one field with a label before previewing.");
      return;
    }
    saveForm();
    navigate("/form-preview");
  }, [fields, saveForm, navigate]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dynamic Form Builder"
        description="Define your form structure by adding fields and configuring their types"
        actions={
          <div className="flex items-center gap-2">
            {savedForm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/form-preview")}
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Preview Saved
              </Button>
            )}
          </div>
        }
      />

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <Label className="mb-1.5 text-xs text-zinc-500">Form Name</Label>
        <Input
          placeholder="e.g., Registration Form"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <FieldEditor
            key={field.id}
            field={field}
            index={index}
            totalFields={fields.length}
          />
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addField}
        className="w-full border-dashed"
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Add New Field
      </Button>

      <div className="flex flex-col gap-2 rounded-lg border bg-zinc-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
            <Save className="mr-1.5 h-4 w-4" />
            Save Form
          </Button>
          <Button
            onClick={handleSaveAndPreview}
            variant="outline"
          >
            <Eye className="mr-1.5 h-4 w-4" />
            Save & Preview
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={clearForm}
        >
          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
          Clear All
        </Button>
      </div>

      {savedForm && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Form saved successfully with {savedForm.fields.length} field
          {savedForm.fields.length !== 1 ? "s" : ""}.{" "}
          <button
            className="font-medium underline underline-offset-2"
            onClick={() => navigate("/form-preview")}
          >
            Go to Preview
          </button>
        </div>
      )}
    </div>
  );
}
