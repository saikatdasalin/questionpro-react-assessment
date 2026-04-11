import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormBuilderStore } from "@/stores/useFormBuilderStore";
import { DynamicField } from "@/components/form-preview/DynamicField";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      <div className="space-y-4">
        <PageHeader
          title="Form Preview"
          description="Preview and submit your saved form"
        />
        <EmptyState
          icon={FileEdit}
          title="No form saved yet"
          description="Go to the Form Builder page to create and save a form first."
          action={
            <Button onClick={() => navigate("/form-builder")}>
              <FileEdit className="mr-1.5 h-4 w-4" />
              Go to Form Builder
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Form Preview"
        description="Fill out and submit the form below"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/form-builder")}
          >
            <FileEdit className="mr-1.5 h-3.5 w-3.5" />
            Edit Form
          </Button>
        }
      />

      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b bg-zinc-50/80 px-6 py-4">
            <h2 className="text-lg font-semibold text-zinc-900">
              {savedForm.name}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
              <Badge variant="outline" className="text-xs">
                {savedForm.fields.length} field
                {savedForm.fields.length !== 1 ? "s" : ""}
              </Badge>
              <span>
                Last updated:{" "}
                {new Date(savedForm.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-emerald-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-zinc-900">
                Form Submitted!
              </h3>
              <p className="mb-4 text-sm text-zinc-500">
                Check the browser console to view the submitted data.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Fill Again
                </Button>
                <Button onClick={() => navigate("/form-builder")}>
                  <FileEdit className="mr-1.5 h-4 w-4" />
                  Edit Form
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 px-6 py-5"
            >
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Please fix the {Object.keys(errors).length} highlighted
                    field{Object.keys(errors).length !== 1 ? "s" : ""} below.
                  </span>
                </div>
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

              <div className="flex items-center justify-end gap-2 pb-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Send className="mr-1.5 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
