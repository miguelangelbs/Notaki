import { Flex, IconButton } from "@radix-ui/themes"
import { Tooltip } from "@radix-ui/themes"
import { MoonIcon, PlusIcon, SunIcon, PersonIcon } from "@radix-ui/react-icons"
import { Brick } from "../components/Brick"


export const Home = ( {theme, toggleTheme} ) => {
  return (
    <>
        <Flex gap="2" as="div" justify="end">
          <Tooltip content="Cambiar tema">
            <IconButton variant="ghost" radius="full" onClick={toggleTheme}>
              {
                theme === "dark" ?
                  <MoonIcon width={26} height={26} /> :
                  <SunIcon width={26} height={26} />
              }
            </IconButton>
          </Tooltip>

          <Tooltip content="Ajustes de cuenta">
            <IconButton variant="ghost" radius="full">
              <PersonIcon width={26} height={26} />
            </IconButton>
          </Tooltip>
        </Flex>

        <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
          <Brick></Brick>
          <Brick></Brick>
          <Brick></Brick>
          <Brick></Brick>
          <Brick></Brick>

          <Flex justify="center" mt="3">
            <Tooltip content="Añadir nuevo tablero">
              <IconButton radius="full" size="4">
                <PlusIcon width={24} height={24} />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
    </>
  )
}

export default Home
