import { Flex } from "@radix-ui/themes"
import { Brick } from "../components/Brick"
import { Navbar } from "../components/Navbar"
import { AdvertenciaDatos } from "../components/AdvertenciaDatos"
import { AddBoardDialog } from "../components/AddBoardDialog"
import { useUser } from "../context/UserContext"

export const Home = () => {

  const { usuario } = useUser()

  return (
    <>
      <Navbar />
      <AdvertenciaDatos />
      <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
        {usuario.tableros.map((tablero) => (
          <Brick
            key={tablero.id}
            id={tablero.id}
            titulo={tablero.titulo}
            color={tablero.color}
          />
        ))}
        <Flex justify="center" mt="3">
          <AddBoardDialog />
        </Flex>
      </Flex>
    </>
  )
}

export default Home