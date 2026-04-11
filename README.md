# QuestionPro React Assessment — Todo List & Dynamic Form Builder

A modern React application built with **Vite**, **TypeScript**, **Zustand**, and **Tailwind CSS** featuring two independent features: a Todo List with data visualization and a Dynamic Form Builder.

## Features

### 1. Todo List (Data Visualization)
- Fetches todos and users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com)
- Displays each todo with title, completion status, and mapped user name
- **Filtering** by user and status (Completed / Pending) with search
- **Persistence** — applied filters and search are preserved when navigating between pages (powered by Zustand with persist middleware)
- **Pagination** with configurable page sizes (5, 10, 20, 50)

### 2. Dynamic Form Builder
- Create forms by defining fields with configurable labels and input types
- Supported input types: Text, Number, Email, Password, Textarea, Dropdown/Select, Checkbox, Radio, Date
- Add/remove/reorder fields with an intuitive drag-style UI
- Configure options for Select and Radio field types
- Mark fields as required
- Form configuration is saved to **localStorage**

### 3. Form Preview
- Renders the saved form from localStorage on a separate preview page
- Users can fill in the form and submit it
- On submit, the form data is printed to the **browser console**

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library (functional components + hooks) |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| Zustand | State management (with persist middleware) |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Pre-built accessible UI components |
| Lucide React | Icons |

## Routes

| Route | Page |
|---|---|
| `/todos` | Todo List |
| `/form-builder` | Create / Edit Form |
| `/form-preview` | Preview & Submit Form |

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone <https://github.com/saikatdasalin/questionpro-react-assessment.git>
cd questionpro-react-assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Approach & Architecture

### State Management
- **Zustand** is used for global state management with the `persist` middleware
- `useTodoStore` — manages todos, users, filters, pagination state. Filters and pagination are persisted so they survive page navigation
- `useFormBuilderStore` — manages form field definitions and saves the complete form configuration to localStorage

### Reusable Components
- `PageHeader` — consistent page title and description layout
- `EmptyState` — reusable empty state with icon, title, description, and optional action
- `Navbar` — navigation bar with active route highlighting
- `DynamicField` — renders any field type based on the form configuration
- `FieldEditor` — reusable field configuration card for the form builder
- shadcn/ui primitives (Button, Card, Input, Select, Badge, Table, etc.)

### Data Flow
1. **Todo List**: Data is fetched once from the API and cached in Zustand store. Filters are applied client-side with derived state methods
2. **Form Builder**: Field definitions are managed in Zustand state. On save, the configuration is serialized to localStorage
3. **Form Preview**: Reads the saved configuration from localStorage and dynamically renders the form. On submit, data is logged to the console
