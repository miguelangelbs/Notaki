import { AlertDialog, Button, DropdownMenu, Flex } from "@radix-ui/themes"
import { useUser } from "../context/UserContext"
import { BoardFormDialog } from "./BoardFormDialog"

export const EditBoardDialog = ({ id, titulo, color, onClose }) => {

    const { handleEliminarTablero, handleEditarTablero } = useUser()

    return (
        <>
            <BoardFormDialog
                trigger={
                    <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
                        Editar tablero
                    </DropdownMenu.Item>
                }
                titulo={titulo}
                color={color}
                tituloDialog="Editar tablero"
                textoConfirmar="Guardar cambios"
                onConfirmar={(nuevoTitulo, nuevoColor) => { 
                    handleEditarTablero(id, nuevoTitulo, nuevoColor)
                    onClose()
                }}
            />
            <DropdownMenu.Separator />
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <DropdownMenu.Item color="red" onSelect={(e) => e.preventDefault()}>
                        Eliminar
                    </DropdownMenu.Item>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="3">
                    <AlertDialog.Title align="center">Eliminar tablero</AlertDialog.Title>
                    <AlertDialog.Description align="center">
                        ¿Estás seguro de que quieres eliminar el tablero "{titulo}"? {<br />} Esta acción no se puede deshacer.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="center">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">Cancelar</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={() => handleEliminarTablero(id)}>Eliminar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}