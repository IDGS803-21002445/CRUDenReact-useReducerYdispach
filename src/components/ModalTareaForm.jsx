import React, { useState, useEffect } from 'react';

/**
 * Componente ModalTareaForm: Formulario en modal con validación de campos
 * Permite tanto la creación (POST) como la edición (PUT) de tareas.
 */
export default function ModalTareaForm({
    abierto,
    tareaEnEdicion,
    usuarios,
    onGuardar,
    onCerrar
}) {
    const estadoInicial = {
        titulo: '',
        modulo: 'DEV',
        usuarioId: '',
        prioridad: 'Media',
        estado: 'Pendiente',
        horasEstimadas: 2,
        descripcion: ''
    };

    const [formValues, setFormValues] = useState(estadoInicial);
    const [errores, setErrores] = useState({});
    const [tocado, setTocado] = useState({});

    // Sincronizar formulario si se abre para editar o para crear
    useEffect(() => {
        if (tareaEnEdicion) {
            setFormValues({
                titulo: tareaEnEdicion.titulo || '',
                modulo: tareaEnEdicion.modulo || 'DEV',
                usuarioId: tareaEnEdicion.responsable?.id ? String(tareaEnEdicion.responsable.id) : '',
                prioridad: tareaEnEdicion.prioridad || 'Media',
                estado: tareaEnEdicion.estado || 'Pendiente',
                horasEstimadas: tareaEnEdicion.horasEstimadas || 2,
                descripcion: tareaEnEdicion.descripcion || ''
            });
        } else {
            // Asignar primer usuario por defecto si hay usuarios disponibles
            setFormValues({
                ...estadoInicial,
                usuarioId: usuarios.length > 0 ? String(usuarios[0].id) : ''
            });
        }
        setErrores({});
        setTocado({});
    }, [tareaEnEdicion, abierto, usuarios]);

    if (!abierto) return null;

    // Validación de campos individuales
    const validarCampos = (valores) => {
        const nuevosErrores = {};

        if (!valores.titulo || valores.titulo.trim().length < 5) {
            nuevosErrores.titulo = 'El título es obligatorio y debe tener al menos 5 caracteres.';
        }

        if (!valores.modulo) {
            nuevosErrores.modulo = 'Debes seleccionar un módulo.';
        }

        if (!valores.usuarioId) {
            nuevosErrores.usuarioId = 'Debes seleccionar un desarrollador responsable.';
        }

        if (!valores.prioridad) {
            nuevosErrores.prioridad = 'Selecciona el nivel de prioridad.';
        }

        if (!valores.estado) {
            nuevosErrores.estado = 'Selecciona el estado inicial.';
        }

        if (!valores.horasEstimadas || Number(valores.horasEstimadas) <= 0) {
            nuevosErrores.horasEstimadas = 'Las horas estimadas deben ser un número mayor a 0.';
        }

        if (!valores.descripcion || valores.descripcion.trim().length < 10) {
            nuevosErrores.descripcion = 'La descripción es obligatoria y debe tener al menos 10 caracteres.';
        }

        return nuevosErrores;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nuevosValores = { ...formValues, [name]: value };
        setFormValues(nuevosValores);

        // Validación en tiempo real si el campo ya fue tocado
        if (tocado[name]) {
            const erroresValidacion = validarCampos(nuevosValores);
            setErrores(erroresValidacion);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTocado({ ...tocado, [name]: true });
        const erroresValidacion = validarCampos(formValues);
        setErrores(erroresValidacion);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validarCampos(formValues);
        setErrores(erroresValidacion);
        setTocado({
            titulo: true,
            modulo: true,
            usuarioId: true,
            prioridad: true,
            estado: true,
            horasEstimadas: true,
            descripcion: true
        });

        if (Object.keys(erroresValidacion).length === 0) {
            // Buscar datos del desarrollador seleccionado de DummyJSON
            const desarrolladorSeleccionado = usuarios.find(
                (u) => String(u.id) === String(formValues.usuarioId)
            );

            const payloadTarea = {
                titulo: formValues.titulo.trim(),
                modulo: formValues.modulo,
                prioridad: formValues.prioridad,
                estado: formValues.estado,
                horasEstimadas: Number(formValues.horasEstimadas),
                descripcion: formValues.descripcion.trim(),
                responsable: desarrolladorSeleccionado || null
            };

            onGuardar(payloadTarea);
        }
    };

    // Desarrollador actualmente seleccionado para previsualización
    const usuarioSeleccionado = usuarios.find(
        (u) => String(u.id) === String(formValues.usuarioId)
    );

    const esEdicion = Boolean(tareaEnEdicion);

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow border-0">
                    <div className={`modal-header ${esEdicion ? 'bg-primary' : 'bg-success'} text-white`}>
                        <div className="d-flex align-items-center gap-2">
                            <i className={`bi ${esEdicion ? 'bi-pencil-square' : 'bi-plus-circle-fill'} fs-5`}></i>
                            <h5 className="modal-title fw-bold mb-0">
                                {esEdicion ? `Editar Tarea #${tareaEnEdicion.id} (PUT)` : 'Nueva Tarea de Desarrollo (POST)'}
                            </h5>
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={onCerrar}
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="modal-body p-4">
                            {/* Fila 1: Título y Módulo */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-8">
                                    <label htmlFor="titulo" className="form-label fw-semibold">
                                        Título del Requerimiento <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        className={`form-control ${errores.titulo ? 'is-invalid' : tocado.titulo ? 'is-valid' : ''}`}
                                        placeholder="Ej. Implementar autenticación JWT"
                                        value={formValues.titulo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errores.titulo && (
                                        <div className="invalid-feedback">{errores.titulo}</div>
                                    )}
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="modulo" className="form-label fw-semibold">
                                        Módulo / Área <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="modulo"
                                        name="modulo"
                                        className={`form-select ${errores.modulo ? 'is-invalid' : ''}`}
                                        value={formValues.modulo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="ARQ">ARQ (Arquitectura)</option>
                                        <option value="VITE">VITE (Tooling)</option>
                                        <option value="UI">UI (Diseño & Bootstrap)</option>
                                        <option value="JS">JS (Lógica React)</option>
                                        <option value="API">API (Integración REST)</option>
                                        <option value="TEST">TEST (Pruebas)</option>
                                        <option value="BUILD">BUILD (Despliegue)</option>
                                    </select>
                                    {errores.modulo && (
                                        <div className="invalid-feedback">{errores.modulo}</div>
                                    )}
                                </div>
                            </div>

                            {/* Fila 2: Desarrollador Responsable (DummyJSON) con previsualización */}
                            <div className="mb-3 p-3 bg-light rounded border">
                                <label htmlFor="usuarioId" className="form-label fw-semibold d-flex align-items-center justify-content-between">
                                    <span>
                                        <i className="bi bi-people-fill text-primary me-1"></i> 
                                        Desarrollador Asignado (Consumido de DummyJSON API) <span className="text-danger">*</span>
                                    </span>
                                    <span className="badge bg-secondary font-monospace small">API Externa</span>
                                </label>
                                <select
                                    id="usuarioId"
                                    name="usuarioId"
                                    className={`form-select ${errores.usuarioId ? 'is-invalid' : ''}`}
                                    value={formValues.usuarioId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">-- Selecciona un desarrollador --</option>
                                    {usuarios.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.nombreCompleto} — {u.cargo} ({u.email})
                                        </option>
                                    ))}
                                </select>
                                {errores.usuarioId && (
                                    <div className="invalid-feedback d-block">{errores.usuarioId}</div>
                                )}

                                {/* Preview de la foto y datos del usuario seleccionado */}
                                {usuarioSeleccionado && (
                                    <div className="d-flex align-items-center gap-3 mt-3 pt-2 border-top">
                                        <img
                                            src={usuarioSeleccionado.foto}
                                            alt={usuarioSeleccionado.nombreCompleto}
                                            className="rounded-circle border border-primary border-2 shadow-sm"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <p className="mb-0 fw-bold text-dark">{usuarioSeleccionado.nombreCompleto}</p>
                                            <small className="text-muted">
                                                {usuarioSeleccionado.email} | <span className="badge bg-info text-dark">{usuarioSeleccionado.departamento}</span>
                                            </small>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Fila 3: Prioridad, Estado y Horas */}
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="prioridad" className="form-label fw-semibold">
                                        Prioridad <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="prioridad"
                                        name="prioridad"
                                        className="form-select"
                                        value={formValues.prioridad}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="Alta">Alta (Urgente)</option>
                                        <option value="Media">Media (Normal)</option>
                                        <option value="Baja">Baja (Mantenimiento)</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="estado" className="form-label fw-semibold">
                                        Estado <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        id="estado"
                                        name="estado"
                                        className="form-select"
                                        value={formValues.estado}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="Pendiente">⏳ Pendiente</option>
                                        <option value="En progreso">🚀 En progreso</option>
                                        <option value="Completada">✔ Completada</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="horasEstimadas" className="form-label fw-semibold">
                                        Horas Estimadas <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="horasEstimadas"
                                        name="horasEstimadas"
                                        min="1"
                                        max="100"
                                        className={`form-control ${errores.horasEstimadas ? 'is-invalid' : ''}`}
                                        value={formValues.horasEstimadas}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errores.horasEstimadas && (
                                        <div className="invalid-feedback">{errores.horasEstimadas}</div>
                                    )}
                                </div>
                            </div>

                            {/* Fila 4: Descripción */}
                            <div className="mb-2">
                                <label htmlFor="descripcion" className="form-label fw-semibold">
                                    Descripción Detallada <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    rows="3"
                                    className={`form-control ${errores.descripcion ? 'is-invalid' : tocado.descripcion ? 'is-valid' : ''}`}
                                    placeholder="Explica detalladamente el requerimiento técnico o criterios de aceptación..."
                                    value={formValues.descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></textarea>
                                {errores.descripcion && (
                                    <div className="invalid-feedback">{errores.descripcion}</div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer bg-light">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onCerrar}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className={`btn ${esEdicion ? 'btn-primary' : 'btn-success'} fw-bold px-4`}
                            >
                                <i className={`bi ${esEdicion ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                                {esEdicion ? 'Guardar Cambios (PUT)' : 'Crear Tarea (POST)'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
