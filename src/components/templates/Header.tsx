import { Box, Flex, Text } from "@chakra-ui/react";
import styles from "./Header.module.scss"

export function Header(){
    // background="background2"
    return <Box>
        <header className={styles.header}>
            <Flex flexWrap="nowrap">
                <Text fontSize="xl"><strong>Maycon</strong> Jesus</Text>
            </Flex>
        </header>
    </Box>
}