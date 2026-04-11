import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { TodoListPage } from "@/pages/TodoList";
import { FormBuilderPage } from "@/pages/FormBuilder";
import { FormPreviewPage } from "@/pages/FormPreview";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-50">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/form-builder" element={<FormBuilderPage />} />
            <Route path="/form-preview" element={<FormPreviewPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
