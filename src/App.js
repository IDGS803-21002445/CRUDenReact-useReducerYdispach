// ============================================================================
// Práctica 1.4: Introducción a React Origen CDN
// Materia: Aplicaciones Web Progresivas - IDGS1003
// Alumno: Josué Armando Rivera Hernández

// Extracción de Hooks mediante Destructuring de React global (sin módulos npm)
const { useState } = React;

// ----------------------------------------------------------------------------
// 1. FUNCIONES JAVASCRIPT CON ARGUMENTOS (Mínimo 4 requeridas)
// ----------------------------------------------------------------------------

/**
 * Función 1: Retorna la clase de color de Bootstrap según el nivel de prioridad.
 * @param {string} prioridad - Nivel de prioridad ("Alta", "Media", "Baja").
 * @returns {string} Clase badge de Bootstrap.
 */
const obtenerColorPrioridad = (prioridad) => {
    switch (prioridad) {
        case "Alta":
            return "badge bg-danger";
        case "Media":
            return "badge bg-warning text-dark";
        case "Baja":
            return "badge bg-info text-dark";
        default:
            return "badge bg-secondary";
    }
};

/**
 * Función 2: Construye y formatea el código identificador del ticket escolar.
 * Aplica Template Strings e interpolación `${}`.
 * @param {string} modulo - Prefijo del módulo o materia (ej. "REQ", "DEV", "TEST").
 * @param {number} id - Identificador numérico.
 * @returns {string} Folio formal (ej. "[REQ-001]").
 */
const formatearFolio = (modulo, id) => {
    const idCadena = String(id).padStart(3, "0");
    return `[${modulo}-${idCadena}]`;
};

/**
 * Función 3: Calcula el porcentaje exacto de avance completado.
 * Aplica validaciones matemáticas y redondeo.
 * @param {number} completadas - Cantidad de tareas concluidas.
 * @param {number} total - Cantidad total de tareas registradas.
 * @returns {number} Valor entre 0 y 100.
 */
const calcularPorcentajeAvance = (completadas, total) => {
    if (total === 0) return 0;
    const porcentaje = Math.round((completadas / total) * 100);
    return porcentaje;
};

/**
 * Función 4: Retorna la clase visual según el estado actual de la tarea.
 * @param {string} estado - Estado de la tarea ("Pendiente", "En progreso", "Completada").
 * @returns {string} Clase CSS de estado y estilo Bootstrap.
 */
const obtenerColorEstado = (estado) => {
    if (estado === "Completada") {
        return "badge bg-success";
    } else if (estado === "En progreso") {
        return "badge bg-primary";
    }
    return "badge bg-secondary";
};

/**
 * Función 5 (Extra): Filtra la lista de tareas utilizando el método .filter() de arreglos.
 * @param {Array} lista - Arreglo de objetos de tareas.
 * @param {string} filtro - Filtro seleccionado ("Todas", "Pendiente", "En progreso", "Completada").
 * @returns {Array} Subconjunto filtrado.
 */
const filtrarTareasPorEstado = (lista, filtro) => {
    if (filtro === "Todas") {
        return lista;
    }
    return lista.filter((item) => item.estado === filtro);
};


// ----------------------------------------------------------------------------
// 2. COMPONENTES REACT (Mínimo 3 requeridos)
// ----------------------------------------------------------------------------

/**
 * Componente 1: BarraUsuario
 * Muestra el perfil del desarrollador con la imagen provista en el material escolar,
 * utilizando Object Destructuring para extraer los datos del alumno.
 */
function BarraUsuario(props) {
    const { usuario, sprintActual } = props;
    const { nombre, matricula, rol, carrera, avatarUrl } = usuario;

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm rounded-bottom px-4 py-3 mb-4">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Perfil del estudiante con la imagen provista */}
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={avatarUrl}
                        alt={`Foto de perfil de ${nombre}`}
                        className="rounded-circle avatar-img bg-white shadow-sm"
                    />
                    <div>
                        <h4 className="text-white mb-0 fw-bold">{nombre}</h4>
                        <small className="text-light opacity-75">
                            {carrera} | Matrícula: <span className="fw-semibold">{matricula}</span>
                        </small>
                        <div>
                            <span className="badge bg-primary mt-1 me-2">{rol}</span>
                            <span className="badge bg-outline-light border text-light">{sprintActual}</span>
                        </div>
                    </div>
                </div>

                {/* Insignia de materia y grupo */}
                <div className="text-end d-none d-md-block">
                    <span className="badge bg-light text-dark fs-6 px-3 py-2 shadow-sm">
                        Grupo: IDGS1003
                    </span>
                    <p className="text-white-50 small mb-0 mt-1">Aplicaciones Web Progresivas</p>
                </div>
            </div>
        </header>
    );
}

/**
 * Componente 2: ProgresoSprint
 * Calcula estadísticas dinámicas y dibuja una barra de progreso de Bootstrap en tiempo real.
 */
