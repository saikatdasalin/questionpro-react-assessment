import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormField, FormConfig, FieldType } from "@/types";

interface FormBuilderState {
  fields: FormField[];
  formName: string;
  savedForm: FormConfig | null;

  setFormName: (name: string) => void;
  addField: () => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  saveForm: () => void;
  loadForm: () => void;
  clearForm: () => void;
}

function generateId(): string {
  return `field_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function createDefaultField(): FormField {
  return {
    id: generateId(),
    label: "",
    type: "text" as FieldType,
    options: [],
    required: false,
    placeholder: "",
  };
}

const STORAGE_KEY = "form-builder-config";

function loadSavedFormFromStorage(): FormConfig | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as FormConfig;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

export const useFormBuilderStore = create<FormBuilderState>()(
  persist(
    (set, get) => ({
      fields: [createDefaultField()],
      formName: "",
      savedForm: loadSavedFormFromStorage(),

      setFormName: (name) => set({ formName: name }),

      addField: () =>
        set((state) => ({
          fields: [...state.fields, createDefaultField()],
        })),

      removeField: (id) =>
        set((state) => ({
          fields: state.fields.filter((f) => f.id !== id),
        })),

      updateField: (id, updates) =>
        set((state) => ({
          fields: state.fields.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        })),

      moveField: (fromIndex, toIndex) =>
        set((state) => {
          const newFields = [...state.fields];
          const [moved] = newFields.splice(fromIndex, 1);
          newFields.splice(toIndex, 0, moved);
          return { fields: newFields };
        }),

      saveForm: () => {
        const { fields, formName } = get();
        const validFields = fields.filter((f) => f.label.trim() !== "");
        if (validFields.length === 0) return;

        const config: FormConfig = {
          id: `form_${Date.now()}`,
          name: formName || "Untitled Form",
          fields: validFields,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        set({ savedForm: config });
      },

      loadForm: () => {
        const saved = loadSavedFormFromStorage();
        if (saved) {
          set({
            savedForm: saved,
            fields: saved.fields.length > 0 ? saved.fields : [createDefaultField()],
            formName: saved.name,
          });
        }
      },

      clearForm: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({
          fields: [createDefaultField()],
          formName: "",
          savedForm: null,
        });
      },
    }),
    {
      name: "form-builder-state",
      partialize: (state) => ({
        fields: state.fields,
        formName: state.formName,
      }),
    }
  )
);
