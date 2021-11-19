import {extendTheme} from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';



const theme = extendTheme({
    styles: {
        global: (props: any) => ({
            body: {
                bg: mode('#F8F9FA', '#232424')(props),
                color: mode('black', 'white')(props),
            },
        }),
    },
});

export default theme;