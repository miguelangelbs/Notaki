# AGENTS.md - Project Guidelines for Agentic Coding

## Project Overview

This is a **React + Vite** task management application (Gestor de Tareas) with drag-and-drop functionality. The app uses **JavaScript** (JSX), not TypeScript. It features boards, columns, and tasks with persistent localStorage storage.

---

## Commands

### Development
```bash
npm run dev          # Start Vite development server
npm run preview      # Preview production build
```

### Build & Lint
```bash
npm run build        # Build for production (outputs to dist/)
npm run lint         # Run ESLint on all files
```

### Code Quality
```bash
npx -y react-doctor@latest . --verbose --diff   # Run React Doctor analysis
```

### Single Test
There are **no tests** currently configured in this project.

---

## Tech Stack

- **React 19** with Vite 7
- **Radix UI** (via @radix-ui/themes) for UI components
- **@dnd-kit** for drag-and-drop (core, modifiers, sortable, utilities)
- **react-router-dom** for routing
- **uuid** for generating unique IDs

---

## Code Style Guidelines

### General Conventions
- This project uses **JavaScript** (not TypeScript)
- Use **4 spaces** for indentation (not tabs)
- No trailing commas
- Use double quotes for strings consistently

### File Organization
```
src/
├── components/     # React components (PascalCase filenames)
├── context/        # React contexts
├── hooks/          # Custom React hooks (use* naming)
├── routes/         # Route page components
├── services/       # Business logic / data services
├── styles/         # CSS files
└── utils/          # Utility functions and constants
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Task.jsx`, `BoardDetail.jsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useSortableTareas.js`)
- **Services**: camelCase ending with `Service` (e.g., `taskService.js`)
- **Variables/Functions**: camelCase
- **Props**: camelCase (note: codebase uses Spanish naming - maintain this pattern)

### Import Order
1. External libraries (React, Radix UI, dnd-kit)
2. Internal components/hooks/services
3. Relative path imports

Example:
```jsx
import { useState } from "react"
import { Card, Text } from "@radix-ui/themes"
import { useSortable } from "@dnd-kit/sortable"
import { useUser } from "../context/UserContext"
import { EditTaskDialog } from "./EditTaskDialog"
import { taskService } from "../services/taskService"
```

### Component Structure
```jsx
export const ComponentName = ({ prop1, prop2 }) => {
    // Hooks first
    const { state } = useContext()
    const [localState, setLocalState] = useState(false)

    // Derived state
    const computedValue = ...

    // Handlers
    const handleAction = () => { ... }

    // JSX return
    return (
        <div>...</div>
    )
}
```

### Error Handling
- Service functions return `null` on failure rather than throwing
- Check for null/undefined before accessing nested properties
- Use optional chaining when accessing potentially null properties

Example:
```javascript
const resultado = obtenerTableroYColumna(usuario, tableroId, columnaId);
if (!resultado) return null;
```

### State Management
- Use React Context (`UserContext`) for global user state
- Use local `useState` for component-local state
- Use `useSortable` from @dnd-kit for drag-and-drop

### CSS/Styling
- Radix UI components accept `style` prop for inline styles
- CSS files stored in `src/styles/` directory
- Global styles in `src/styles/Global.css`

### ESLint Rules
- `no-unused-vars`: Error for unused variables (except those starting with uppercase or underscore)
- React hooks rules from `eslint-plugin-react-hooks`
- React refresh rules from `eslint-plugin-react-refresh`

Run `npm run lint` and `react-doctor` before committing.

---

## Working with Data

### Data Persistence
- All data stored in `localStorage` under key `usuarioInvitado`
- Service functions read from and write to localStorage after mutations

### Data Flow
1. Services handle data manipulation (CRUD operations)
2. Components call services and update context
3. Context provides global state to components

### Adding New Features
1. Create service functions in appropriate `services/` file
2. Add context methods if global state needed
3. Create components in `components/`
4. Add routes in `routes/` if new pages needed

---

## Common Patterns

### Dialog Components
Use Radix UI AlertDialog/Dialog for modals. See `AddTaskDialog.jsx`, `EditTaskDialog.jsx`.

### Drag and Drop
Use @dnd-kit - wrap sortable items with `useSortable({ id })`, use `DndContext` and `SortableContext` for containers. See `useSortableTareas.js` and `useSortableroColumnas.js`.

### Date Handling
Use JavaScript `Date` object with `toISOString()` for storage.

---

## Notes

- The codebase uses **Spanish** for function names, variables, and user-facing text
- Maintain consistency with Spanish naming (`tableroId`, `columnaId`, `tareaId`, `handleEliminarTarea`, etc.)
- All dates stored in ISO 8601 format

---

## Sub-Agents

The main agent should automatically use specialized sub-agents based on the task type. If unsure, the agent should ask the user which sub-agent to use.

### Available Sub-Agents

| Sub-Agent | Purpose | When to Use |
|-----------|---------|--------------|
| **Optimizador** | Refactor existing working code to make it faster, more readable, and maintainable | Code works but needs improvement |
| **Narrador** | Generate clear technical documentation (README, JSDoc, guides) | Documentation needs to be created or updated |
| **Escudo** | Generate comprehensive test suites (happy path, edge cases, errors, integrations) | Tests need to be added or coverage improved |
| **Detective** | Analyze and fix bugs methodically | Something is not working as expected |
| **Critico** | Code review (security, performance, maintainability, quality) | Before important commits |
| **Constructor** | Generate production-ready functional code | New features need to be implemented from design |

### Sub-Agent Usage Guidelines

1. **Automatic Delegation**: The main agent should automatically delegate to a sub-agent when the task clearly matches one of the specializations above.

2. **Ask for Confirmation**: If the task could benefit from multiple sub-agents or the main agent is unsure, ask the user which sub-agent to use.

3. **Escalation Pattern**: For complex tasks requiring multiple specializations, use the most relevant sub-agent first, then assess if additional sub-agents are needed.

4. **Context Preservation**: When using sub-agents, ensure they have access to relevant context (file paths, requirements, existing code patterns).

### Asking the User About Sub-Agents

If you need user input on which sub-agent to use, present options like this:

```
Esta tarea podría beneficiarse de los siguientes sub-agentes:
- Optimizador (Recommended): Para mejorar el código existente
- Constructor: Para implementar nuevos componentes
- Otro: Especificar cuál
```

---

## Sub-Agents Available in This Project

The following specialized agents are configured and ready to use:

- **frontend-design**: Create distinctive, production-grade frontend interfaces
- **vercel-react-best-practices**: React and Next.js performance optimization guidelines
