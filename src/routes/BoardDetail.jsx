import { Flex } from "@radix-ui/themes"
import { Column } from "../components/Column"
import { Navbar } from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useEffect } from "react"
import { MAX_COLUMNAS } from "../utils/constants"
import { AddColumnDialog } from "../components/AddColumnDialog"
import { useSortableColumnas } from "../hooks/useSortableroColumnas"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers"


export const BoardDetail = () => {

  const { id } = useParams()
  const { usuario } = useUser()

  const navigate = useNavigate()
  const tablero = usuario.tableros.find(t => t.id === id)

  const { sensors, handleDragEnd } = useSortableColumnas(tablero.id, tablero.columnas)


  useEffect(() => {
    if (!tablero) {
      navigate('/')
    }
  }, [tablero, navigate])

  if (!tablero) return null

  return (
    <>
      <Navbar showBackButton={true} />
      <Flex direction="row" gap="4" justify="center" align="start">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
        >
          <SortableContext items={tablero.columnas.map(c => c.id)} strategy={horizontalListSortingStrategy}>
            {tablero.columnas.map((columna) => (
              <Column
                key={columna.id}
                id={columna.id}
                tableroId={tablero.id}
                titulo={columna.titulo}
                color={columna.color}
                tareas={columna.tareas}
              />
            ))}
          </SortableContext>
        </DndContext>
        {tablero.columnas.length < MAX_COLUMNAS && (
          <Flex align="center" style={{ minHeight: 'calc(100vh - 160px)' }}>
            <AddColumnDialog tableroId={tablero.id} />
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default BoardDetail