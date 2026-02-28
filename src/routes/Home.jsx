import { Flex } from "@radix-ui/themes"
import { Brick } from "../components/Brick"
import { Navbar } from "../components/Navbar"
import { AdvertenciaDatos } from "../components/AdvertenciaDatos"
import { AddBoardDialog } from "../components/AddBoardDialog"
import { useUser } from "../context/UserContext"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useSortableTableros } from "../hooks/useSortableTableros"

export const Home = () => {

  const { usuario } = useUser()
  const { sensors, handleDragEnd } = useSortableTableros()

  return (
    <>
      <Navbar />
      <AdvertenciaDatos />
      <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext items={usuario.tableros.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {usuario.tableros.map((tablero) => (
              <Brick
                key={tablero.id}
                id={tablero.id}
                titulo={tablero.titulo}
                color={tablero.color}
              />
            ))}
          </SortableContext>
        </DndContext>
        <Flex justify="center" mt="3">
          <AddBoardDialog />
        </Flex>
      </Flex>
    </>
  )
}

export default Home