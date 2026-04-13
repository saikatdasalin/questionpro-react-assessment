import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { TodoListPage } from "@/pages/TodoList";
import { FormBuilderPage } from "@/pages/FormBuilder";
import { FormPreviewPage } from "@/pages/FormPreview";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <div className="min-h-screen bg-muted/40">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/todos" replace />} />
              <Route path="/todos" element={<TodoListPage />} />
              <Route path="/form-builder" element={<FormBuilderPage />} />
              <Route path="/form-preview" element={<FormPreviewPage />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
