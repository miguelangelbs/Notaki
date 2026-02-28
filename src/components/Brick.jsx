import { Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import "../styles/Brick.css"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray" }) => {

    const navigate = useNavigate()

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        transition: isDragging ? 'none' : 'transform 150ms ease',
        backgroundColor: `var(--${color}-9)`,
        cursor: isDragging ? 'grabbing' : 'grab'
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
            {...listeners}
            onClick={handleClick}
        >
            <Flex align="center" justify="between" mt="4" mb="4">
                <Text size="8" align="center" as="div" style={{ flex: 1 }}>
                    {titulo}
                </Text>
                <IconButton variant="ghost" radius="full" aria-label={`Editar ${titulo}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <GearIcon width={32} height={32} />
                </IconButton>
            </Flex>
        </Card>
    )
}
