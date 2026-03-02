import { AlertDialog, Button, Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon, DragHandleDots2Icon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { useSortable } from '@dnd-kit/sortable'
import { useUser } from "../context/UserContext"
import { CSS } from '@dnd-kit/utilities'
import "../styles/Brick.css"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray" }) => {

    const navigate = useNavigate()

    const { handleEliminarTablero } = useUser()

    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: isDragging ? 'none' : 'transform 150ms ease',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: `var(--${color}-9)`,
    }

    const handleClick = () => {
        navigate(`/board/${id}`)
    }

    return (
        <Card
            className="brick-card"
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={handleClick}
        >
            <Flex align="center" justify="between" mt="4" mb="4">
                <Text size="8" align="center" as="div" style={{ flex: 1 }}>
                    {titulo}
                </Text>
                <Flex gap="2">
                    <IconButton
                        variant="ghost"
                        radius="full"
                        {...listeners}
                        onClick={(e) => e.stopPropagation()}
                        className={isDragging ? 'handle-dragging' : 'handle'}
                    >
                        <DragHandleDots2Icon width={32} height={32} />
                    </IconButton>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <IconButton
                                variant="ghost"
                                radius="full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <GearIcon width={32} height={32} />
                            </IconButton>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu.Item>Editar nombre</DropdownMenu.Item>
                            <DropdownMenu.Item>Cambiar color</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <AlertDialog.Root>
                                <AlertDialog.Trigger asChild>
                                    <DropdownMenu.Item color="red" onSelect={(e) => e.preventDefault()}>
                                        Eliminar
                                    </DropdownMenu.Item>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content>
                                    <AlertDialog.Title>Eliminar tablero</AlertDialog.Title>
                                    <AlertDialog.Description>
                                        ¿Estás seguro de que quieres eliminar el tablero "{titulo}"? Esta acción no se puede deshacer.
                                    </AlertDialog.Description>
                                    <Flex gap="3" mt="4" justify="end">
                                        <AlertDialog.Cancel>
                                            <Button variant="soft" color="gray">Cancelar</Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <Button color="red" onClick={() => handleEliminarTablero(id)}>Eliminar</Button>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </Card>
    )
}