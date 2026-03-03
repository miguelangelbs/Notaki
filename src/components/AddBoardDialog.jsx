import { IconButton, Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { FormDialog } from "./FormDialog"

export const AddBoardDialog = () => {

    const { handleAgregarTablero } = useUser()

    return (
        <FormDialog
            trigger={
                <Tooltip content="Añadir nuevo tablero">
                    <IconButton radius="full" size="4">
                        <PlusIcon width={24} height={24} />
                    </IconButton>
                </Tooltip>
            }
            tituloDialog="Nuevo tablero"
            textoConfirmar="Crear tablero"
            onConfirmar={(titulo, color) => handleAgregarTablero(titulo, color)}
        />
    )
}