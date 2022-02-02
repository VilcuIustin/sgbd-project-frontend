import React, {useRef, useState} from 'react';
import {
    Flex,
    Text,
    Box,
    Button,
    Stack,
    Menu,
    ModalFooter,
    MenuButton,
    MenuItem,
    MenuList,
    Textarea,
    Skeleton,
    Input,
    Select,
    IconButton,
    Spinner,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    flexbox,
    useColorModeValue,
    useDisclosure,
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    Modal,
    FormHelperText, toast, useToast
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import "./QueryExecution.css";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Btn} from "../Components/Btn";

function QueryExecution(props: any){
    const {state} = useLocation();
    const [results, setReults] = useState([]);
    const [query, setQuery] = React.useState("");
    const [runLoading, isRun] = useState(false);
    const [getScript, setNewScriptRequest] = useState({});
    const inputRef = useRef(null) as unknown as React.MutableRefObject<HTMLTextAreaElement>;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryNameInput = React.useRef<any>();
    const [errQueryName, setErrQueryName] = useState("");
    const toast = useToast();
    let navigate = useNavigate();

    const runScript = async () => {

        isRun(true);

        console.log(query, state);
        axios.post("https://localhost:7001/api/Workstation/run",
            {Sql: inputRef.current.value, WorkspaceId: state.id, RowNumbers: 10})
            .then(res => {
                console.log((res.data as Array<Array<any>>).length);
                for(let i=0; i<res.data.length; i++){
                    if(res.data[i].length == 0){
                        res.data[i] = [{"": "No data found"}];
                    }
                }
                setReults(res.data.length != 0 ? res.data : [[{"": "No data found"}]]);
                console.log(results)
                isRun(false);
            })
            .catch(err => {
                console.error(err);
                isRun(false);
            });
    }

    const saveQuery = () => {
        if(queryNameInput.current.value.trim() == ""){
            setErrQueryName("Name is required");
        }
        else{
            setErrQueryName("");
        }
        if(errQueryName == ""){
            axios.post(process.env.REACT_APP_ADDRESS+"/api/queries/save",
                {workspaceId: state.id,
                    name: queryNameInput.current.value,
                    query: inputRef.current.value})
                .then((res) => {
                    return toast({ description: "Query saved!",
                        status: "success",
                        isClosable: true,
                        position: "bottom-left"})
                }).catch((err) => {
                return toast({ description: err.request,
                    status: "error",
                    isClosable: true,
                    position: "bottom-left"})
            })
        }

    }

    const repair = (mode:number) => {
        let url:string;
       if(mode === 1){
           url = "/api/Queries/repair/1";
       }
       else if(mode === 2){
           url = "/api/Queries/repair/2";
       }
        else{
            url = "/api/Queries/repair/3";
        }

        axios.post(process.env.REACT_APP_ADDRESS + url,
            {Id: state.id})
            .then(res => {
                console.log(res.data);
                console.log(res.data.length !=0)
                if(res.data[0].length !=0){
                    setReults(res.data);
                }
                else{
                    let data = [[{"Message": "No changes"}]]
                    // @ts-ignore
                    setReults(data)
                }

        }).catch(err => {
            console.log(err.response)
        })
    }

    return(
        <Flex width={"100%"} direction ={"column"} >
            <Flex  direction={"column"} h={"20vh"}>
                <Flex  size={"sm"} mt={3} mb={3} alignItems={"center"} w={"100%"}>
                    <Menu>
                    <MenuButton  mx={4}
                                 display={{ md: 'none' }}
                                 as={IconButton}
                                 aria-label="Options"
                                 icon={<HamburgerIcon />}>
                        Apasa
                    </MenuButton >
                       <MenuList>
                           <MenuItem onClick={runScript}>
                               Run
                           </MenuItem>
                           <MenuItem >
                               Save
                           </MenuItem>
                       </MenuList>
                    </Menu>
                    <Stack direction={'row'} justify={'start'} w={"100%"}  mx={4}>
                        <Select placeholder="Select number of rows" w={"auto"}>
                            <option>10</option>
                            <option>30</option>
                            <option>50</option>
                            <option>100</option>
                            <option>1000</option>
                            <option>10000</option>
                        </Select>
                        <Btn primary={"true"} onClick={() => navigate("/create/table", { state: { id: state.id } })}>
                            Create table (simplified)</Btn>
                        <Btn  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} onClick ={ (e:any) => {
                            repair(1)
                        }}>
                            Repair tables without pk
                        </Btn>
                        <Btn  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} onClick ={ (e:any) => {
                            repair(2)
                        }}>
                            Repair tables with pk
                        </Btn>
                        <Btn  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} onClick ={ (e:any) => {
                            repair(3)
                        }}>
                            Repair all
                        </Btn>
                    </Stack>


                    <Stack direction={'row'} justify={'end'} w={"50%"} mx={3} display = {{ base : 'none', sm: 'none', md:"flex"}}>
                        <Btn  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} primary={"true"} onClick={runScript}>
                            Run
                        </Btn>
                        <Btn  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} primary={"true"}  onClick ={ (e:any)=> {
                            onOpen()
                        }}>
                            Save
                        </Btn>


                    </Stack>
                </Flex>
                <Box px={4} pt={2}  h={"100%"} color={useColorModeValue("black","white")} >
                    <Textarea type={"textarea"}  ref={inputRef} resize={"none"} borderColor={"#243DE2"}/>
                </Box>
            </Flex>
            <Flex  borderColor={"#243DE2"} h={"70vh"} borderWidth={2} mt={3} mx={3} mb={3} justifyContent={"center"} >

                {runLoading &&
                <Flex alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    <Spinner size={'xl'}/>
                </Flex>
                }
                {!runLoading &&
                <Stack w={"100%"}  >

                {results.map(queryRes => {
                    return <Stack h={"50%"} overflow={"auto"} >
                        <Table >
                            <Thead>
                                <Tr>
                                    {Object.keys(queryRes[0]).map((he: any) => {
                                        return <Th>{he}</Th>
                                    })
                                    }
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(queryRes as Array<any>).map((row: any) => {

                                    return <Tr>
                                        {Object.entries(row).map((el: any) => {
                                            return <Td>{el[1]?.toString() ?? 'null'}</Td>
                                        })}
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </Stack>
                })}
                </Stack>
                    }
            </Flex>


            <Modal
                initialFocusRef={queryNameInput}
                isOpen={isOpen}
                onClose={onClose}

            >
                <ModalOverlay />
                <ModalContent color={useColorModeValue("black", "white")} bg={useColorModeValue("var(--colorSecundaryLightHover)", "var(--colorSecundaryDarkHover)")}>
                    <ModalHeader fontSize={30} fontWeight={700}>Save query</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        <FormControl isRequired={true}>
                            <FormLabel> Query name</FormLabel>
                            <Input ref={queryNameInput} placeholder='query name' />
                            <FormHelperText color={"red"}>{errQueryName}</FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Btn primary={"true"} mr={3} onClick={saveQuery}>
                            Save
                        </Btn>
                        <Btn onClick={onClose}>Cancel</Btn>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}


export default QueryExecution;