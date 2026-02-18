import { Card, Flex, IconButton, Text } from "@radix-ui/themes"
import { GearIcon } from "@radix-ui/react-icons"

export const Brick = ({titulo = "Titulo Ejemplo"}) => {
    return (
        <Card style={{ position: "relative" }}>
            <Flex align="center" justify="between" mt="4" mb="4">
                <Text size="8" align="center" as="div" style={ {flex: 1}} >
                    {titulo}
                </Text>

                <IconButton variant="ghost" radius="full" aria-label={`Editar ${titulo}`}>
                    <GearIcon width={32} height={32}/>
                </IconButton>
            </Flex>
        </Card>
    )
}
