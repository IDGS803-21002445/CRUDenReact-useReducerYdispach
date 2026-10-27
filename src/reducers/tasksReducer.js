// ============================================================================
// Reducer: Manejo centralizado del estado con la técnica useReducer + dispatch
// Cumple con la rúbrica del Parcial 2 (IDGS1003)
// ============================================================================

export const tareasEstadoInicial = {
    tareas: [],
    usuarios: [],
    loading: false,
    error: null,
    alerta: null, // { tipo: 'success'|'danger'|'warning'|'info', mensaje: string, metodo: string }
    tareaEnEdicion: null, // null = crear nueva, objeto = editar existente
    tareaSeleccionada: null, // Objeto para visualizar con el ojito (👁️)
    modalFormAbierto: false,
    modalVerAbierto: false,
};

// Tipos de acciones formales
export const TIPOS_ACCIONES = {
    FETCH_INICIO: 'FETCH_INICIO',
    FETCH_EXITO: 'FETCH_EXITO',
    FETCH_ERROR: 'FETCH_ERROR',
    AGREGAR_TAREA: 'AGREGAR_TAREA',
    ACTUALIZAR_TAREA: 'ACTUALIZAR_TAREA',
    ELIMINAR_TAREA: 'ELIMINAR_TAREA',
    CAMBIAR_ESTADO_TAREA: 'CAMBIAR_ESTADO_TAREA',
    ABRIR_MODAL_CREAR: 'ABRIR_MODAL_CREAR',
    ABRIR_MODAL_EDITAR: 'ABRIR_MODAL_EDITAR',
    CERRAR_MODAL_FORM: 'CERRAR_MODAL_FORM',
    ABRIR_MODAL_VER: 'ABRIR_MODAL_VER',
    CERRAR_MODAL_VER: 'CERRAR_MODAL_VER',
    MOSTRAR_ALERTA: 'MOSTRAR_ALERTA',
    LIMPIAR_ALERTA: 'LIMPIAR_ALERTA',
};

/**
 * Función Reducer pura que gestiona las transiciones de estado
 * según la acción recibida por el dispatch.
 */
export function tareasReducer(state, action) {
    switch (action.type) {
        case TIPOS_ACCIONES.FETCH_INICIO:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case TIPOS_ACCIONES.FETCH_EXITO:
            return {
                ...state,
                loading: false,
                tareas: action.payload.tareas,
                usuarios: action.payload.usuarios,
                error: null,
            };

        case TIPOS_ACCIONES.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                alerta: {
                    tipo: 'danger',
                    mensaje: `Error en la petición: ${action.payload}`,
                    metodo: 'GET',
                },
            };

        case TIPOS_ACCIONES.AGREGAR_TAREA:
            return {
                ...state,
                tareas: [action.payload, ...state.tareas],
                modalFormAbierto: false,
                alerta: {
                    tipo: 'success',
                    mensaje: `¡Tarea "${action.payload.titulo}" creada con éxito en la API!`,
                    metodo: 'POST',
                },
            };

        case TIPOS_ACCIONES.ACTUALIZAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.map((t) =>
                    t.id === action.payload.id ? action.payload : t
                ),
                tareaEnEdicion: null,
                modalFormAbierto: false,
                alerta: {
                    tipo: 'primary',
                    mensaje: `¡Tarea #${action.payload.id} actualizada correctamente mediante PUT!`,
                    metodo: 'PUT',
                },
            };

        case TIPOS_ACCIONES.ELIMINAR_TAREA:
            const tareaEliminada = state.tareas.find((t) => t.id === action.payload);
            return {
                ...state,
                tareas: state.tareas.filter((t) => t.id !== action.payload),
                alerta: {
                    tipo: 'warning',
                    mensaje: `Tarea eliminada exitosamente del servidor (DELETE).`,
                    metodo: 'DELETE',
                },
            };

        case TIPOS_ACCIONES.CAMBIAR_ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareas.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, estado: action.payload.nuevoEstado };
                    }
                    return item;
                }),
                alerta: {
                    tipo: 'info',
                    mensaje: `Estado actualizado a "${action.payload.nuevoEstado}" con éxito.`,
                    metodo: 'PATCH',
                },
            };

        case TIPOS_ACCIONES.ABRIR_MODAL_CREAR:
            return {
                ...state,
                tareaEnEdicion: null,
                modalFormAbierto: true,
            };

        case TIPOS_ACCIONES.ABRIR_MODAL_EDITAR:
            return {
                ...state,
                tareaEnEdicion: action.payload,
                modalFormAbierto: true,
            };

        case TIPOS_ACCIONES.CERRAR_MODAL_FORM:
            return {
                ...state,
                tareaEnEdicion: null,
                modalFormAbierto: false,
            };

        case TIPOS_ACCIONES.ABRIR_MODAL_VER:
            return {
                ...state,
                tareaSeleccionada: action.payload,
                modalVerAbierto: true,
            };

        case TIPOS_ACCIONES.CERRAR_MODAL_VER:
            return {
                ...state,
                tareaSeleccionada: null,
                modalVerAbierto: false,
            };

        case TIPOS_ACCIONES.MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload,
            };

        case TIPOS_ACCIONES.LIMPIAR_ALERTA:
            return {
                ...state,
                alerta: null,
            };

        default:
            return state;
    }
}
