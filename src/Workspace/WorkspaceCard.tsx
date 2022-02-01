import React from 'react';
import {Flex, Box, Badge, Container, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";


function WorkspaceCard(props: any){


    let navigate = useNavigate();
    const toworkspace = () => {
        console.log(props.Id)
        navigate("/commands", { state: { id: props.Id} })
    }
    return(
    <Flex as={Button} onClick={toworkspace} p={2} flexGrow={"1"} alignItems={"center"} justifyContent={"center"}  m={3}>
            {props.Name}
    </Flex>

    )
}


export default WorkspaceCard;