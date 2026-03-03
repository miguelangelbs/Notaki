import { v7 as uuidv7 } from "uuid";
import { obtenerUsuarioInvitado } from "./userService";

/*Función encargada de agregar un nuevo tablero en el localStorage,
con un título y color correspondiente */
export const agregarTablero = (titulo, color) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const fechaActual = new Date().toISOString()
    const tableroId = uuidv7()

    const columnasDefault = [
        { titulo: "Pendientes", posicion: 0 },
        { titulo: "En Proceso", posicion: 1 },
        { titulo: "Completadas", posicion: 2 }
    ].map(columna => ({
        id: uuidv7(),
        tableroId,
        titulo: columna.titulo,
        posicion: columna.posicion,
        color: color,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        tareas: []
    }))

    const nuevoTablero = {
        id: tableroId,
        usuarioId: usuario.id,
        titulo,
        color,
        posicion: usuario.tableros.length,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        columnas: columnasDefault
    }

    usuario.tableros.push(nuevoTablero);
    usuario.fechaModificacion = fechaActual;
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

/*Función encargada de reordenar la posición de los tableros en el localStorage, todo
esto mediante el Drag&Drop */
export const reordenarTableros = (tablerosReordenados) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    usuario.tableros = tablerosReordenados.map((tablero, index) => ({
        ...tablero,
        posicion: index
    }))

    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

/*Función encargada de eliminar un tablero específico del localStorage */
export const eliminarTablero = (tableroId) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    usuario.tableros = usuario.tableros.filter(t => t.id !== tableroId);
    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

/*Función encargada de editar el título y color de un tablero específico */
export const editarTablero = (tableroId, nuevoTitulo, nuevoColor) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    usuario.tableros = usuario.tableros.map(tablero => 
        tablero.id === tableroId 
            ? { ...tablero, titulo: nuevoTitulo, color: nuevoColor, fechaModificacion: new Date().toISOString() }
            : tablero
    )

    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}