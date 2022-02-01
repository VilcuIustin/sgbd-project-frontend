import {extendTheme} from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';



const theme = extendTheme({
    styles: {
        global: (props: any) => ({
            body: {
                bg: mode('#F6F7FC', '#333235')(props),
                color: mode('#2355D4', '#2355D4')(props),
            },
        }),
    },
});

export default theme;