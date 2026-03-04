import { arrayMove } from "@dnd-kit/sortable"
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { useUser } from "../context/UserContext"

export const useSortableColumnas = (tableroId, columnas) => {

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

        const columnasReordenadas = arrayMove(columnas, oldIndex, newIndex)
        handleReordenarColumnas(tableroId, columnasReordenadas)
    }

    return { sensors, handleDragEnd }
}