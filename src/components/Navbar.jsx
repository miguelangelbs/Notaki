import { ArrowLeftIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Dialog, DropdownMenu, Flex, IconButton, Text, TextField, Tooltip } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { useUser } from "../context/UserContext"

export const Navbar = ({ showBackButton = false }) => {

    const { usuario, theme, handleActualizarTema, handleActualizarNombre, handleResetCuenta } = useUser()
    const navigate = useNavigate()

    const [openDialogNombre, setOpenDialogNombre] = useState(false)
    const [openAlertEliminar, setOpenAlertEliminar] = useState(false)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const ignorarCierreMenu = useRef(false)

    // Controlar apertura del menú evitando cierre durante cambio de tema
    const handleOpenChange = (open) => {
        if (ignorarCierreMenu.current) {
            ignorarCierreMenu.current = false
            return
        }
        setMenuAbierto(open)
    }

    const handleToggleTema = () => {
        ignorarCierreMenu.current = true
        handleActualizarTema()
    }

    const [nombreEditado, setNombreEditado] = useState(usuario?.nombre || "")

    const abrirDialogNombre = () => {
        setNombreEditado(usuario?.nombre || "")
        setOpenDialogNombre(true)
    }

    const guardarNombre = () => {
        if (nombreEditado.trim()) {
            handleActualizarNombre(nombreEditado.trim())
            setOpenDialogNombre(false)
        }
    }

    const handleIniciarSesion = () => {
        console.log("Iniciar sesión - funcionalidad pendiente")
    }

    const handleEliminarDatos = () => {
        handleResetCuenta()
        setOpenAlertEliminar(false)
    }

    return (
        <Flex gap="2" as="div" justify={showBackButton ? "between" : "end"} p="2">
            {showBackButton && (
                <IconButton variant="ghost" radius="full" onClick={() => navigate("/")}>
                    <ArrowLeftIcon width={26} height={26} />
                </IconButton>
            )}
            <Flex gap="2" as="div" justify="end">
                <DropdownMenu.Root open={menuAbierto} onOpenChange={handleOpenChange}>
                    <DropdownMenu.Trigger asChild>
                        <IconButton variant="ghost" radius="full">
                            <PersonIcon width={26} height={26} />
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item disabled>
                            <Text as="p" weight="q">{usuario?.nombre || "Usuario"}</Text>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item onSelect={(e) => e.preventDefault()} onClick={handleToggleTema}>
                            {theme === "dark" ? "Modo claro ☀️" : "Modo oscuro 🌙"}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={(e) => e.preventDefault()} onClick={abrirDialogNombre}>
                            Cambiar Nombre
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item onSelect={(e) => e.preventDefault()} onClick={handleIniciarSesion}>
                            Iniciar sesión
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="red" onClick={() => setOpenAlertEliminar(true)}>
                            Eliminar datos locales
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>

            {/* Dialog para cambiar nombre */}
            <Dialog.Root open={openDialogNombre} onOpenChange={setOpenDialogNombre}>
                <Dialog.Content>
                    <Dialog.Title>Cambiar Nombre</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Ingresa tu nuevo nombre de usuario.
                    </Dialog.Description>
                    <Flex direction="column" gap="3">
                        <label>
                            <TextField.Root 
                                value={nombreEditado} 
                                onChange={(e) => setNombreEditado(e.target.value)}
                                placeholder="Tu nombre"
                            />
                        </label>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancelar
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={guardarNombre}>
                                Guardar
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

            {/* AlertDialog para eliminar datos */}
            <AlertDialog.Root open={openAlertEliminar} onOpenChange={setOpenAlertEliminar}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Eliminar datos locales</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        ¿Estás seguro de que quieres eliminar todos los datos locales? Esta acción no se puede deshacer.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancelar
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={handleEliminarDatos}>
                                Eliminar
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Flex>
    )
}
