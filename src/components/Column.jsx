import { Card, Flex, Text } from "@radix-ui/themes"
import { Task } from "./Task"

export const Column = ( {titulo, tareas} ) => {
    return (
    <Card>
        <Flex direction="column" gap="3">
            <Text size="5" weight="bold">
                {titulo}
            </Text>
            <Flex direction="column" gap="2">
                {tareas.map((tarea) =>
                    <Task key={tarea.id} {...tarea}/>
                )}
            </Flex>
        </Flex>
    </Card>
  )
}