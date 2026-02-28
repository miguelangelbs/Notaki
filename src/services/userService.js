import { v7 as uuidv7 } from "uuid"

/*Función que devuelve el ID de la cuenta invitado, 
de no existir un id, se devuelve un null*/
export const obtenerIdInvitado = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioInvitado'));
    return usuario?.id ?? null;
}

/*Función que devuelve la cuenta local de invitaod del localStorage*/
export const obtenerUsuarioInvitado = () => {
    return JSON.parse(localStorage.getItem('usuarioInvitado')) ?? null;
}

/*Función que se encarga de crear la cuenta de invitado con sus valores por defecto */
export const crearCuentaInvitado = () => {

    const idExistente = obtenerIdInvitado();
    if (idExistente) return JSON.parse(localStorage.getItem('usuarioInvitado'));

    const fechaActual = new Date().toISOString()

    const cuentaInvitado = {
        id: uuidv7(),
        nombre: "Invitado",
        email: null,
        esInvitado: true,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        theme: "dark",
        tableros: []
    }

    try {
        localStorage.setItem('usuarioInvitado', JSON.stringify(cuentaInvitado));
    } catch (error) {
        console.error('Error al guardar en localStorage', error);
    }

    return cuentaInvitado
}

/*Función encargada de actualizar el nombre de la cuenta local */
export const actualizarNombreInvitado = (nuevoNombre) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    usuario.nombre = nuevoNombre
    usuario.fechaModificacion = new Date().toISOString()

    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario
}

/*Función encargada de actualizar la preferencia del tema de la cuenta local */
export const actualizarPreferenciaTema = (modoPreferido) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;
    
    usuario.theme = modoPreferido
    localStorage.setItem('usuarioInvitado', JSON.stringify(usuario));
    return usuario
}

/*Función encargada de eliminar los datos de la cuenta local, limpiando el localStorage */
export const resetCuentaInvitado = () => {
    localStorage.clear()
    return crearCuentaInvitado()
}

export const agregarTablero = (titulo, color) => {
    const usuario = obtenerUsuarioInvitado();
    if (!usuario) return null;

    const fechaActual = new Date().toISOString()

    const nuevoTablero = {
        id: uuidv7(),
        usuarioId: usuario.id,
        titulo,
        color,
        posicion: usuario.tableros.length,
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        columnas: []
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