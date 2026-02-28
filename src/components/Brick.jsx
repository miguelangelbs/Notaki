import { Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon, DragHandleDots2Icon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import "../styles/Brick.css"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray" }) => {

    const navigate = useNavigate()

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

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
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <DragHandleDots2Icon width={32} height={32} />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        radius="full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <GearIcon width={32} height={32} />
                    </IconButton>
                </Flex>
            </Flex>
        </Card>
    )
}