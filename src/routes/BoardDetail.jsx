import { Flex } from "@radix-ui/themes"
import { Column } from "../components/Column"
import data from "../utils/data.json"
import { Navbar } from "../components/Navbar"

export const BoardDetail = ( {theme, toggleTheme} ) => {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} showBackButton={true}/>
      <Flex direction="row" gap="4" p="4" justify="center" align="center">
        <Column titulo={"Pendientes"} tareas={data}></Column>
        <Column titulo={"En proceso"} tareas={data}></Column>
        <Column titulo={"Completadas"} tareas={data}></Column>
      </Flex>
    </>

  )
}

export default BoardDetail