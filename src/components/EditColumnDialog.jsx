import { AlertDialog, Button, DropdownMenu, Flex } from "@radix-ui/themes"
import { useUser } from "../context/UserContext"
import { FormDialog } from "./FormDialog"

export const EditColumnDialog = ({ tableroId, id, titulo, color, onClose }) => {

    const { handleEliminarColumna, handleEditarColumna } = useUser()

    return (
        <>
            <FormDialog
                trigger={
                    <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
                        Editar columna
                    </DropdownMenu.Item>
                }
                titulo={titulo}
                color={color}
                tituloDialog="Editar columna"
                textoConfirmar="Guardar cambios"
                onConfirmar={(nuevoTitulo, nuevoColor) => {
                    handleEditarColumna(tableroId, id, nuevoTitulo, nuevoColor)
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
                    <AlertDialog.Title align="center">Eliminar columna</AlertDialog.Title>
                    <AlertDialog.Description align="center">
                        ¿Estás seguro de que quieres eliminar la columna "{titulo}"? {<br />} Esta acción no se puede deshacer.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="center">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">Cancelar</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={() => handleEliminarColumna(tableroId, id)}>Eliminar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}