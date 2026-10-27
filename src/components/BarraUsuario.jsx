import React from 'react';

/**
 * Componente BarraUsuario: Muestra la información del estudiante y datos académicos
 * utilizando Object Destructuring.
 */
export default function BarraUsuario({ usuario, sprintActual, pestañaActiva, onCambiarPestaña }) {
    const { nombre, matricula, rol, carrera, avatarUrl } = usuario;

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm rounded-bottom px-4 py-3 mb-4">
            <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center gap-3">
                {/* Perfil del estudiante */}
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
                        <div className="mt-1">
                            <span className="badge bg-primary me-2">{rol}</span>
                            <span className="badge bg-outline-light border text-light">{sprintActual}</span>
                        </div>
                    </div>
                </div>

                {/* Navegación entre Parcial 1 y Parcial 2 (Nuevo Apartado de Rúbrica) */}
                <div className="d-flex align-items-center gap-2">
                    <div className="btn-group shadow-sm" role="group">
                        <button
                            type="button"
                            className={`btn btn-sm ${pestañaActiva === 'crud' ? 'btn-success fw-bold' : 'btn-outline-light'}`}
                            onClick={() => onCambiarPestaña('crud')}
                        >
                            <i className="bi bi-cpu-fill me-1"></i>
                            CRUD API & useReducer (Parcial 2)
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${pestañaActiva === 'parcial1' ? 'btn-primary fw-bold' : 'btn-outline-light'}`}
                            onClick={() => onCambiarPestaña('parcial1')}
                        >
                            <i className="bi bi-kanban me-1"></i>
                            Tablero Base (Parcial 1)
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
