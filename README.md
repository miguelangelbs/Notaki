# Gestor de Tareas

Aplicación web de gestión de tareas tipo Kanban construida con React. Permite organizar trabajo en tableros, columnas y tareas con funcionalidad de arrastrar y soltar.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://es.react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)](https://vite.dev)

## Características

- **Gestión de Tableros**: Crear, editar, eliminar y reordenar tableros con arrastre y soltar
- **Gestión de Columnas**: Organizar tareas por estado o categoría dentro de cada tablero
- **Gestión de Tareas**: Crear, editar, eliminar y mover tareas entre columnas
- **Interfaz Visual**: Diseño limpio con selector de color para personalizar tableros
- **Persistencia**: Datos guardados automáticamente en localStorage

## Tecnologías

- [React 19](https://es.react.dev) — Biblioteca de UI
- [Vite 7](https://vite.dev) — Build tool y dev server
- [Radix UI Themes](https://www.radix-ui.com/themes) — Componentes UI accesibles
- [@dnd-kit](https://dndkit.com) — Librería de drag-and-drop
- [react-router-dom](https://reactrouter.com) — Enrutamiento
- [uuid](https://www.npmjs.com/package/uuid) — Generación de IDs únicos

## Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/miguelangelbs/Notaki.git
cd proyectoGestorTareas

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo con HMR |
| `npm run build` | Construir para producción (salida en `dist/`) |
| `npm run preview` | Previsualizar build de producción |
| `npm run lint` | Ejecutar ESLint en todos los archivos |

## Límites del Sistema

- Máximo de **5 tableros** por usuario
- Máximo de **5 columnas** por tablero
- Máximo de **8 tareas** por columna

## Estructura del Proyecto

```
src/
├── components/         # Componentes React reutilizables
│   ├── AddBoardDialog.jsx      # Diálogo para crear tablero
│   ├── AddColumnDialog.jsx     # Diálogo para crear columna
│   ├── AddTaskDialog.jsx       # Diálogo para crear tarea
│   ├── Brick.jsx               # Componente visual de tablero
│   ├── Column.jsx              # Componente de columna
│   ├── EditBoardDialog.jsx    # Diálogo para editar tablero
│   ├── EditColumnDialog.jsx    # Diálogo para editar columna
│   ├── EditTaskDialog.jsx      # Diálogo para editar tarea
│   ├── Task.jsx               # Componente de tarea
│   └── ...
├── context/           # Contextos de React
│   └── UserContext.jsx        # Estado global del usuario
├── hooks/             # Hooks personalizados
│   ├── useSortableTareas.js           # Hook para arrastrar tareas
│   ├── useSortableroColumnas.js        # Hook para arrastrar columnas
│   └── useSortableTableros.js         # Hook para arrastrar tableros
├── routes/            # Páginas de la aplicación
│   ├── BoardDetail.jsx        # Vista detallada de un tablero
│   └── Home.jsx               # Página principal
├── services/          # Lógica de negocio
│   ├── boardService.js        # Operaciones de tableros
│   ├── columnService.js      # Operaciones de columnas
│   ├── taskService.js        # Operaciones de tareas
│   └── userService.js        # Operaciones de usuario
├── styles/            # EstilosCSS
│   ├── Brick.css
│   └── Global.css
├── utils/             # Utilidades
│   ├── colors.js              # Definiciones de colores
│   ├── constants.js          # Constantes globales
│   └── dateUtils.js          # Utilidades de fecha
├── App.jsx            # Componente raíz
└── main.jsx           # Punto de entrada
```

## Uso

1. **Crear un tablero**: Desde la página principal, hacer clic en "Agregar Tablero" y seleccionar un color.
2. **Agregar columnas**: Dentro de un tablero, clic en "Agregar Columna" para definir categorías.
3. **Agregar tareas**: Dentro de cada columna, clic en "Agregar Tarea" con descripción y fecha límite opcional.
4. **Organizar**: Arrastrar y soltar tableros, columnas y tareas para reordenar según necesidad.

Los datos se guardan automáticamente en el navegador del usuario.
