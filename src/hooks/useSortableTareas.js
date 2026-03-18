import { arrayMove } from "@dnd-kit/sortable"
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useUser } from "../context/UserContext"

export const useSortableTareas = (tableroId, columnas, setColumnasLocales) => {

    const { handleReordenarTareas, handleMoverTarea } = useUser()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) return

        const tareaId = active.id
        const columnaOrigenId = active.data.current?.sortable?.containerId
        if (!columnaOrigenId) return

        let columnaDestinoId = null

        const columnaConTarea = columnas.find(c => 
            c.id === over.id ? (columnaDestinoId = over.id, true) : c.tareas.some(t => t.id === over.id)
        )
        if (!columnaDestinoId) {
            columnaDestinoId = columnaConTarea?.id ?? null
        }

        if (!columnaDestinoId) return

        if (columnaOrigenId === columnaDestinoId) {
            const columna = columnas.find(c => c.id === columnaOrigenId)
            if (!columna) return

            const oldIndex = columna.tareas.findIndex(t => t.id === tareaId)
            const newIndex = columna.tareas.findIndex(t => t.id === over.id)
            if (oldIndex === newIndex) return

            const tareasReordenadas = arrayMove(columna.tareas, oldIndex, newIndex)

            // Actualizar estado local inmediatamente
            setColumnasLocales(columnas.map(c =>
                c.id === columnaOrigenId ? { ...c, tareas: tareasReordenadas } : c
            ))
            handleReordenarTareas(tableroId, columnaOrigenId, tareasReordenadas)

        } else {
            const columnaOrigen = columnas.find(c => c.id === columnaOrigenId)
            const columnaDestino = columnas.find(c => c.id === columnaDestinoId)
            if (!columnaOrigen || !columnaDestino) return

            const tarea = columnaOrigen.tareas.find(t => t.id === tareaId)
            if (!tarea) return

            const nuevaPosicion = columnaDestino.tareas.findIndex(t => t.id === over.id)
            const posicionFinal = nuevaPosicion === -1 ? columnaDestino.tareas.length : nuevaPosicion

            // Actualizar estado local inmediatamente
            const nuevasColumnas = columnas.map(c => {
                if (c.id === columnaOrigenId) {
                    return { ...c, tareas: c.tareas.filter(t => t.id !== tareaId) }
                }
                if (c.id === columnaDestinoId) {
                    const nuevasTareas = [...c.tareas]
                    nuevasTareas.splice(posicionFinal, 0, { ...tarea, columnaId: columnaDestinoId })
                    return { ...c, tareas: nuevasTareas }
                }
                return c
            })

            setColumnasLocales(nuevasColumnas)
            handleMoverTarea(tableroId, columnaOrigenId, columnaDestinoId, tareaId, posicionFinal)
        }
    }

    return { sensors, handleDragEnd }
}