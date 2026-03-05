import { arrayMove } from "@dnd-kit/sortable"
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useUser } from "../context/UserContext"

export const useSortableColumnas = (tableroId, columnas, setColumnasLocales) => {

    const { handleReordenarColumnas } = useUser()

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
        if (active.id === over.id) return

        const oldIndex = columnas.findIndex(c => c.id === active.id)
        const newIndex = columnas.findIndex(c => c.id === over.id)

        if (oldIndex === -1 || newIndex === -1) return

        const columnasReordenadas = arrayMove(columnas, oldIndex, newIndex)
        setColumnasLocales(columnasReordenadas)
        handleReordenarColumnas(tableroId, columnasReordenadas)
    }

    return { sensors, handleDragEnd }
}