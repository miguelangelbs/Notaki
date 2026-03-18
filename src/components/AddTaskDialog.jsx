import { IconButton } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { TaskFormDialog } from "./TaskFormDialog"

export const AddTaskDialog = ({ tableroId, columnaId, onEditandoChange }) => {

    const { handleAgregarTarea } = useUser()

    return (
        <TaskFormDialog
            trigger={
                <IconButton radius="full" size="2" variant="ghost">
                    <PlusIcon width={20} height={20} />
                </IconButton>
            }
            tituloDialog="Nueva tarea"
            textoConfirmar="Crear tarea"
            onConfirmar={(titulo, descripcion, fechaLimite, color) => 
                handleAgregarTarea(tableroId, columnaId, titulo, descripcion, fechaLimite, color)
            }
            onEditandoChange={onEditandoChange}
        />
    )
}