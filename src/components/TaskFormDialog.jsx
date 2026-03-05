import { useState } from "react"
import { Button, Dialog, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import { COLORS } from "../utils/colors"
import { ColorPicker } from "./ColorPicker"

export const TaskFormDialog = ({
    trigger,
    titulo = "",
    descripcion = "",
    fechaLimite = "",
    color = COLORS[0].valor,
    tituloDialog = "Nueva tarea",
    textoConfirmar = "Crear tarea",
    onConfirmar
}) => {

    const [tituloTarea, setTituloTarea] = useState(titulo)
    const [descripcionTarea, setDescripcionTarea] = useState(descripcion)
    const [fechaLimiteTarea, setFechaLimiteTarea] = useState(fechaLimite)
    const [colorSeleccionado, setColorSeleccionado] = useState(color)

    const handleOpenChange = (abierto) => {
        if (abierto) {
            setTituloTarea(titulo)
            setDescripcionTarea(descripcion)
            setFechaLimiteTarea(fechaLimite)
            setColorSeleccionado(color)
        }
    }

    const handleConfirmar = () => {
        if (!tituloTarea.trim()) return
        if (!descripcionTarea.trim()) return
        if (!colorSeleccionado) return
        onConfirmar(tituloTarea, descripcionTarea, fechaLimiteTarea || null, colorSeleccionado)
    }

    return (
        <Dialog.Root onOpenChange={handleOpenChange}>
            <Dialog.Trigger>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>{tituloDialog}</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">Título</Text>
                        <TextField.Root
                            placeholder="Escribe un título..."
                            value={tituloTarea}
                            onChange={(e) => setTituloTarea(e.target.value)}
                            maxLength={50}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">Descripción</Text>
                        <TextArea
                            placeholder="Escribe una descripción..."
                            value={descripcionTarea}
                            onChange={(e) => setDescripcionTarea(e.target.value)}
                            maxLength={200}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Fecha límite <Text color="gray">(opcional)</Text>
                        </Text>
                        <TextField.Root
                            type="date"
                            value={fechaLimiteTarea}
                            onChange={(e) => setFechaLimiteTarea(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">Color</Text>
                        <ColorPicker
                            colorSeleccionado={colorSeleccionado}
                            onColorSeleccionado={setColorSeleccionado}
                        />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">Cancelar</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleConfirmar}>{textoConfirmar}</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}