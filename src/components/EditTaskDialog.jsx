import { AlertDialog, Button, DropdownMenu, Flex } from "@radix-ui/themes"
import { useUser } from "../context/UserContext"
import { TaskFormDialog } from "./TaskFormDialog"

export const EditTaskDialog = ({ id, tableroId, columnaId, titulo, descripcion, fechaLimite, color, onClose }) => {

    const { handleEditarTarea } = useUser()

    return (
        <>
            <TaskFormDialog
                trigger={
                    <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
                        Editar tarea
                    </DropdownMenu.Item>
                }
                titulo={titulo}
                descripcion={descripcion}
                fechaLimite={fechaLimite ?? ""}
                color={color}
                tituloDialog="Editar tarea"
                textoConfirmar="Guardar cambios"
                onConfirmar={(nuevoTitulo, nuevaDescripcion, nuevaFechaLimite, nuevoColor) => {
                    handleEditarTarea(tableroId, columnaId, id, nuevoTitulo, nuevaDescripcion, nuevaFechaLimite, nuevoColor)
                    onClose()
                }}
            />
        </>
    )
}