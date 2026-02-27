import { Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import "../styles/Brick.css"

export const Brick = ({ id, titulo = "Titulo Ejemplo", color = "gray" }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/board/${id}`)
    }

    return (
        <Card className="brick-card"
        onClick={handleClick}
        style={{ backgroundColor: `var(--${color}-9)` }}
        >
            <Flex align="center" justify="between" mt="4" mb="4">
                <Text size="8" align="center" as="div" style={ {flex: 1}} >
                    {titulo}
                </Text>

                <IconButton variant="ghost" radius="full" aria-label={`Editar ${titulo}`}
                onClick={(e) => e.stopPropagation()}
                >
                    <GearIcon width={32} height={32}/>
                </IconButton>
            </Flex>
        </Card>
    )
}
