import { Flex, IconButton } from "@radix-ui/themes"
import { Tooltip } from "@radix-ui/themes"
import { PlusIcon } from "@radix-ui/react-icons"
import { Brick } from "../components/Brick"
import { Navbar } from "../components/Navbar"


export const Home = ( {theme, toggleTheme} ) => {

  const agregarBrick = () => {
    console.log("Prueba")
  }

  return (
    <>

      <Navbar theme={theme} toggleTheme={toggleTheme}/>

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
