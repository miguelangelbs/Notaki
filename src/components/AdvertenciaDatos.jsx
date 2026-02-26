import { Callout, Flex } from "@radix-ui/themes"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useUser } from "../context/UserContext"

export const AdvertenciaDatos = () => {
    const { usuario } = useUser()
    return usuario?.esInvitado && (
        <Flex justify="center">
            <Callout.Root color="red" role="alert" style={{ display: 'inline-flex' }}>
                <Callout.Icon>
                    <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text>
                    Estás usando una cuenta de invitado. Crea una cuenta para que tus tableros no sean eliminados.
                </Callout.Text>
            </Callout.Root>
        </Flex>
    )
}