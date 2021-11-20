import React, {useState} from "react";
import {Button, Flex, Grid, SimpleGrid, Spinner} from "@chakra-ui/react";
import WorkspaceCard from "./WorkspaceCard";


function Workspace(){
    const [loading, isLoading] = useState(false);



    return(
        <Flex w={"100%"} h={"100%"} flexWrap={"wrap"} >
            {loading &&
            <Flex alignItems={"center"} justifyContent={"center"} w={"100%"}>
                <Spinner size={'xl'}/>
            </Flex>}
            {!loading &&
                <Flex flexDirection={"column"} w={"100%"} h={"100%"} overflowX={("hidden")}>
                    <Flex w={"100%"} h={"10%"} justifyContent={"center"} flexWrap={"wrap"} my={2}>
                        <Button w={"200px"} h={"100%"} flexWrap={"wrap"} my={2}>
                            Create a new Workspace
                        </Button>
                    </Flex>
                    <Flex  w={"100%"} h={"50%"} flexWrap={"wrap"}>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>
                        <WorkspaceCard Name ="CEVa"/>

                    </Flex >
                </Flex>

            }
        </Flex>
    )
}

export default  Workspace;