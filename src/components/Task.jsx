import { Card, IconButton, Text, DropdownMenu } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"


export const Task = ({ titulo="NombreEjemplo", descripcion="DescEjemlo", fecha="01/01/2000"}) => {
  return (
    <>
      <Card style={{ position: "relative" }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton size="2" variant="ghost" radius="full"
              style={{
                position: "absolute",
                top: 8,
                right: 8
              }}
              aria-label="Más opciones"
            >
              <DotsVerticalIcon />
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item>Editar</DropdownMenu.Item>
            <DropdownMenu.Item>Cambiar color</DropdownMenu.Item>
            <DropdownMenu.Separator/>
            <DropdownMenu.Item color="red">
              Eliminar
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Text as="div" weight="bold" size="6" mb="3">{titulo}</Text>
        <Text as="div" mb="3">{descripcion}</Text>
        <Text as="div">{fecha}</Text>
      </Card>
    </>
  )
}
