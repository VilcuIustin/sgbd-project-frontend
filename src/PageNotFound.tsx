import React from "react";
import {Flex} from "@chakra-ui/react";
import {ReactComponent as NotFoundSVG} from "../src/Resources/undraw_page_not_found_re_e9o6.svg";

export function PageNotFound(){
    return (
        <Flex w={"100%"} h={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <NotFoundSVG preserveAspectRatio="xMinYMin" width={"100%"}/>
        </Flex>
    )
}