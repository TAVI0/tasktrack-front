# TaskTrack Frontend

**TaskTrack** es la aplicación frontend de un gestor de tareas que incluye:

* Autenticación (Login / Registro) mediante JWT.
* CRUD de tareas (crear, listar, editar, eliminar).
* Filtro por estado (todas, pendientes, completadas) y fecha de creación.
* Tema oscuro completo con Tailwind CSS.

---

## Requisitos

* Node.js >= 16.x
* npm >= 8.x (o Yarn)

## Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/TAVI0/tasktrack-front.git
   cd tasktrack-front
   ```

2. **Instala dependencias**

   ```bash
   npm install
   # o con yarn
   # yarn install
   ```

3. **Configura variables de entorno**

   Crea en la raíz del proyecto los archivos:

   * `.env.development`:

     ```ini
     VITE_API_URL=http://localhost:8080
     ```


   > **Nota:** Vite expone solo variables que empiezan con `VITE_`.

## Scripts disponibles

| Comando           | Descripción                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia el servidor de desarrollo (Vite).   |
| `npm run build`   | Compila la app para producción en `dist/`. |
| `npm run preview` | Sirve la versión de producción localmente. |

## Estructura principal

```
src/
├─ components/        # Componentes reutilizables (TaskCard, NewTaskModal, ConfirmModal, TaskFilter)
├─ pages/             # Páginas de React (LoginPage, RegisterPage, TasksPage)
├─ services/          # Cliente Axios (api.ts) y servicios (authService, taskService)
├─ types.d.ts         # Tipos TypeScript (Task, TaskPayload, AuthResponse)
├─ index.css          # Estilos globales (Tailwind base + overrides)
├─ main.tsx           # Punto de entrada (BrowserRouter + App)
└─ App.tsx            # Rutas y layout principal
```

## Cómo inicializar el proyecto

1. Asegúrate de tener el backend corriendo en la URL configurada (`VITE_API_URL`).
2. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```
3. Abre tu navegador en `http://localhost:5173` (Vite mostrará la URL exacta).
4. Regístrate (`/register`) o inicia sesión (`/login`).
5. Navega a la página principal (`/`) para gestionar tus tareas.

## Funcionalidades principales

* **Login / Registro**: formularios con validaciones y toggles de visibilidad de contraseña.
* **Listado de tareas**: tarjetas con título, fecha (dd/MM), descripción y acciones (editar, eliminar, marcar completada).
* **Filtro**: por estado y fecha de creación, con botón de limpieza.
* **Modales personalizados**: para crear/editar tareas y confirmaciones (eliminar, logout).
* **Tema oscuro**: aplicado globalmente vía Tailwind en `index.css`.
* **Iconos SVG**: mediante componentes (Heroicons o SVGs propios) para acciones.

---

### Contribuciones

¡Las contribuciones son bienvenidas! Abre un *issue* o un *pull request* para mejorar el proyecto.

---

**License**: MIT
