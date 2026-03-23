export const formatearFecha = (fecha) => {
    if (!fecha) return ""
    const [anio, mes, dia] = fecha.split("-")
    return `${dia}-${mes}-${anio}`
}