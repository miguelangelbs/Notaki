import { v7 as uuidv7 } from "uuid"

export const obtenerIdInvitado= () => {
    return localStorage.getItem('invitadoActualId')
}

export const crearCuentaInvitado = () => {

    const idExistente = obtenerIdInvitado()
    if (idExistente) return JSON.parse(localStorage.getItem(`usuario_${idExistente}`))

    const fechaActual = new Date().toISOString()

    const cuentaInvitado = {
        id: uuidv7(),
        nombre: "Invitado",
        fechaCreacion: fechaActual,
        fechaModificacion: fechaActual,
        theme: "dark",
        tableros: []
    }

    try {
        localStorage.setItem('invitadoActualId', cuentaInvitado.id)
        localStorage.setItem(`usuario_${cuentaInvitado.id}`, JSON.stringify(cuentaInvitado))
    } catch (error) {
        console.error('Error al guardar en localStorage', error)
    }

    return cuentaInvitado
}

export const actualizarNombreInvitado = (nuevoNombre) => {
    const idActual = obtenerIdInvitado()
    const usuario = JSON.parse(localStorage.getItem(`usuario_${idActual}`))

    if (!idActual || !usuario) return null

    usuario.nombre = nuevoNombre
    usuario.fechaModificacion = new Date().toISOString()

    localStorage.setItem(`usuario_${idActual}`, JSON.stringify(usuario))
    return usuario

}

export const actualizarPreferenciaTema = (modoPreferido) => {
    const idActual = obtenerIdInvitado()
    const usuario = JSON.parse(localStorage.getItem(`usuario_${idActual}`))

    if (!idActual || !usuario) return null

    usuario.theme = modoPreferido
    localStorage.setItem(`usuario_${idActual}`, JSON.stringify(usuario))
    return usuario
}


export const resetCuentaInvitado = () => {
    localStorage.clear()
    return crearCuentaInvitado()
}