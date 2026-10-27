import React from 'react';
import { calcularPorcentajeAvance } from '../utils/taskHelpers';

/**
 * Componente ProgresoSprint: Calcula y muestra estadísticas dinámicas del sprint.
 */
export default function ProgresoSprint({ tareas = [] }) {
    const total = tareas.length;
    const completadas = tareas.filter((t) => t.estado === "Completada").length;
    const enProgreso = tareas.filter((t) => t.estado === "En progreso").length;
    const pendientes = tareas.filter((t) => t.estado === "Pendiente").length;

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
