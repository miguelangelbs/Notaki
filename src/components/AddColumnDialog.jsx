import { IconButton } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { FormDialog } from "./FormDialog"

export const AddColumnDialog = ({ tableroId }) => {

    const { handleAgregarColumna } = useUser()

    return (
        <FormDialog
            trigger={
                <IconButton radius="full" size="4" variant="soft">
                    <PlusIcon width={24} height={24} />
                </IconButton>
            }
            tituloDialog="Nueva columna"
            textoConfirmar="Crear columna"
            onConfirmar={(titulo, color) => handleAgregarColumna(tableroId, titulo, color)}
        />
    )
}