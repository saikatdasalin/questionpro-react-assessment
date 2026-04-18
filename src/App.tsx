import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TodoListPage } from "@/pages/TodoList";
import { FormBuilderPage } from "@/pages/FormBuilder";
import { FormPreviewPage } from "@/pages/FormPreview";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route path="/form-preview" element={<FormPreviewPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
