import { Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { Task } from "./Task"
import { useState } from "react"
import { DotsVerticalIcon, GearIcon } from "@radix-ui/react-icons"
import { EditColumnDialog } from "./EditColumnDialog"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const Column = ({ id, tableroId, titulo, color, tareas = [] }) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const [menuAbierto, setMenuAbierto] = useState(false)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 'auto',
    }

    return (
        <Card 
            ref={setNodeRef}
            style={{ 
            ...style,
            minHeight: 'calc(100vh - 160px)',
            width: 'max-content', 
            position: 'relative',
            maxWidth: '500px',
            minWidth: '300px',
            backgroundColor: `var(--${color}-9)`
            }}>
            <Flex direction="column" gap="3">
                <Flex justify="center" align="center" style={{ position: 'relative' }}>
                    <Text 
                        size="8" 
                        weight="bold" 
                        align="center" 
                        {...listeners}
                        style={{ 
                            paddingRight: '40px', 
                            paddingLeft: '40px',
                            underSelect: 'none',
                            cursor: isDragging ? 'grabbing' : 'grab' }}>
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