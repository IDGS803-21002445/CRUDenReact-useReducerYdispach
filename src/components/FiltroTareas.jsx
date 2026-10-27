import React from 'react';

/**
 * Componente FiltroTareas:
 * Contiene el botón verde de Bootstrap para agregar nuevas tareas mediante modal
 * y la barra de filtros por estado.
 */
export default function FiltroTareas({
    filtroActual,
    onCambiarFiltro,
    tareas = [],
    onAbrirModalCrear,
    onRecargarApi,
    loading = false
}) {
    const categorias = ["Todas", "Pendiente", "En progreso", "Completada"];

    return (
        <div className="card shadow-sm border-0 mb-4 bg-white">
            <div className="card-body d-flex flex-wrap gap-3 justify-content-between align-items-center">
                {/* Lado Izquierdo: Botón verde destacado para agregar tarea + Botón recargar */}
                <div className="d-flex align-items-center gap-2">
                    <button
                        type="button"
                        className="btn btn-success btn-lg shadow-sm fw-bold d-flex align-items-center gap-2"
                        onClick={onAbrirModalCrear}
                    >
                        <i className="bi bi-plus-circle-fill fs-5"></i>
                        <span>+ Nueva Tarea</span>
                    </button>

                    {onRecargarApi && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            title="Sincronizar nuevamente con DummyJSON API"
                            onClick={onRecargarApi}
                            disabled={loading}
                        >
                            <i className={`bi bi-arrow-clockwise ${loading ? 'spin-animation' : ''}`}></i>
                        </button>
                    )}
                </div>

                {/* Lado Derecho: Filtros de categorías */}
                <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small fw-semibold d-none d-md-inline">Filtrar:</span>
                    <div className="btn-group shadow-sm" role="group">
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
            </div>
        </div>
    );
}
