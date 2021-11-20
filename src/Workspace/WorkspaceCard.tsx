import React from 'react';
import {Flex, Box, Badge, Container, Button} from "@chakra-ui/react";


function WorkspaceCard(props: any){

    return(
    <Flex as={Button} borderColor={"blue"} borderWidth={2} w={"sm"} alignItems={"center"} justifyContent={"center"} height={"50%"} m={3}>
            {props.Name}
    </Flex>

    )
}


export default WorkspaceCard;