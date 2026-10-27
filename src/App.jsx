// ============================================================================
// Práctica: Tablero de Tareas Escolares (Mini Sprint Backlog)
// Materia: Aplicaciones Web Progresivas - IDGS1003
// Entorno: Vite + React 18 + Bootstrap 5 + DummyJSON API + useReducer
// ============================================================================

import React, { useState, useEffect, useReducer } from 'react';

// Servicios API con DummyJSON (GET, POST, PUT, DELETE)
import {
    obtenerUsuariosApi,
    obtenerTareasApi,
    crearTareaApi,
    actualizarTareaApi,
    eliminarTareaApi
} from './services/dummyJsonApi';

// Reducer y Tipos de Acciones
import {
    tareasReducer,
    tareasEstadoInicial,
    TIPOS_ACCIONES
} from './reducers/tasksReducer';

// Componentes Modulares
import BarraUsuario from './components/BarraUsuario';
import ProgresoSprint from './components/ProgresoSprint';
import FiltroTareas from './components/FiltroTareas';
import TicketTarea from './components/TicketTarea';
import ModalTareaForm from './components/ModalTareaForm';
import ModalVerTarea from './components/ModalVerTarea';
import AlertaFlotante from './components/AlertaFlotante';

// Funciones lógicas auxiliares
import { filtrarTareasPorEstado } from './utils/taskHelpers';

