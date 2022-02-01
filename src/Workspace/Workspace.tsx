import React, {useEffect, useState} from "react";
import {
    Button,
    Flex,
    Grid, Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    SimpleGrid, ScaleFade,
    Text,
    Spinner,
    useDisclosure, toast, useToast, Box, Heading, Divider, Badge
} from "@chakra-ui/react";
import WorkspaceCard from "./WorkspaceCard";
import axios from "axios";
import {Btn} from "../Components/Btn";


function Workspace(){
    const [loading, isLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const toastIdRef = React.useRef()
    const [workspaces, addWorkspace] = useState(new Array<WorkspaceModel>());
    const [queries, addQueries] = useState(new Array<WorkspaceModel>());
    const [newWorkspace, newWorkspaceName] = useState("");
    useEffect(() => {
        reloadWorkspaces(true);

    }, [addWorkspace])

    const crateWorkspace = () =>{
        isLoading(true);
        console.log(newWorkspace);
        axios.get(process.env.REACT_APP_ADDRESS +"/api/Workstation")
            .then(async (res) => {
                addToast("Workspace Created", "success")
                reloadWorkspaces(false)
                isLoading(false);
            })
            .catch((err) =>{
                addToast(err.toString(), "error");
                isLoading(false);
            })

        //window.location.reload();
    }

    const reloadWorkspaces = (reloadAll:boolean) =>{
        isLoading(true);
        let calls;
        if(reloadAll){
            calls = axios.all([
                axios.get(process.env.REACT_APP_ADDRESS +"/api/Workstation"),
              //  axios.get(process.env.REACT_APP_ADDRESS +"/api/queries")
            ])

            calls.then(axios.spread((res1, res2) => {
                let workspacesList = Array<WorkspaceModel>();
                res1.data.data.map((el:any) =>{
                    let workspace = new WorkspaceModel();
                    workspace.Id= el.id;
                    workspace.WorkspaceName = el.name;
                    workspacesList.push(workspace);
                })
                addWorkspace(workspacesList);
                isLoading(false);

            }))
        }
        else{
            axios.get(process.env.REACT_APP_ADDRESS +"/api/Workstation")
            .then((res) => {
                let workspacesList = Array<WorkspaceModel>();
                res.data.data.map((el:any) =>{
                        let workspace = new WorkspaceModel();
                        workspace.Id= el.id;
                        workspace.WorkspaceName = el.name;
                        workspacesList.push(workspace);
                    })
                    addWorkspace(workspacesList);
                    isLoading(false);

                })
            .catch((err) =>{
                console.error(err);
            })
        }
    }

    function addToast(message:string, status : any) {
        // @ts-ignore
        toastIdRef.current = toast({ description: message, status: status,  variant: "top-accent", isClosable: true, position: "bottom-left"})
    }

    return(
        <Flex w={"100%"} h={"100%"} overflowY={"hidden"}>
            {loading &&
            <Flex alignItems={"center"} justifyContent={"center"} w={"100%"}>
                <Spinner size={'xl'}/>
            </Flex>}
            {!loading && <Flex flexDirection={"column"} w={"100%"} h={"100%"} >
                    <Flex w={"100%"} h={"10%"} justifyContent={"end"}  flexWrap={"wrap"} my={2}>
                        <Btn primary={"true"} flexWrap={"wrap"} my={2} me={5} onClick={onOpen}>
                            Create Workspace
                        </Btn>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Create a new Workspacee</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Input placeholder="Workspace name" onChange={e => newWorkspaceName(e.target.value)} ></Input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button  variant="ghost"  mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="blue" onClick={crateWorkspace}>Create</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Flex>
                <Flex flexDirection={"row"} h={"100%"} >
                    <Flex flexDirection={"column"} w={{base:"100%", md:"30%"}} h={"100%"}>
                        <Text textAlign={"center"}> Workspaces </Text>
                        <Flex w={"100%"} overflowY={"auto"} h={"300px"} flexDirection={"column"}>
                            {!loading && workspaces.map((el) =>{
                                return <WorkspaceCard Name = {el.WorkspaceName} key={el.Id} Id ={el.Id}/>
                            })}
                        </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} w={{base:"100%", md:"30%"}} h={"100%"}>
                        <Text textAlign={"center"}> Saved Queries </Text>
                        <Flex w={"100%"} overflowY={"auto"} h={"300px"} flexDirection={"column"}>
                            {!loading && workspaces.map((el) =>{
                                return <WorkspaceCard Name = {el.WorkspaceName} key={el.Id} Id ={el.Id}/>
                            })}
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>

            }
        </Flex>
    )
}

class WorkspaceModel{
    public Id:string = "";
    public WorkspaceName:string = "";
}



export default  Workspace;