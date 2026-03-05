import { Card, DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes"
import { Task } from "./Task"
import { useState } from "react"
import { DotsVerticalIcon, DragHandleDots2Icon } from "@radix-ui/react-icons"
import { EditColumnDialog } from "./EditColumnDialog"
import { AddTaskDialog } from "./AddTaskDialog"
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
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
            {...attributes}
            style={{
                ...style,
                minHeight: 'calc(100vh - 160px)',
                width: 'max-content',
                position: 'relative',
                maxWidth: '500px',
                minWidth: '300px',
                backgroundColor: `var(--${color}-9)`
            }}
        >
            <Flex direction="column" gap="3">
                <Flex justify="center" align="center" style={{ position: 'relative' }}>
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
                        {...listeners}
                        style={{
                            paddingRight: '40px',
                            paddingLeft: '40px',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            touchAction: 'none',
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    >
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
                <SortableContext
                    id={id}
                    items={tareas.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Flex direction="column" gap="2">
                        {tareas.map((tarea) =>
                            <Task
                                key={tarea.id}
                                id={tarea.id}
                                tableroId={tableroId}
                                columnaId={id}
                                titulo={tarea.titulo}
                                descripcion={tarea.descripcion}
                                fechaLimite={tarea.fechaLimite}
                                color={tarea.color}
                            />
                        )}
                    </Flex>
                </SortableContext>
                <Flex justify="center" mt="2">
                    <AddTaskDialog tableroId={tableroId} columnaId={id} />
                </Flex>
            </Flex>
        </Card>
    )
}