import { obtenerUsuarioInvitado } from "./userService";
import { v7 as uuidv7 } from "uuid";

/*Función encargada de agregar una nueva columna a su respectivo tablero,
con un título y color correspondiente */
export const agregarColumna = (tableroId, titulo, color) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const tablero = usuario.tableros.find(t => t.id === tableroId);
    if (!tablero) return null;

    const fechaActual = new Date().toISOString();

    const nuevaColumna = {
        id: uuidv7(),
        tableroId,
        titulo,
        color,
        posicion: tablero.columnas.length,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        tareas: []
    }

    tablero.columnas.push(nuevaColumna);
    usuario.fechaModificacion = fechaActual;
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;

}

/*Función encargada de eliminar una columna de un tablero específico */
export const eliminarColumna = (tableroId, columnaId) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const tablero = usuario.tableros.find(t => t.id === tableroId);
    if (!tablero) return null;

    tablero.columnas = tablero.columnas.filter(c => c.id !== columnaId);
    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;
}

/*Función encargada de editar el título y color de una columna de un tablero específico */
export const editarColumna = (tableroId, columnaId, nuevoTitulo, nuevoColor) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const tablero = usuario.tableros.find(t => t.id === tableroId);
    if (!tablero) return null;

    tablero.columnas = tablero.columnas.map(columna =>
        columna.id === columnaId
        ? {...columna, titulo: nuevoTitulo, color: nuevoColor, fechaModificacion: new Date().toISOString()}
        : columna
    )

    usuario.fechaModificacion = new Date().toISOString();
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario;

}