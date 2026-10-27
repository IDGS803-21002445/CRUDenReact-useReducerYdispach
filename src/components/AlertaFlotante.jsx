import React, { useEffect } from 'react';

/**
 * Componente AlertaFlotante: Renderiza alertas de Bootstrap para informar sobre operaciones HTTP
 * y desaparece automáticamente o al hacer clic en cerrar.
 */
export default function AlertaFlotante({ alerta, onCerrar }) {
    if (!alerta) return null;

    const { tipo = 'info', mensaje, metodo } = alerta;

    return (
        <div
            className={`alert alert-${tipo} alert-dismissible fade show shadow-sm d-flex align-items-center justify-content-between mb-4 border-start border-${tipo} border-4`}
            role="alert"
        >
            <div className="d-flex align-items-center gap-2">
                {metodo && (
                    <span className="badge bg-dark font-monospace px-2 py-1">
                        {metodo}
                    </span>
                )}
                <i className={`bi ${tipo === 'success' ? 'bi-check-circle-fill' : tipo === 'danger' ? 'bi-exclamation-triangle-fill' : tipo === 'warning' ? 'bi-trash-fill' : 'bi-info-circle-fill'} fs-5`}></i>
                <span className="fw-medium">{mensaje}</span>
            </div>
            <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onCerrar}
            ></button>
        </div>
    );
}