export default function App() {
    // ------------------------------------------------------------------------
    // 1. Estado de navegación y usuario (Parcial 1)
    // ------------------------------------------------------------------------
    const [pestañaActiva, setPestañaActiva] = useState('crud'); // 'crud' (Parcial 2) o 'parcial1' (Base)
    const [filtro, setFiltro] = useState('Todas');

    const [usuario] = useState({
        nombre: "Aplicaciones Web Progresivas",
        matricula: "21002445-IDGS1003",
        rol: "Desarrollador Web",
        carrera: "Ingeniería en Desarrollo y Gestión de Software",
        avatarUrl:
            "https://us.123rf.com/450wm/martialred/martialred1608/martialred160800018/61263271-cuenta-de-usuario-perfil-del-icono-del-c%C3%ADrculo-plana-para-aplicaciones-y-sitios-web.jpg",
    });

    // ------------------------------------------------------------------------
    // 2. Estado centralizado con useReducer (Parcial 2 - Rúbrica)
    // ------------------------------------------------------------------------
    const [state, dispatch] = useReducer(tareasReducer, tareasEstadoInicial);

    // ------------------------------------------------------------------------
    // 3. Petición inicial GET a DummyJSON al montar el componente
    // ------------------------------------------------------------------------
    const cargarDatosDesdeApi = async () => {
        dispatch({ type: TIPOS_ACCIONES.FETCH_INICIO });
        try {
            // Carga concurrente de usuarios y tareas de DummyJSON
            const [usuariosApi, todosApi] = await Promise.all([
                obtenerUsuariosApi(),
                obtenerTareasApi()
            ]);

            // Mapeo inicial de las tareas recibidas de DummyJSON con usuarios asignados
            const tareasMapeadas = todosApi.map((item, index) => {
                const usuarioAsignado = usuariosApi[index % usuariosApi.length];
                const estados = ["Completada", "En progreso", "Pendiente"];
                const prioridades = ["Alta", "Media", "Baja"];
                const modulos = ["DEV", "API", "UI", "TEST", "ARQ", "VITE"];

                return {
                    id: item.id,
                    modulo: modulos[index % modulos.length],
                    titulo: item.todo,
                    descripcion: `Requerimiento asignado mediante sincronización GET a DummyJSON API para el equipo de desarrollo.`,
                    prioridad: prioridades[index % prioridades.length],
                    estado: item.completed ? "Completada" : estados[index % estados.length],
                    horasEstimadas: (index + 2),
                    responsable: usuarioAsignado
                };
            });

            dispatch({
                type: TIPOS_ACCIONES.FETCH_EXITO,
                payload: {
                    tareas: tareasMapeadas,
                    usuarios: usuariosApi
                }
            });

            dispatch({
                type: TIPOS_ACCIONES.MOSTRAR_ALERTA,
                payload: {
                    tipo: 'info',
                    mensaje: `Datos cargados exitosamente de DummyJSON (${usuariosApi.length} colaboradores y ${tareasMapeadas.length} requerimientos).`,
                    metodo: 'GET'
                }
            });
        } catch (error) {
            dispatch({
                type: TIPOS_ACCIONES.FETCH_ERROR,
                payload: error.message || 'No se pudo conectar con la API de DummyJSON'
            });
        }
    };

    useEffect(() => {
        cargarDatosDesdeApi();
    }, []);

    // ------------------------------------------------------------------------
    // 4. Operaciones CRUD con useReducer + dispatch y métodos HTTP
    // ------------------------------------------------------------------------

    // CREAR TAREA (POST)
    const handleGuardarTarea = async (formData) => {
        if (state.tareaEnEdicion) {
            // Modo Edición: Petición PUT
            try {
                const id = state.tareaEnEdicion.id;
                await actualizarTareaApi(id, formData);

                const tareaActualizada = {
                    ...formData,
                    id: id
                };

                dispatch({
                    type: TIPOS_ACCIONES.ACTUALIZAR_TAREA,
                    payload: tareaActualizada
                });
            } catch (error) {
                dispatch({
                    type: TIPOS_ACCIONES.MOSTRAR_ALERTA,
                    payload: {
                        tipo: 'danger',
                        mensaje: `Error al actualizar tarea (PUT): ${error.message}`,
                        metodo: 'PUT'
                    }
                });
            }
        } else {
            // Modo Creación: Petición POST
            try {
                const respuestaPost = await crearTareaApi(formData);
                // Si la API retorna un ID lo usamos; de lo contrario generamos uno incremental
                const nuevoId = respuestaPost.id || (Date.now() % 10000);

                const nuevaTarea = {
                    ...formData,
                    id: nuevoId
                };

                dispatch({
                    type: TIPOS_ACCIONES.AGREGAR_TAREA,
                    payload: nuevaTarea
                });
            } catch (error) {
                dispatch({
                    type: TIPOS_ACCIONES.MOSTRAR_ALERTA,
                    payload: {
                        tipo: 'danger',
                        mensaje: `Error al crear tarea (POST): ${error.message}`,
                        metodo: 'POST'
                    }
                });
            }
        }
    };

    // ELIMINAR TAREA (DELETE)
    const handleEliminarTarea = async (id, titulo) => {
        const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar la tarea "${titulo}"?`);
        if (!confirmar) return;

        try {
            await eliminarTareaApi(id);
            dispatch({
                type: TIPOS_ACCIONES.ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: TIPOS_ACCIONES.MOSTRAR_ALERTA,
                payload: {
                    tipo: 'danger',
                    mensaje: `Error al eliminar tarea (DELETE): ${error.message}`,
                    metodo: 'DELETE'
                }
            });
        }
    };

    // CAMBIAR ESTADO DE TAREA (PATCH / TRANSICIÓN)
    const handleCambiarEstado = (id, nuevoEstado) => {
        dispatch({
            type: TIPOS_ACCIONES.CAMBIAR_ESTADO_TAREA,
            payload: { id, nuevoEstado }
        });
    };

    // CONTROLADORES DE MODALES
    const handleAbrirCrear = () => {
        dispatch({ type: TIPOS_ACCIONES.ABRIR_MODAL_CREAR });
    };

    const handleAbrirEditar = (tarea) => {
        dispatch({ type: TIPOS_ACCIONES.ABRIR_MODAL_EDITAR, payload: tarea });
    };

    const handleCerrarForm = () => {
        dispatch({ type: TIPOS_ACCIONES.CERRAR_MODAL_FORM });
    };

    const handleAbrirVer = (tarea) => {
        dispatch({ type: TIPOS_ACCIONES.ABRIR_MODAL_VER, payload: tarea });
    };

    const handleCerrarVer = () => {
        dispatch({ type: TIPOS_ACCIONES.CERRAR_MODAL_VER });
    };

    const handleLimpiarAlerta = () => {
        dispatch({ type: TIPOS_ACCIONES.LIMPIAR_ALERTA });
    };

    // Filtrar tareas según el botón activo
    const tareasVisibles = filtrarTareasPorEstado(state.tareas, filtro);

    return (
        <div className="container py-3">
            {/* Cabecera del Estudiante y Selector de Apartados (Parcial 1 vs Parcial 2) */}
            <BarraUsuario
                usuario={usuario}
                sprintActual="Sprint 2 - Parcial 2"
                pestañaActiva={pestañaActiva}
                onCambiarPestaña={setPestañaActiva}
            />

            {/* Apartado 1: TABLERO ORIGINAL DEL PRIMER PARCIAL (Preservado sin alteraciones) */}
            {pestañaActiva === 'parcial1' && (
                <div className="alert alert-secondary border-0 shadow-sm p-4 text-center">
                    <h5 className="fw-bold text-dark">
                        <i className="bi bi-archive-fill text-primary me-2"></i>
                        Tablero Estático Original (Primer Parcial)
                    </h5>
                    <p className="text-muted mb-3">
                        Este módulo contiene la base original del proyecto preservada. Para interactuar con el CRUD,
                        los modales, las validaciones y la API DummyJSON, cambia a la pestaña <strong>"CRUD API & useReducer"</strong>.
                    </p>
                    <button
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => setPestañaActiva('crud')}
                    >
                        Ir al Módulo CRUD (Parcial 2)
                    </button>
                </div>
            )}

            {/* Apartado 2: NUEVO MÓDULO CRUD CON useReducer, DummyJSON Y MODALES (Parcial 2) */}
            {pestañaActiva === 'crud' && (
                <>
                    {/* Alerta flotante informativa de operaciones HTTP */}
                    <AlertaFlotante alerta={state.alerta} onCerrar={handleLimpiarAlerta} />

                    {/* Barra de progreso dinámica */}
                    <ProgresoSprint tareas={state.tareas} />

                    {/* Barra de control con Botón Verde "+ Nueva Tarea" y Filtros */}
                    <FiltroTareas
                        filtroActual={filtro}
                        onCambiarFiltro={setFiltro}
                        tareas={state.tareas}
                        onAbrirModalCrear={handleAbrirCrear}
                        onRecargarApi={cargarDatosDesdeApi}
                        loading={state.loading}
                    />

                    {/* Estado de carga */}
                    {state.loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="text-muted mt-2">Conectando con DummyJSON API (GET)...</p>
                        </div>
                    )}

                    {/* Grid de Tickets de Tareas */}
                    {!state.loading && (
                        <div className="row">
                            {tareasVisibles.length > 0 ? (
                                tareasVisibles.map((tarea) => (
                                    <TicketTarea
                                        key={tarea.id}
                                        tarea={tarea}
                                        onVer={handleAbrirVer}
                                        onEditar={handleAbrirEditar}
                                        onEliminar={handleEliminarTarea}
                                        onCambiarEstado={handleCambiarEstado}
                                    />
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="p-4 bg-white rounded shadow-sm">
                                        <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                                        <h5 className="text-muted">No hay tareas con el estado "{filtro}".</h5>
                                        <button
                                            className="btn btn-success mt-2"
                                            onClick={handleAbrirCrear}
                                        >
                                            <i className="bi bi-plus-lg me-1"></i> Crear la primera tarea
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Modal con Formulario para Crear (POST) y Editar (PUT) con validaciones */}
                    <ModalTareaForm
                        abierto={state.modalFormAbierto}
                        tareaEnEdicion={state.tareaEnEdicion}
                        usuarios={state.usuarios}
                        onGuardar={handleGuardarTarea}
                        onCerrar={handleCerrarForm}
                    />

                    {/* Modal para Ver detalles y foto de desarrollador de DummyJSON (👁️) */}
                    <ModalVerTarea
                        tarea={state.tareaSeleccionada}
                        abierto={state.modalVerAbierto}
                        onCerrar={handleCerrarVer}
                    />
                </>
            )}

            {/* Pie de página con créditos académicos */}
            <footer className="text-center py-4 mt-4 border-top text-muted small">
                <p className="mb-1 fw-semibold">
                    Aplicaciones Web Progresivas - IDGS1003 | CRUD con useReducer, dispatch & DummyJSON API
                </p>
                <p className="mb-0">
                    Peticiones implementadas: <span className="badge bg-secondary">GET</span> <span className="badge bg-success">POST</span> <span className="badge bg-primary">PUT</span> <span className="badge bg-danger">DELETE</span>
                </p>
            </footer>
        </div>
    );
}
