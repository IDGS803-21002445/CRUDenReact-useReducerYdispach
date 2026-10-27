import React from 'react';
import {
    formatearFolio,
    obtenerColorPrioridad,
    obtenerColorEstado
} from '../utils/taskHelpers';

/**
 * Componente TicketTarea: Representa cada tarjeta de requerimiento/tarea.
 * Incluye los iconos de acción solicitados:
 * - 👁️ Ojito: Ver detalles completos del requerimiento y desarrollador
 * - ✏️ Lápiz: Abrir formulario en modo edición (PUT)
 * - 🗑️ Basurero: Eliminar tarea (DELETE)
 */
export default function TicketTarea({
    tarea,
    onVer,
    onEditar,
    onEliminar,
    onCambiarEstado
}) {
    const {
        id,
        modulo,
        titulo,
        descripcion,
        prioridad,
        estado,
        horasEstimadas,
        responsable
    } = tarea;

    const clasePrioridad = obtenerColorPrioridad(prioridad);
    const claseEstado = obtenerColorEstado(estado);
    const folioTexto = formatearFolio(modulo, id);

    // Borde izquierdo visual según estado
    const claseBorde =
        estado === "Completada"
            ? "task-done"
            : estado === "En progreso"
            ? "task-in-progress"
            : "task-pending";

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 shadow-sm border-0 card-task ${claseBorde}`}>
                <div className="card-body d-flex flex-column p-3">
                    {/* Cabecera del Card: Folio, Prioridad y Botones de Acción (Ver, Editar, Eliminar) */}
                    <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold font-monospace text-primary">{folioTexto}</span>
                            <span className={clasePrioridad}>{prioridad}</span>
                        </div>

                        {/* Botones de acción del CRUD */}
                        <div className="btn-group btn-group-sm" role="group" aria-label="Acciones de tarea">
                            {/* Icono Ojito para Ver */}
                            <button
                                type="button"
                                className="btn btn-outline-info text-dark"
                                title="Ver detalles y responsable"
                                onClick={() => onVer(tarea)}
                            >
                                <i className="bi bi-eye-fill"></i>
                            </button>

                            {/* Icono Lápiz para Editar */}
                            <button
                                type="button"
                                className="btn btn-outline-warning text-dark"
                                title="Editar tarea (PUT)"
                                onClick={() => onEditar(tarea)}
                            >
                                <i className="bi bi-pencil-fill"></i>
                            </button>

                            {/* Icono Basurero para Eliminar */}
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                title="Eliminar tarea (DELETE)"
                                onClick={() => onEliminar(id, titulo)}
                            >
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>

                    {/* Título y Descripción */}
                    <h6 className="card-title fw-bold text-dark mb-1">{titulo}</h6>
                    <p className="card-text text-muted small flex-grow-1" style={{ minHeight: '40px' }}>
                        {descripcion}
                    </p>

                    {/* Desarrollador Responsable Asignado desde DummyJSON */}
                    <div
                        className="d-flex align-items-center gap-2 p-2 mb-2 bg-light rounded border cursor-pointer"
                        title="Clic para ver detalles del responsable"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onVer(tarea)}
                    >
                        {responsable?.foto ? (
                            <img
                                src={responsable.foto}
                                alt={responsable.nombreCompleto}
                                className="rounded-circle border border-primary border-2"
                                style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                                <i className="bi bi-person"></i>
                            </div>
                        )}
                        <div className="overflow-hidden" style={{ lineHeight: '1.2' }}>
                            <span className="d-block fw-bold text-truncate small text-dark">
                                {responsable?.nombreCompleto || 'Sin Asignar'}
                            </span>
                            <small className="text-muted d-block text-truncate" style={{ fontSize: '0.75rem' }}>
                                {responsable?.cargo || 'Colaborador'}
                            </small>
                        </div>
                    </div>

                    {/* Horas y Estado */}
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
                        <small className="text-secondary">
                            ⏱ Estimado: <strong>{horasEstimadas}h</strong>
                        </small>
                        <span className={claseEstado}>{estado}</span>
                    </div>

                    {/* Botones de transición de estado */}
                    <div className="btn-group btn-group-sm w-100 mt-2" role="group">
                        {estado !== "Pendiente" && (
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => onCambiarEstado(id, "Pendiente")}
                            >
                                ⏳ Pendiente
                            </button>
                        )}
                        {estado !== "En progreso" && (
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => onCambiarEstado(id, "En progreso")}
                            >
                                🚀 En Curso
                            </button>
                        )}
                        {estado !== "Completada" && (
                            <button
                                className="btn btn-outline-success btn-sm"
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
