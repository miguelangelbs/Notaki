import { useState } from "react"
import { Button, Dialog, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import { COLORS } from "../utils/colors"
import { ColorPicker } from "./ColorPicker"

const MIN_DATE = new Date().toISOString().split('T')[0]

export const TaskFormDialog = ({
    trigger,
    titulo = "",
    descripcion = "",
    fechaLimite = "",
    color = COLORS[0].valor,
    tituloDialog = "Nueva tarea",
    textoConfirmar = "Crear tarea",
    onConfirmar,
    onEditandoChange
}) => {

    const [tituloTarea, setTituloTarea] = useState(titulo)
    const [descripcionTarea, setDescripcionTarea] = useState(descripcion)
    const [fechaLimiteTarea, setFechaLimiteTarea] = useState(fechaLimite)
    const [colorSeleccionado, setColorSeleccionado] = useState(color)
    const [tituloError, setTituloError] = useState("")
    const [descripcionError, setDescripcionError] = useState("")

    const handleOpenChange = (abierto) => {
        if (onEditandoChange) {
            onEditandoChange(abierto)
        }
        if (abierto) {
            setTituloTarea(titulo)
            setDescripcionTarea(descripcion)
            setFechaLimiteTarea(fechaLimite)
            setColorSeleccionado(color)
            setTituloError("")
            setDescripcionError("")
        }
    }

    const handleConfirmar = (e) => {
        let hayError = false
        
        if (!tituloTarea.trim()) {
            setTituloError("El título es obligatorio")
            hayError = true
        } else {
            setTituloError("")
        }
        
        if (!descripcionTarea.trim()) {
            setDescripcionError("La descripción es obligatoria")
            hayError = true
        } else {
            setDescripcionError("")
        }
        
        if (hayError) {
            e.preventDefault()
            return
        }
        
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
                    <label htmlFor="titulo-tarea">
                        <Text as="div" size="2" mb="1" weight="bold">Título</Text>
                        <TextField.Root
                            id="titulo-tarea"
                            placeholder="Escribe un título..."
                            value={tituloTarea}
                            onChange={(e) => {
                                setTituloTarea(e.target.value)
                                setTituloError("")
                            }}
                            maxLength={50}
                            style={tituloError ? { borderColor: "red" } : {}}
                        />
                        {tituloError && <Text color="red" size="2">{tituloError}</Text>}
                    </label>
                    <label htmlFor="descripcion-tarea">
                        <Text as="div" size="2" mb="1" weight="bold">Descripción</Text>
                        <TextArea
                            id="descripcion-tarea"
                            placeholder="Escribe una descripción..."
                            value={descripcionTarea}
                            onChange={(e) => {
                                setDescripcionTarea(e.target.value)
                                setDescripcionError("")
                            }}
                            maxLength={200}
                            style={descripcionError ? { borderColor: "red" } : {}}
                        />
                        {descripcionError && <Text color="red" size="2">{descripcionError}</Text>}
                    </label>
                    <label htmlFor="fecha-tarea">
                        <Text as="div" size="2" mb="1" weight="bold">
                            Fecha límite <Text color="gray">(opcional)</Text>
                        </Text>
                        <TextField.Root
                            id="fecha-tarea"
                            type="date"
                            value={fechaLimiteTarea}
                            min={MIN_DATE}
                            onChange={(e) => setFechaLimiteTarea(e.target.value)}
                        />
                    </label>
                    <label htmlFor="color-tarea">
                        <Text as="div" size="2" mb="1" weight="bold">Color</Text>
                        <ColorPicker
                            id="color-tarea"
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