import { AlertDialog, Button, Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"

export const Task = ({ id, tableroId, columnaId, titulo = "Nombre Ejemplo", descripcion = "Descripción", fechaLimite = null, color = "gray" }) => {

    const { handleEliminarTarea } = useUser()

    return (
        <Card style={{ position: "relative", backgroundColor: `var(--${color}-9)` }}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <IconButton size="2" variant="ghost" radius="full"
                        style={{ position: "absolute", top: 8, right: 8 }}
                        aria-label="Más opciones"
                    >
                        <DotsVerticalIcon />
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item>Editar tarea</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <DropdownMenu.Item color="red" onSelect={(e) => e.preventDefault()}>
                                Eliminar
                            </DropdownMenu.Item>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content size="3">
                            <AlertDialog.Title align="center">Eliminar tarea</AlertDialog.Title>
                            <AlertDialog.Description align="center">
                                ¿Estás seguro de que quieres eliminar la tarea "{titulo}"? {<br />} Esta acción no se puede deshacer.
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="center">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">Cancelar</Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button color="red" onClick={() => handleEliminarTarea(tableroId, columnaId, id)}>Eliminar</Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            <Text as="div" weight="bold" size="6" mb="3">{titulo}</Text>
            <Text as="div" mb="3">{descripcion}</Text>
            {fechaLimite && (
                <Text as="div" size="2" color="gray">{fechaLimite}</Text>
            )}
        </Card>
    )
}