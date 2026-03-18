import { AlertDialog, Button, Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"
import { EditTaskDialog } from "./EditTaskDialog"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const Task = ({ id, tableroId, columnaId, titulo = "Nombre Ejemplo", descripcion = "Descripción", fechaLimite = null, color = "gray" }) => {

    const { handleEliminarTarea } = useUser()
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [editandoActivo, setEditandoActivo] = useState(false)

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
        id,
        disabled: editandoActivo
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 'auto',
    }

    const handleEditandoChange = (abierto) => {
        setEditandoActivo(abierto)
    }

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                ...style,
                position: "relative",
                backgroundColor: `var(--${color}-9)`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <DropdownMenu.Root open={menuAbierto} onOpenChange={setMenuAbierto}>
                <DropdownMenu.Trigger asChild>
                    <IconButton size="2" variant="ghost" radius="full"
                        style={{ position: "absolute", top: 8, right: 8 }}
                        aria-label="Más opciones"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DotsVerticalIcon />
                    </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content onClick={(e) => e.stopPropagation()}>
                    <EditTaskDialog
                        id={id}
                        tableroId={tableroId}
                        columnaId={columnaId}
                        titulo={titulo}
                        descripcion={descripcion}
                        fechaLimite={fechaLimite}
                        color={color}
                        onClose={() => setMenuAbierto(false)}
                        onEditandoChange={handleEditandoChange}
                    />
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