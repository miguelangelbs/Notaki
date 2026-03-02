import { IconButton, Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { BoardFormDialog } from "./BoardFormDialog"

export const AddBoardDialog = () => {

    const { handleAgregarTablero } = useUser()

    return (
        <Tooltip content="Añadir nuevo tablero">
            <BoardFormDialog
                trigger={
                    <IconButton radius="full" size="4">
                        <PlusIcon width={24} height={24} />
                    </IconButton>
                }
                tituloDialog="Nuevo tablero"
                textoConfirmar="Crear tablero"
                onConfirmar={(titulo, color) => handleAgregarTablero(titulo, color)}
            />
        </Tooltip>
    )
}