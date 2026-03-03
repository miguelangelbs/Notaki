import { useState } from "react"
import { Button, Dialog, Em, Flex, Text, TextField } from "@radix-ui/themes"
import { COLORS } from "../utils/colors"
import { ColorPicker } from "./ColorPicker"

export const FormDialog = ({
    trigger,
    titulo = "",
    color = COLORS[0].valor,
    tituloDialog = "Nuevo tablero",
    textoConfirmar = "Crear tablero",
    onConfirmar
}) => {

    const [tituloTablero, setTituloTablero] = useState(titulo)
    const [colorSeleccionado, setColorSeleccionado] = useState(color)

    const handleOpenChange = (abierto) => {
        if (abierto) {
            setTituloTablero(titulo)
            setColorSeleccionado(color)
        }
    }

    const handleConfirmar = () => {
        if (!tituloTablero.trim()) return
        onConfirmar(tituloTablero, colorSeleccionado)
    }

    return (
        <Dialog.Root onOpenChange={handleOpenChange}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>{tituloDialog}</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text size="2" color="gray" >
                            <Em>El nombre puede ser de 10 carácteres como máximo</Em>
                        </Text>
                        <TextField.Root
                            placeholder="Escribe un nombre para el tablero..."
                            value={tituloTablero}
                            onChange={(e) => setTituloTablero(e.target.value)}
                            maxLength={11}
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