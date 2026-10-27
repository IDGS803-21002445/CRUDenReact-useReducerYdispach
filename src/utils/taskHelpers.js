// ============================================================================
// Funciones lógicas con argumentos (Requisitos académicos)
// ============================================================================

export const obtenerColorPrioridad = (prioridad) => {
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

export const formatearFolio = (modulo, id) => {
    const prefijo = modulo || "TSK";
    const idCadena = String(id).padStart(3, "0");
    return `[${prefijo}-${idCadena}]`;
};

export const calcularPorcentajeAvance = (completadas, total) => {
    if (total === 0) return 0;
    return Math.round((completadas / total) * 100);
};

export const obtenerColorEstado = (estado) => {
    if (estado === "Completada") {
        return "badge bg-success";
    } else if (estado === "En progreso") {
        return "badge bg-primary";
    }
    return "badge bg-secondary";
};

export const filtrarTareasPorEstado = (lista, filtro) => {
    if (!lista) return [];
    if (filtro === "Todas") {
        return lista;
    }
    return lista.filter((item) => item.estado === filtro);
};