function ProgresoSprint(props) {
    const { tareas } = props;

    // Técnicas JS: .filter() y .length para calcular métricas
    const total = tareas.length;
    const completadas = tareas.filter((t) => t.estado === "Completada").length;
    const enProgreso = tareas.filter((t) => t.estado === "En progreso").length;
    const pendientes = tareas.filter((t) => t.estado === "Pendiente").length;

    // Uso de la Función 3 con argumentos
    const porcentaje = calcularPorcentajeAvance(completadas, total);

    return (
        <section className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-bold text-secondary mb-0">
                        Estado del Sprint Actual
                    </h5>
                    <span className="fs-5 fw-bold text-primary">{porcentaje}% Concluido</span>
                </div>

                {/* Barra de progreso de Bootstrap */}
                <div className="progress mb-3" style={{ height: "22px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success fw-bold"
                        role="progressbar"
                        style={{ width: `${porcentaje}%` }}
                        aria-valuenow={porcentaje}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {porcentaje > 10 ? `${porcentaje}%` : ""}
                    </div>
                </div>

                {/* Resumen de indicadores numéricos */}
                <div className="row text-center g-2">
                    <div className="col-3">
                        <div className="p-2 border rounded bg-light">
                            <span className="d-block small text-muted">Total</span>
                            <span className="fw-bold fs-6">{total}</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="p-2 border rounded bg-light">
                            <span className="d-block small text-muted">Pendientes</span>
                            <span className="fw-bold fs-6 text-warning">{pendientes}</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="p-2 border rounded bg-light">
                            <span className="d-block small text-muted">En Curso</span>
                            <span className="fw-bold fs-6 text-primary">{enProgreso}</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="p-2 border rounded bg-light">
                            <span className="d-block small text-muted">Completas</span>
                            <span className="fw-bold fs-6 text-success">{completadas}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Componente 3: FiltroTareas
 * Barra de botones para filtrar las tareas según su estado.
 */
function FiltroTareas(props) {
    const { filtroActual, onCambiarFiltro, tareas } = props;
    const categorias = ["Todas", "Pendiente", "En progreso", "Completada"];

    return (
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">Tablero de Requerimientos</h5>
            <div className="btn-group shadow-sm" role="group">
                {/* Técnica JS: .map() para iterar botones de filtros */}
                {categorias.map((cat) => {
                    const esActivo = filtroActual === cat;
                    const cantidad =
                        cat === "Todas"
                            ? tareas.length
                            : tareas.filter((t) => t.estado === cat).length;

                    return (
                        <button
                            key={cat}
                            type="button"
                            className={`btn btn-sm ${esActivo ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => onCambiarFiltro(cat)}
                        >
                            {cat} <span className="badge bg-light text-dark ms-1">{cantidad}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Componente 4: TicketTarea
 * Tarjeta individual que muestra los detalles del ticket y permite cambiar su estado.
 */
function TicketTarea(props) {
    const { tarea, onCambiarEstado } = props;
    // Técnica JS: Object Destructuring
    const { id, modulo, titulo, descripcion, prioridad, estado, horasEstimadas } = tarea;

    // Uso de Funciones 1, 2 y 4 con argumentos
    const clasePrioridad = obtenerColorPrioridad(prioridad);
    const claseEstado = obtenerColorEstado(estado);
    const folioTexto = formatearFolio(modulo, id);

    // Clase para el borde izquierdo según estado
    const claseBorde =
        estado === "Completada"
            ? "task-done"
            : estado === "En progreso"
            ? "task-in-progress"
            : "task-pending";

    return (
        <div className="col-md-6 col-lg-4 mb-3">
            <div className={`card h-100 shadow-sm border-0 card-task ${claseBorde}`}>
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold font-monospace text-primary">{folioTexto}</span>
                        <span className={clasePrioridad}>{prioridad}</span>
                    </div>

                    <h6 className="card-title fw-bold text-dark">{titulo}</h6>
                    <p className="card-text text-muted small flex-grow-1">{descripcion}</p>

                    <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                        <small className="text-secondary">
                            ⏱ Estimado: <strong>{horasEstimadas}h</strong>
                        </small>
                        <span className={claseEstado}>{estado}</span>
                    </div>

                    {/* Botones de acción para transiciones de estado */}
                    <div className="btn-group btn-group-sm w-100 mt-3" role="group">
                        {estado !== "Pendiente" && (
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => onCambiarEstado(id, "Pendiente")}
                            >
                                ⏳ Pendiente
                            </button>
                        )}
                        {estado !== "En progreso" && (
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => onCambiarEstado(id, "En progreso")}
                            >
                                🚀 En Curso
                            </button>
                        )}
                        {estado !== "Completada" && (
                            <button
                                className="btn btn-outline-success"
                                onClick={() => onCambiarEstado(id, "Completada")}
                            >
                                ✔ Completar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------------
// 3. COMPONENTE PRINCIPAL (App)
// ----------------------------------------------------------------------------
function App() {
    // Datos del usuario con la imagen solicitada en el material de clase
    const [usuario] = useState({
        nombre: "Aplicaciones Web Progresivas",
        matricula: "21002445-IDGS1003",
        rol: "Desarrollador Web",
        carrera: "Ingeniería en Desarrollo y Gestión de Software",
        avatarUrl:
            "https://us.123rf.com/450wm/martialred/martialred1608/martialred160800018/61263271-cuenta-de-usuario-perfil-del-icono-del-c%C3%ADrculo-plana-para-aplicaciones-y-sitios-web.jpg",
    });

    // Estado inicial de tareas de desarrollo de software
    const [tareas, setTareas] = useState([
        {
            id: 1,
            modulo: "ARQ",
            titulo: "Diseñar arquitectura y diagrama de componentes",
            descripcion: "Definir separación de responsabilidades y árbol de componentes en React.",
            prioridad: "Alta",
            estado: "Completada",
            horasEstimadas: 4,
        },
        {
            id: 2,
            modulo: "CDN",
            titulo: "Vincular librerías React, ReactDOM y Babel",
            descripcion: "Integrar los scripts CDN en el archivo HTML principal sin bundler.",
            prioridad: "Alta",
            estado: "Completada",
            horasEstimadas: 2,
        },
        {
            id: 3,
            modulo: "UI",
            titulo: "Implementar interfaz responsiva con Bootstrap 5",
            descripcion: "Estructurar Navbar, Cards, Badges, Botones y Barra de progreso.",
            prioridad: "Media",
            estado: "En progreso",
            horasEstimadas: 3,
        },
        {
            id: 4,
            modulo: "JS",
            titulo: "Desarrollar funciones lógicas con argumentos",
            descripcion: "Crear formateadores de folios, cálculos matemáticos y mapeo de clases.",
            prioridad: "Alta",
            estado: "En progreso",
            horasEstimadas: 3,
        },
        {
            id: 5,
            modulo: "TEST",
            titulo: "Ejecutar pruebas en localhost con http-server",
            descripcion: "Comprobar la carga sin errores de CORS con el servidor local Node.",
            prioridad: "Media",
            estado: "Pendiente",
            horasEstimadas: 2,
        },
        {
            id: 6,
            modulo: "DOC",
            titulo: "Redactar justificación técnica de conceptos ES6+",
            descripcion: "Documentar el uso de Arrow Functions, Destructuring, Map y Filter.",
            prioridad: "Baja",
            estado: "Pendiente",
            horasEstimadas: 1,
        },
    ]);

    // Estado para el filtro activo
    const [filtro, setFiltro] = useState("Todas");

    // Manejador para actualizar el estado de una tarea por su ID (recibe 2 argumentos)
    const cambiarEstadoTarea = (idTarea, nuevoEstado) => {
        const tareasActualizadas = tareas.map((item) => {
            if (item.id === idTarea) {
                return { ...item, estado: nuevoEstado }; // Spread operator & inmutabilidad
            }
            return item;
        });
        setTareas(tareasActualizadas);
    };

    // Uso de la Función 5 con argumentos
    const tareasVisibles = filtrarTareasPorEstado(tareas, filtro);

    return (
        <div className="container py-3">
            {/* Componente 1 */}
            <BarraUsuario usuario={usuario} sprintActual="Sprint 1 - Parcial 1" />

            {/* Componente 2 */}
            <ProgresoSprint tareas={tareas} />

            {/* Componente 3 */}
            <FiltroTareas
                filtroActual={filtro}
                onCambiarFiltro={setFiltro}
                tareas={tareas}
            />

            {/* Componente 4 renderizado en bucle con .map() */}
            <div className="row">
                {tareasVisibles.length > 0 ? (
                    tareasVisibles.map((tarea) => (
                        <TicketTarea
                            key={tarea.id}
                            tarea={tarea}
                            onCambiarEstado={cambiarEstadoTarea}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fs-5">
                            No hay tareas registradas con el estado "{filtro}".
                        </p>
                    </div>
                )}
            </div>

            {/* Pie de página con créditos y cumplimiento de requisitos */}
            <footer className="text-center py-4 mt-4 border-top text-muted small">
                <p className="mb-1 fw-semibold">
                    Práctica P 1.4: Introducción a React Origen CDN | Bootstrap 5 | Babel Standalone
                </p>
                <p className="mb-0">Universidad - Ingeniería en Desarrollo y Gestión de Software</p>
            </footer>
        </div>
    );
}

// ----------------------------------------------------------------------------
// 4. RENDERIZADO EN EL DOM (React 18)
// ----------------------------------------------------------------------------
const contenedorRoot = document.getElementById("root");
if (ReactDOM.createRoot) {
    const root = ReactDOM.createRoot(contenedorRoot);
    root.render(<App />);
} else {
    ReactDOM.render(<App />, contenedorRoot);
}
