export const formatearFecha = (fecha) => {
    if (!fecha) return ""
    const [anio, mes, dia] = fecha.split("-")
    return `${dia}-${mes}-${anio}`
}

export const obtenerEstadoFecha = (fechaLimite) => {
    if (!fechaLimite) return null

    const ahora = new Date()
    const fecha = new Date(fechaLimite)
    const diferencia = fecha - ahora
    const unDia = 24 * 60 * 60 * 1000

    if (diferencia < 0) return 'vencida'
    if (diferencia < unDia) return 'urgente'
    return 'normal'
}

export const contarTareasPorEstado = (tablero) => {
    let vencidas = 0
    let urgentes = 0

    tablero.columnas.forEach(columna => {
        columna.tareas.forEach(tarea => {
            const estado = obtenerEstadoFecha(tarea.fechaLimite)
            if (estado === 'vencida') vencidas++
            if (estado === 'urgente') urgentes++
        })
    })

    return { vencidas, urgentes }
}