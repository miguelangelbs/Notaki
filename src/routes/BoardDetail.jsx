import { Flex, Heading } from "@radix-ui/themes"
import { Column } from "../components/Column"
import { Navbar } from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useEffect, useState } from "react"
import { MAX_COLUMNAS } from "../utils/constants"
import { AddColumnDialog } from "../components/AddColumnDialog"
import { useSortableColumnas } from "../hooks/useSortableroColumnas"
import { useSortableTareas } from "../hooks/useSortableTareas"
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"


export const BoardDetail = () => {

  const { id } = useParams()
  const { usuario } = useUser()

  const navigate = useNavigate()
  const tablero = usuario.tableros.find(t => t.id === id)

  const [columnasLocales, setColumnasLocales] = useState(tablero?.columnas ?? [])

  useEffect(() => {
    if (tablero) setColumnasLocales(tablero.columnas)
  }, [tablero])

  useEffect(() => {
    if (!tablero) navigate('/')
  }, [tablero, navigate])

  const { sensors, handleDragEnd: handleDragEndColumnas } = useSortableColumnas(tablero?.id, columnasLocales, setColumnasLocales)
  const { handleDragEnd: handleDragEndTareas } = useSortableTareas(tablero?.id, columnasLocales, setColumnasLocales)

  if (!tablero) return null

  const handleDragEnd = (event) => {
    const { active } = event
    const esColumna = columnasLocales.some(c => c.id === active.id)
    if (esColumna) {
      handleDragEndColumnas(event)
    } else {
      handleDragEndTareas(event)
    }
  }

  return (
    <>
      <Navbar showBackButton={true} />
      <Flex direction="column" gap="4" p="4">
        <Heading size="9" align="center" mb="4">{tablero.titulo}</Heading>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={columnasLocales.map(c => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <Flex direction="row" gap="4" justify="center" align="start">
              {columnasLocales.map((columna) => (
                <Column
                  key={columna.id}
                  id={columna.id}
                  tableroId={tablero.id}
                  titulo={columna.titulo}
                  color={columna.color}
                  tareas={columna.tareas}
                />
              ))}
              {columnasLocales.length < MAX_COLUMNAS && (
                <Flex align="center" style={{ minHeight: 'calc(100vh - 160px)' }}>
                  <AddColumnDialog tableroId={tablero.id} />
                </Flex>
              )}
            </Flex>
          </SortableContext>
        </DndContext>
      </Flex>
    </>
  )
}

export default BoardDetail