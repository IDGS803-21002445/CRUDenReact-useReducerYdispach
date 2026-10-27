import React from 'react';
import { formatearFolio, obtenerColorPrioridad, obtenerColorEstado } from '../utils/taskHelpers';

/**
 * Componente ModalVerTarea: Muestra el detalle completo de una tarea
 * y la información del desarrollador asignado con su foto traída desde DummyJSON.
 */
export default function ModalVerTarea({ tarea, abierto, onCerrar }) {
    if (!abierto || !tarea) return null;

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

    const folio = formatearFolio(modulo, id);
    const clasePrioridad = obtenerColorPrioridad(prioridad);
    const claseEstado = obtenerColorEstado(estado);

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow border-0">
                    <div className="modal-header bg-dark text-white">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-eye text-info fs-5"></i>
                            <h5 className="modal-title fw-bold mb-0">Detalles de la Tarea {folio}</h5>
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={onCerrar}
                        ></button>
                    </div>

                    <div className="modal-body p-4">
                        {/* Insignias de Estado y Prioridad */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className={clasePrioridad}>Prioridad: {prioridad}</span>
                            <span className={claseEstado}>Estado: {estado}</span>
                        </div>

                        {/* Título y Descripción */}
                        <h4 className="fw-bold text-dark mb-2">{titulo}</h4>
                        <p className="text-secondary mb-4 bg-light p-3 rounded border">
                            {descripcion || "Sin descripción proporcionada."}
                        </p>

                        {/* Fila de métricas */}
                        <div className="row g-2 mb-4">
                            <div className="col-6">
                                <div className="p-2 border rounded bg-light text-center">
                                    <small className="text-muted d-block">Módulo / Área</small>
                                    <span className="fw-bold text-primary font-monospace">{modulo}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="p-2 border rounded bg-light text-center">
                                    <small className="text-muted d-block">Tiempo Estimado</small>
                                    <span className="fw-bold text-dark">⏱ {horasEstimadas} horas</span>
                                </div>
                            </div>
                        </div>

                        {/* Sección del Desarrollador Asignado (DummyJSON) */}
                        <div className="border rounded-3 p-3 bg-white shadow-sm">
                            <h6 className="fw-bold text-muted small text-uppercase mb-3 d-flex align-items-center gap-1">
                                <i className="bi bi-person-badge text-primary"></i> Desarrollador Responsable (DummyJSON)
                            </h6>
                            {responsable ? (
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={responsable.foto}
                                        alt={responsable.nombreCompleto}
                                        className="rounded-circle border border-primary border-2 shadow-sm"
                                        style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-0">{responsable.nombreCompleto}</h6>
                                        <small className="text-muted d-block">{responsable.email}</small>
                                        <div className="mt-1">
                                            <span className="badge bg-light text-dark border me-1">
                                                {responsable.cargo || "Desarrollador"}
                                            </span>
                                            <span className="badge bg-secondary-subtle text-secondary-emphasis">
                                                {responsable.departamento || "Tecnología"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted small mb-0">No se ha asignado desarrollador a esta tarea.</p>
                            )}
                        </div>
                    </div>

                    <div className="modal-footer bg-light">
                        <button type="button" className="btn btn-secondary" onClick={onCerrar}>
                            <i className="bi bi-x-circle me-1"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
