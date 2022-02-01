import React from "react";
import {Badge, Box, Divider, Flex, Spinner, Text} from "@chakra-ui/react";
import {Btn} from "../Components/Btn";
import {useNavigate} from "react-router-dom";

export function SelectSection(){
    const nav = useNavigate();
    return(
        <Flex w={"100%"} h={"100%"} flexWrap={"wrap"} >
          <Flex flexDirection={"column"} w={"100%"} h={"100%"} justifyContent={"center"}>
                <Box justifySelf={"center"} w={"100%"} mt={7} mb={10}>
                    <Flex flexDirection={"column"} alignItems={"center"}>

                        <Text fontSize={{base:"20", sm:"24", md:"28"}} fontWeight={"700"}>Do you want to learn SQL? You are in the right place!
                        </Text>
                        <Btn primary={"true"} mb={5} mt={2} onClick={(e:any) => nav("/courses")}> Go to courses section</Btn>
                    </Flex>
                </Box>
                <Flex alignItems={"center"} >
                    <Divider />
                    <Badge ml='1' fontSize='0.8em' colorScheme={"var(--colorPrimary)"}>OR</Badge>
                    <Divider />
                </Flex>
                <Box justifySelf={"center"} w={"100%"} mt={10}>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Text  fontSize={{base:"20", sm:"24", md:"28"}} fontWeight={"700"}> Do you want to practice what you learned?</Text>
                        <Btn primary={"true"} mb={5} mt={2} onClick={(e:any) => nav("/workspaces")}> Go to workspaces section</Btn>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}