import { Callout, Flex } from "@radix-ui/themes"
import { Brick } from "../components/Brick"
import { Navbar } from "../components/Navbar"
import { AdvertenciaDatos } from "../components/AdvertenciaDatos"
import { AddBoardDialog } from "../components/AddBoardDialog"
import { useUser } from "../context/UserContext"
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers"
import { useSortableTableros } from "../hooks/useSortableTableros"
import { MAX_TABLEROS } from '../utils/constants'
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"

const Home = () => {

  const { usuario } = useUser()
  const { sensors, handleDragEnd: handleDragEndTableros } = useSortableTableros()
  const [activoBrick, setActivoBrick] = useState(null)

  const handleDragStart = (event) => {
    const { active } = event
    const brick = usuario.tableros.find(t => t.id === active.id)
    if (brick) setActivoBrick(brick)
  }

  const handleDragEnd = (event) => {
    setActivoBrick(null)
    handleDragEndTableros(event)
  }

  return (
    <>
      <Navbar />
      <AdvertenciaDatos />
      <Flex direction="column" gap="4" maxWidth="780px" mx="auto" p="4">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={usuario.tableros.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {usuario.tableros.map((tablero) => (
              <Brick
                key={tablero.id}
                id={tablero.id}
                titulo={tablero.titulo}
                color={tablero.color}
                tablero={tablero}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activoBrick && (
              <Brick
                id={activoBrick.id}
                titulo={activoBrick.titulo}
                color={activoBrick.color}
                tablero={activoBrick}
              />
            )}
          </DragOverlay>
        </DndContext>
        {usuario.tableros.length < MAX_TABLEROS ? (
          <Flex justify="center" mt="3">
            <AddBoardDialog />
          </Flex>
        ) : (
          <Flex justify="center" mt="3">
            <Callout.Root color="gray">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Has alcanzado el límite de {MAX_TABLEROS} tableros
              </Callout.Text>
            </Callout.Root>
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default Home