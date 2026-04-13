import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { FieldEditor } from "@/components/form-builder/FieldEditor";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Save, Trash2, Eye, CheckCircle2 } from "lucide-react";
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
    <div className="space-y-6">
      <PageHeader
        title="Dynamic Form Builder"
        description="Define your form structure by adding fields and configuring their types"
        actions={
          savedForm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/form-preview")}
              className="gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview Saved
            </Button>
          ) : undefined
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Form Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="form-name">Form Name</Label>
            <Input
              id="form-name"
              placeholder="e.g., Registration Form"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
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
        className="w-full border-dashed py-6 text-muted-foreground hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Field
      </Button>

      <Card className="bg-muted/30">
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} className="gap-1.5">
              <Save className="h-4 w-4" />
              Save Form
            </Button>
            <Button
              onClick={handleSaveAndPreview}
              variant="secondary"
              className="gap-1.5"
            >
              <Eye className="h-4 w-4" />
              Save & Preview
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={clearForm}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear All
          </Button>
        </CardContent>
      </Card>

      {savedForm && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Form saved successfully with {savedForm.fields.length} field
            {savedForm.fields.length !== 1 ? "s" : ""}.{" "}
            <button
              className="font-medium underline underline-offset-2 hover:no-underline"
              onClick={() => navigate("/form-preview")}
            >
              Go to Preview
            </button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
