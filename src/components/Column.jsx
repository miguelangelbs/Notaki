import { Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { Task } from "./Task"
import { useState } from "react"
import { DotsVerticalIcon, GearIcon } from "@radix-ui/react-icons"
import { EditColumnDialog } from "./EditColumnDialog"

export const Column = ({ id, tableroId, titulo, color, tareas = [] }) => {

    const [menuAbierto, setMenuAbierto] = useState(false)

    return (
        <Card style={{ 
            minHeight: 'calc(100vh - 160px)',
            width: 'max-content', 
            position: 'relative',
            maxWidth: '500px',
            minWidth: '300px',
            backgroundColor: `var(--${color}-9)`
            }}>
            <Flex direction="column" gap="3">
                <Flex justify="center" align="center" style={{ position: 'relative' }}>
                    <Text size="8" weight="bold" align="center" style={{ paddingRight: '40px', paddingLeft: '40px' }}>
                        {titulo}
                    </Text>
                    <DropdownMenu.Root open={menuAbierto} onOpenChange={setMenuAbierto}>
                        <DropdownMenu.Trigger asChild>
                            <IconButton
                                variant="ghost"
                                radius="full"
                                size="1"
                                style={{ position: 'absolute', right: 0 }}
                            >
                                <DotsVerticalIcon width={28} height={28} />
                            </IconButton>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content onClick={(e) => e.stopPropagation()}>
                            <EditColumnDialog
                                tableroId={tableroId}
                                id={id}
                                titulo={titulo}
                                color={color}
                                onClose={() => setMenuAbierto(false)}
                            />
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex direction="column" gap="2">
                    {tareas.map((tarea) =>
                        <Task key={tarea.id} {...tarea} />
                    )}
                </Flex>
            </Flex>
        </Card>
    )
}