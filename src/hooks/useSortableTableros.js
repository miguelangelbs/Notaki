import { arrayMove } from "@dnd-kit/sortable"
import { PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useUser } from "../context/UserContext"

export const useSortableTableros = () => {

    const { usuario, handleReordenarTableros } = useUser()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5
            }
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const oldIndex = usuario.tableros.findIndex(t => t.id === active.id)
        const newIndex = usuario.tableros.findIndex(t => t.id === over.id)

        const tablerosReordenados = arrayMove(usuario.tableros, oldIndex, newIndex)
        handleReordenarTableros(tablerosReordenados)
    }

    return { sensors, handleDragEnd }
}