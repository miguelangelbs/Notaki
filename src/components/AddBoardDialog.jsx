import { IconButton } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { FormDialog } from "./FormDialog"

export const AddBoardDialog = () => {

    const { handleAgregarTablero } = useUser()

    return (
        <FormDialog
            trigger={
                <IconButton radius="full" size="4" variant="soft">
                    <PlusIcon width={32} height={32} />
                </IconButton>
            }
            tituloDialog="Nuevo tablero"
            textoConfirmar="Crear tablero"
            onConfirmar={(titulo, color) => handleAgregarTablero(titulo, color)}
        />
    )
}