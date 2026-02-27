import { Flex } from "@radix-ui/themes"
import { COLORS } from "../utils/colors"

export const ColorPicker = ({ colorSeleccionado, onColorSeleccionado }) => {
    return (
        <Flex gap="2" wrap="wrap">
            {COLORS.map((color) => (
                <div
                    key={color.valor}
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: colorSeleccionado === color.valor ? '3px solid white' : '3px solid transparent',
                        cursor: 'pointer'
                    }}
                    onClick={() => onColorSeleccionado(color.valor)}
                />
            ))}
        </Flex>
    )
}