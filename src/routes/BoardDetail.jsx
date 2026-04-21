import { Flex, Heading, Callout } from "@radix-ui/themes"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Column } from "../components/Column"
import { Navbar } from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useEffect, useState } from "react"
import { MAX_COLUMNAS } from "../utils/constants"
import { AddColumnDialog } from "../components/AddColumnDialog"
import { useSortableColumnas } from "../hooks/useSortableroColumnas"
import { useSortableTareas } from "../hooks/useSortableTareas"
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { Task } from "../components/Task"

const BoardDetail = () => {

  const { id } = useParams()
  const { usuario } = useUser()

  const navigate = useNavigate()
  const tablero = usuario.tableros.find(t => t.id === id)

  const [columnasLocales, setColumnasLocales] = useState(tablero?.columnas ?? [])
  const [activoTarea, setActivoTarea] = useState(null)
  const [activaColumna, setActivaColumna] = useState(null)

  const { sensors, handleDragEnd: handleDragEndColumnas } = useSortableColumnas(tablero?.id, columnasLocales, setColumnasLocales)
  const { handleDragEnd: handleDragEndTareas } = useSortableTareas(tablero?.id, columnasLocales, setColumnasLocales)

  useEffect(() => {
    if (tablero) setColumnasLocales(tablero.columnas)
  }, [tablero])

  useEffect(() => {
    if (!tablero) navigate('/')
  }, [tablero, navigate])

  if (!tablero) return null

  const handleDragStart = (event) => {
    const { active } = event
    const esColumna = columnasLocales.some(c => c.id === active.id)
    if (esColumna) {
      const columna = columnasLocales.find(c => c.id === active.id)
      setActivaColumna(columna)
    } else {
      for (const columna of columnasLocales) {
        const tarea = columna.tareas.find(t => t.id === active.id)
        if (tarea) {
          setActivoTarea(tarea)
          break
        }
      }
    }
  }

  const handleDragEnd = (event) => {
    setActivoTarea(null)
    setActivaColumna(null)
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
      <Flex direction="column" p="4" style={{ height: 'calc(100vh - 60px)', overflowX: 'hidden', overflowY: 'auto' }}>
        <Heading size="9" align="center" mb="4">{tablero.titulo}</Heading>
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={columnasLocales.map(c => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <Flex
              direction="row"
              gap="4"
              align="start"
              className="board-detail-scroll"
              style={{
                overflow: 'auto',
                width: '100%',
                height: '100%',
                paddingBottom: '16px',
                boxSizing: 'border-box',
              }}
            >
              {columnasLocales.length === 0 ? (
                <Flex direction="column" gap="4" align="center" style={{ width: '100%' }}>
                  <Callout.Root color="gray">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                      Crea tu primera columna para empezar a organizar tus tareas
                    </Callout.Text>
                  </Callout.Root>
                  <AddColumnDialog tableroId={tablero.id} />
                </Flex>
              ) : (
                <>
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
                    <Flex align="center" style={{ minHeight: 'calc(100vh - 160px)', flexShrink: 0 }}>
                      <AddColumnDialog tableroId={tablero.id} />
                    </Flex>
                  )}
                </>
              )}
            </Flex>
          </SortableContext>
          <DragOverlay>
            {activaColumna && (
              <Column
                id={activaColumna.id}
                tableroId={tablero.id}
                titulo={activaColumna.titulo}
                color={activaColumna.color}
                tareas={activaColumna.tareas}
              />
            )}
            {activoTarea && (
              <Task
                id={activoTarea.id}
                titulo={activoTarea.titulo}
                descripcion={activoTarea.descripcion}
                fechaLimite={activoTarea.fechaLimite}
                color={activoTarea.color}
              />
            )}
          </DragOverlay>
        </DndContext>
      </Flex>
    </>
  )
}

export default BoardDetail