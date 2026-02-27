import { useState } from "react"
import { Button, Dialog, Flex, IconButton, Text, TextField, Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { COLORS } from "../utils/colors"
import { useUser } from "../context/UserContext"
import { ColorPicker } from "./ColorPicker"

export const AddBoardDialog = () => {

    const { handleAgregarTablero } = useUser()
    const [dialogAbierto, setDialogAbierto] = useState(false)
    const [tituloTablero, setTituloTablero] = useState("")
    const [colorSeleccionado, setColorSeleccionado] = useState(COLORS[0].valor)

    const handleConfirmar = () => {
        if (!tituloTablero.trim()) return
        handleAgregarTablero(tituloTablero, colorSeleccionado)
        setTituloTablero("")
        setColorSeleccionado(COLORS[0].valor)
        setDialogAbierto(false)
    }

    return (
        <Dialog.Root open={dialogAbierto} onOpenChange={setDialogAbierto}>
            <Tooltip content="Añadir nuevo tablero">
                <Dialog.Trigger>
                    <IconButton radius="full" size="4">
                        <PlusIcon width={24} height={24} />
                    </IconButton>
                </Dialog.Trigger>
            </Tooltip>
            <Dialog.Content>
                <Dialog.Title>Nuevo tablero</Dialog.Title>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Nombre del tablero
                        </Text>
                        <TextField.Root
                            placeholder="Escribe un nombre..."
                            value={tituloTablero}
                            onChange={(e) => setTituloTablero(e.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Color
                        </Text>
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
                        <Button onClick={handleConfirmar}>Crear tablero</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}