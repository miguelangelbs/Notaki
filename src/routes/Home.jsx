import { Flex, IconButton } from "@radix-ui/themes"
import { Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { Brick, } from "../components/Brick"
import { Navbar } from "../components/Navbar"
import { AdvertenciaDatos } from "../components/AdvertenciaDatos"
import { obtenerUsuarioInvitado } from "../services/userService"
import { useState } from "react"

export const Home = ({ theme, toggleTheme }) => {

  const [usuario, setUsuario] = useState(() => obtenerUsuarioInvitado());

  const handleActualizarNombre = (nuevoNombre) => {
    const usuarioActualizado = actualizarNombreInvitado(nuevoNombre);
    setUsuario(usuarioActualizado);
  }

  const handleActualizarTema = (modoPreferido) => {
    const usuarioActualizado = actualizarPreferenciaTema(modoPreferido);
    setUsuario(usuarioActualizado);
  }

  const handleResetCuenta = () => {
    const nuevaCuenta = resetCuentaInvitado();
    setUsuario(nuevaCuenta);
  }

  const agregarBrick = () => {
    console.log("Prueba")
  }

  return (
    <>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <AdvertenciaDatos usuario={usuario}></AdvertenciaDatos>
      <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
        <Brick id="1"></Brick>

        <Flex justify="center" mt="3">
          <Tooltip content="Añadir nuevo tablero">
            <IconButton radius="full" size="4" onClick={agregarBrick}>
              <PlusIcon width={24} height={24} />
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
