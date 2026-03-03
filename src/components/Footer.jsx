import { Flex, Text } from '@radix-ui/themes'

export const Footer = () => {
    return (
        <Flex justify="center" align="center" p="4" gap="2">
            <Text size="2" color="gray">
                © {new Date().getFullYear()} Realizado por Miguel Ángel Bernal Sánchez
            </Text>
        </Flex>
    )
}
