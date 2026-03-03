import { Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon, DragHandleDots2Icon, DragHandleDots1Icon, DragHandleHorizontalIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EditBoardDialog } from "./EditBoardDialog"
import "../styles/Brick.css"
import { useState } from "react"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray" }) => {

    const navigate = useNavigate()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const [menuAbierto, setMenuAbierto] = useState(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        scale: isDragging ? '1.02' : '1',
        boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
        backgroundColor: `var(--${color}-9)`,
        zIndex: isDragging ? 999 : 'auto',
    }

    return (
        <Card
            className="brick-card"
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={() => navigate(`/board/${id}`)}
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
                        <DragHandleHorizontalIcon width={32} height={32} />
                    </IconButton>

                    <DropdownMenu.Root open={menuAbierto} onOpenChange={setMenuAbierto}>
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
                            <EditBoardDialog id={id} titulo={titulo} color={color} onClose={() => setMenuAbierto(false)}/>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </Card>
    )
}