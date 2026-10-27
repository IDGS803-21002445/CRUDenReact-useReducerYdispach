# Práctica: Tablero de Tareas Escolares (Mini Sprint Backlog)
**Materia:** Aplicaciones Web Progresivas  
**Grupo:** IDGS1003  
**Proyecto:** Tablero de Tareas Escolares (Migrado a Vite + React + CRUD API con useReducer & DummyJSON)

---

## 1. Cómo Ejecutar con Vite (Recomendado)

1. Abre tu terminal en la carpeta del proyecto:
   ```bash
   cd "c:\Users\Dell\Documents\Universidad\IDGS1003\Aplicaciones Web Progresivas\Tarea react"
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *(Si PowerShell te bloquea por políticas de ejecución, puedes usar `cmd /c "npm run dev"`).*

3. Abre en tu navegador la URL que muestra Vite: [http://localhost:5173](http://localhost:5173).

### Comandos disponibles en `package.json`:
* `npm run dev`: Inicia el servidor de desarrollo con Hot Module Replacement (HMR).
* `npm run build`: Compila y empaqueta la aplicación lista para producción en la carpeta `/dist`.
* `npm run preview`: Previsualiza localmente el paquete optimizado de producción generado en `/dist`.

---

## 2. Cumplimiento de la Rúbrica - Parcial 2 (CRUD con useReducer & API)

| Requisito Solicitado | Implementación en el Proyecto |
| :--- | :--- |
| **Nuevo Apartado Integrado** | Pestaña superior para alternar entre el **Tablero Base (Parcial 1)** y el **CRUD API & useReducer (Parcial 2)**. |
| **Técnica `useReducer` y `dispatch`** | Centralizado en `src/reducers/tasksReducer.js` con acciones formales: `FETCH_INICIO`, `FETCH_EXITO`, `FETCH_ERROR`, `AGREGAR_TAREA`, `ACTUALIZAR_TAREA`, `ELIMINAR_TAREA`, `CAMBIAR_ESTADO_TAREA`, etc. |
| **Formularios con Modal** | `<ModalTareaForm />` implementado con Bootstrap y controlado por estado React. |
| **Validación de Campos** | Validación en tiempo real (`onBlur` y `onChange`) y al enviar (`onSubmit`): Título (min 5 caracteres), Módulo, Responsable obligatorio, Horas (> 0), Prioridad, Estado y Descripción (min 10 caracteres) con clases `is-invalid` y retroalimentación visual. |
| **Peticiones HTTP (GET, POST, PUT, DELETE)** | Implementadas en `src/services/dummyJsonApi.js`:<br>• **GET**: Carga inicial de `/todos` y `/users`.<br>• **POST**: Creación de nueva tarea hacia `/todos/add`.<br>• **PUT**: Actualización de requerimientos hacia `/todos/:id`.<br>• **DELETE**: Eliminación de registros hacia `/todos/:id`. |
| **Consumo de API con Fotos Reales** | Integración con **DummyJSON API** (`https://dummyjson.com/users`), mostrando fotos reales de perfil, nombre, correo y departamento en el `<select>` y en el card de cada tarea. |
| **Alerts Contextuales** | `<AlertaFlotante />` de Bootstrap para confirmar operaciones exitosas (POST verde, PUT azul, DELETE amarillo) y errores (rojo) con el método HTTP reflejado. |
| **Acciones en el Card** | Cada tarjeta incluye: <br>• 👁️ **Ojito**: Ver detalle completo y foto del desarrollador.<br>• ✏️ **Lápiz**: Abrir modal en modo edición (PUT).<br>• 🗑️ **Basurero**: Confirmar y eliminar tarea (DELETE). |

---

## 3. Estructura de Archivos del Proyecto

```text
Tarea react/
├── index.html                  # Entrada HTML para Vite
├── package.json                # Dependencias (React 18, Bootstrap 5, Bootstrap Icons, Vite)
├── vite.config.js              # Configuración de Vite con plugin de React
├── dist/                       # Paquete de producción compilado
├── README.md                   # Documentación técnica
└── src/
    ├── main.jsx                # Render de React + estilos de Bootstrap & Bootstrap Icons
    ├── App.jsx                 # Componente principal con useReducer y navegación
    ├── App.css                 # Estilos y animaciones
    ├── services/
    │   └── dummyJsonApi.js     # Servicios HTTP (GET, POST, PUT, DELETE) con DummyJSON
    ├── reducers/
    │   └── tasksReducer.js     # Reducer puro con estados y tipos de acciones
    ├── components/
    │   ├── BarraUsuario.jsx    # Perfil del alumno y selector de pestañas
    │   ├── ProgresoSprint.jsx  # Indicadores dinámicos de avance
    │   ├── FiltroTareas.jsx    # Botón verde "+ Nueva Tarea" y filtros de estado
    │   ├── TicketTarea.jsx     # Tarjeta con fotos de DummyJSON y botones (👁️, ✏️, 🗑️)
    │   ├── ModalTareaForm.jsx  # Formulario modal con validación de campos
    │   ├── ModalVerTarea.jsx   # Modal de detalle y desarrollador asignado
    │   └── AlertaFlotante.jsx  # Alertas de Bootstrap para feedback de operaciones
    └── utils/
        └── taskHelpers.js      # Funciones lógicas puras (colores, folios, porcentajes)
```
