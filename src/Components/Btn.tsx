import React from "react";
import {Button, useColorModeValue} from "@chakra-ui/react";

export function Btn(props:any){
    const primaryBg = "var(--colorPrimary)";
    const secundaryBg = useColorModeValue("var(--colorSecundaryLight)", "var(--colorSecundaryDark)");
    const hoverBgPrimery = "var(--colorPrimaryHover)";
    const secundaryBgHover = useColorModeValue("var(--colorSecundaryLightHover)", "var(--colorSecundaryDarkHover)");
    const color = useColorModeValue(props.primary == "true"? "white" : primaryBg, props.primary == "true"? "white" : primaryBg)
    return (
        <Button _focus={{borderColor:primaryBg}} color ={color}
                borderWidth={1}
                borderColor={primaryBg}
                _hover={{bg: props.primary == "true" ? hoverBgPrimery : secundaryBgHover}}
            bg={props.primary == "true" ? primaryBg : secundaryBg} {...props}>
            {props.children}
        </Button>
    )
}