import { Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon, DragHandleDots2Icon, ExclamationTriangleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EditBoardDialog } from "./EditBoardDialog"
import "../styles/Brick.css"
import { useState } from "react"
import { contarTareasPorEstado } from "../utils/dateUtils"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray", tablero }) => {

    const navigate = useNavigate()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const [menuAbierto, setMenuAbierto] = useState(false)

    const { vencidas, urgentes } = tablero ? contarTareasPorEstado(tablero) : { vencidas: 0, urgentes: 0 }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        backgroundColor: `var(--${color}-9)`,
        zIndex: isDragging ? 999 : 'auto',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
    }

    return (
        <Card
            className="brick-card"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => navigate(`/board/${id}`)}
        >
            <Flex align="center" justify="between" mt="4" mb="4" style={{ position: 'relative' }}>
                <DragHandleDots2Icon
                    width={20}
                    height={20}
                    style={{
                        position: 'absolute',
                        left: 0,
                        opacity: 0.4,
                        pointerEvents: 'none'
                    }}
                />
                <Text
                    size="8"
                    weight="bold"                    
                    align="center"
                    as="div"
                    className="brick-titulo"
                    style={{ flex: 1}}
                >
                    {titulo}
                </Text>
                <Flex
                    align="center"
                    gap="3"
                    style={{ position: 'absolute', right: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {(vencidas > 0 || urgentes > 0) && (
                        <Flex direction="column" gap="1">
                            {vencidas > 0 && (
                                <Flex align="center" gap="1">
                                    <CrossCircledIcon color="red" width={24} height={24} />
                                    <Text size="4" style={{ color: 'red' }}>{vencidas}</Text>
                                </Flex>
                            )}
                            {urgentes > 0 && (
                                <Flex align="center" gap="1">
                                    <ExclamationTriangleIcon color="yellow" width={24} height={24} />
                                    <Text size="4" style={{ color: 'yellow' }}>{urgentes}</Text>
                                </Flex>
                            )}
                        </Flex>
                    )}
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
                            <EditBoardDialog id={id} titulo={titulo} color={color} onClose={() => setMenuAbierto(false)} />
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </Flex>
        </Card>
    )
}