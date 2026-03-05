import { v7 as uuidv7 } from "uuid"
import { obtenerUsuarioInvitado } from "./userService"

const obtenerTableroYColumna = (usuario, tableroId, columnaId) => {
    const tablero = usuario.tableros.find(t => t.id === tableroId);
    if (!tablero) return null;
    const columna = tablero.columnas.find(c => c.id === columnaId);
    if (!columna) return null;
    return { tablero, columna };
}

export const agregarTarea = (tableroId, columnaId, titulo, descripcion, fechaLimite, color) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const resultado = obtenerTableroYColumna(usuario, tableroId, columnaId);
    if (!resultado) return null;

    const { columna } = resultado;
    const fechaActual = new Date().toISOString();

    const nuevaTarea = {
        id: uuidv7(),
        columnaId,
        titulo,
        descripcion,
        fechaLimite: fechaLimite ?? null,
        color,
        posicion: columna.tareas.length,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual
    }

    columna.tareas.push(nuevaTarea);
    usuario.fechaModificacion = fechaActual;
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

export const editarTarea = (tableroId, columnaId, tareaId, nuevoTitulo, nuevaDescripcion, nuevaFechaLimite, nuevoColor) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const resultado = obtenerTableroYColumna(usuario, tableroId, columnaId);
    if (!resultado) return null;

    const { columna } = resultado;

    columna.tareas = columna.tareas.map(tarea =>
        tarea.id === tareaId
            ? { 
                ...tarea, 
                titulo: nuevoTitulo, 
                descripcion: nuevaDescripcion,
                fechaLimite: nuevaFechaLimite ?? null,
                color: nuevoColor,
                fechaModificacion: new Date().toISOString() 
            }
            : tarea
    )

    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

export const eliminarTarea = (tableroId, columnaId, tareaId) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const resultado = obtenerTableroYColumna(usuario, tableroId, columnaId);
    if (!resultado) return null;

    const { columna } = resultado;

    columna.tareas = columna.tareas.filter(t => t.id !== tareaId);
    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

export const reordenarTareas = (tableroId, columnaId, tareasReordenadas) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const resultado = obtenerTableroYColumna(usuario, tableroId, columnaId);
    if (!resultado) return null;

    const { columna } = resultado;

    columna.tareas = tareasReordenadas.map((tarea, index) => ({
        ...tarea,
        posicion: index
    }))

    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}