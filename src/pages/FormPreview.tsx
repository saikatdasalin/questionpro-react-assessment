import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { DynamicField } from "@/components/form-preview/DynamicField";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileEdit, Send, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import type { FormField } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: FormField, rawValue: string): string | null {
  const value = (rawValue ?? "").trim();

  if (field.required) {
    if (field.type === "checkbox") {
      if (rawValue !== "true") return "This field is required";
    } else if (value === "") {
      return "This field is required";
    }
  }

  if (field.type === "email" && value !== "" && !EMAIL_REGEX.test(value)) {
    return "Please enter a valid email address";
  }

  return null;
}

export function FormPreviewPage() {
  const { savedForm, loadForm } = useFormBuilderStore();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  useEffect(() => {
    if (savedForm) {
      const defaults: Record<string, string> = {};
      savedForm.fields.forEach((field) => {
        defaults[field.id] = "";
      });
      setFormValues(defaults);
      setErrors({});
      setSubmitted(false);
    }
  }, [savedForm]);

  function handleFieldChange(fieldId: string, value: string) {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!savedForm) return;

    const nextErrors: Record<string, string> = {};
    savedForm.fields.forEach((field) => {
      const error = validateField(field, formValues[field.id] ?? "");
      if (error) nextErrors[field.id] = error;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    const readableData: Record<string, string> = {};
    savedForm.fields.forEach((field) => {
      readableData[field.label] = formValues[field.id] ?? "";
    });

    console.log("=== Form Submitted ===");
    console.log("Form Name:", savedForm.name);
    console.log("Submitted Data:", readableData);
    console.log("======================");

    setSubmitted(true);
  }

  function handleReset() {
    if (savedForm) {
      const defaults: Record<string, string> = {};
      savedForm.fields.forEach((field) => {
        defaults[field.id] = "";
      });
      setFormValues(defaults);
      setErrors({});
      setSubmitted(false);
    }
  }

  if (!savedForm) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Form Preview"
          description="Preview and submit your saved form"
        />
        <EmptyState
          icon={FileEdit}
          title="No form saved yet"
          description="Go to the Form Builder page to create and save a form first."
          action={
            <Button onClick={() => navigate("/form-builder")} className="gap-1.5">
              <FileEdit className="h-4 w-4" />
              Go to Form Builder
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Form Preview"
        description="Fill out and submit the form below"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/form-builder")}
            className="gap-1.5"
          >
            <FileEdit className="h-3.5 w-3.5" />
            Edit Form
          </Button>
        }
      />

      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>{savedForm.name}</CardTitle>
                <CardDescription>
                  Last updated: {new Date(savedForm.updatedAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge variant="secondary">
                {savedForm.fields.length} field
                {savedForm.fields.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardHeader>

          {submitted ? (
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-emerald-100 p-4 dark:bg-emerald-950">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">
                Form Submitted!
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Check the browser console to view the submitted data.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleReset} className="gap-1.5">
                  <RotateCcw className="h-4 w-4" />
                  Fill Again
                </Button>
                <Button onClick={() => navigate("/form-builder")} className="gap-1.5">
                  <FileEdit className="h-4 w-4" />
                  Edit Form
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className="pt-6">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {Object.keys(errors).length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please fix the {Object.keys(errors).length} highlighted
                      field{Object.keys(errors).length !== 1 ? "s" : ""} below.
                    </AlertDescription>
                  </Alert>
                )}

                {savedForm.fields.map((field) => (
                  <DynamicField
                    key={field.id}
                    field={field}
                    value={formValues[field.id] ?? ""}
                    onChange={(val) => handleFieldChange(field.id, val)}
                    error={errors[field.id]}
                  />
                ))}

                <Separator />

                <div className="flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button type="submit" className="gap-1.5">
                    <Send className="h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
