import { Flex } from "@radix-ui/themes"
import { Brick } from "../components/Brick"
import { Navbar } from "../components/Navbar"
import { AdvertenciaDatos } from "../components/AdvertenciaDatos"
import { AddBoardDialog } from "../components/AddBoardDialog"
import { useUser } from "../context/UserContext"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"

export const Home = () => {

  const { usuario, handleReordenarTableros } = useUser()

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return

    const oldIndex = usuario.tableros.findIndex(t => t.id === active.id)
    const newIndex = usuario.tableros.findIndex(t => t.id === over.id)

    const tablerosReordenados = arrayMove(usuario.tableros, oldIndex, newIndex)
    handleReordenarTableros(tablerosReordenados)
  }

  const sensors = useSensors(
      useSensor(PointerSensor, {
          activationConstraint: {
              distance: 8
          }
      })
  )

  return (
    <>
      <Navbar />
      <AdvertenciaDatos />
      <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
        <DndContext 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
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