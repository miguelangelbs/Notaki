import { ArrowLeftIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons"
import { Flex, IconButton, Tooltip } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

export const Navbar = ({ showBackButton = false }) => {

    const { theme, handleActualizarTema } = useUser()
    const navigate = useNavigate()

    const abrirAjustes = () => {
        console.log("Ajustes usuario")
    }

    return (
        <Flex gap="2" as="div" justify={showBackButton ? "between" : "end"} p="2">
            {showBackButton && (
                <IconButton variant="ghost" radius="full" onClick={() => navigate("/")}>
                    <ArrowLeftIcon width={26} height={26} />
                </IconButton>
            )}
            <Flex gap="2" as="div" justify="end">
                <Tooltip content="Cambiar tema">
                    <IconButton variant="ghost" radius="full" onClick={handleActualizarTema}>
                        {theme === "dark" ?
                            <MoonIcon width={26} height={26} /> :
                            <SunIcon width={26} height={26} />
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip content="Ajustes de cuenta">
                    <IconButton variant="ghost" radius="full" onClick={abrirAjustes}>
                        <PersonIcon width={26} height={26} />
                    </IconButton>
                </Tooltip>
            </Flex>
        </Flex>
    )
}