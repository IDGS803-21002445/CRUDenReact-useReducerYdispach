// ============================================================================
// Servicio API: Integración con DummyJSON
// Métodos HTTP: GET, POST, PUT, DELETE
// ============================================================================

const BASE_URL = 'https://dummyjson.com';

/**
 * Petición GET: Obtiene la lista de usuarios/desarrolladores de DummyJSON
 * Incluye nombre, foto de avatar, email y departamento.
 */
export const obtenerUsuariosApi = async () => {
    try {
        const respuesta = await fetch(`${BASE_URL}/users?limit=10&select=firstName,lastName,email,image,company,role`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al obtener usuarios: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        
        // Mapeo limpio de los usuarios para la interfaz
        return data.users.map((u) => ({
            id: u.id,
            nombreCompleto: `${u.firstName} ${u.lastName}`,
            email: u.email,
            foto: u.image,
            cargo: u.company?.title || 'Desarrollador Software',
            departamento: u.company?.department || 'Ingeniería',
            rol: u.role || 'Colaborador'
        }));
    } catch (error) {
        console.error('Error en obtenerUsuariosApi:', error);
        throw error;
    }
};

/**
 * Petición GET: Obtiene tareas iniciales desde DummyJSON y las mapea al formato del tablero.
 */
export const obtenerTareasApi = async () => {
    try {
        const respuesta = await fetch(`${BASE_URL}/todos?limit=6`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al obtener tareas: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        return data.todos;
    } catch (error) {
        console.error('Error en obtenerTareasApi:', error);
        throw error;
    }
};

/**
 * Petición POST: Crea una nueva tarea en DummyJSON.
 * @param {Object} tarea - Datos de la tarea a registrar.
 */
export const crearTareaApi = async (tarea) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/todos/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: tarea.titulo,
                completed: tarea.estado === 'Completada',
                userId: tarea.responsable ? tarea.responsable.id : 1
            })
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP al crear tarea (POST): ${respuesta.status}`);
        }

        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error en crearTareaApi:', error);
        throw error;
    }
};

/**
 * Petición PUT: Actualiza una tarea existente en DummyJSON.
 * @param {number|string} id - ID de la tarea a actualizar.
 * @param {Object} tarea - Datos actualizados.
 */
export const actualizarTareaApi = async (id, tarea) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: tarea.titulo,
                completed: tarea.estado === 'Completada'
            })
        });

        if (!respuesta.ok) {
            // Nota: Si el id fue generado en el cliente (> 254), DummyJSON puede retornar 404
            // porque no existe en su base fija. Capturamos para simular con éxito.
            console.warn(`Aviso PUT DummyJSON: id ${id} no registrado en el servidor mock`);
        }

        const data = respuesta.ok ? await respuesta.json() : { id, ...tarea };
        return data;
    } catch (error) {
        console.error('Error en actualizarTareaApi:', error);
        throw error;
    }
};

/**
 * Petición DELETE: Elimina una tarea en DummyJSON.
 * @param {number|string} id - ID de la tarea a eliminar.
 */
export const eliminarTareaApi = async (id) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            console.warn(`Aviso DELETE DummyJSON: id ${id} simulado localmente`);
        }

        const data = respuesta.ok ? await respuesta.json() : { id, isDeleted: true };
        return data;
    } catch (error) {
        console.error('Error en eliminarTareaApi:', error);
        throw error;
    }
};
