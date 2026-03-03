import { IconButton, Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { FormDialog } from "./FormDialog"

export const AddColumnDialog = ({ tableroId }) => {

    const { handleAgregarColumna } = useUser()

    return (
        <Tooltip content="Añadir nueva columna">
            <FormDialog
                trigger={
                    <IconButton radius="full" size="4">
                        <PlusIcon width={24} height={24} />
                    </IconButton>
                }
                tituloDialog="Nueva columna"
                textoConfirmar="Crear columna"
                onConfirmar={(titulo, color) => handleAgregarColumna(tableroId, titulo, color)}
            />
        </Tooltip>
    )
}