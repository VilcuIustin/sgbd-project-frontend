import React from 'react';
import {
    Flex,
    Text,
    Box,
    Button,
    Stack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Textarea,
    Skeleton, Input, Select
} from "@chakra-ui/react";
import "./MainPage.css";

function MainPage(){
    return(
        <Flex width={"100%"} direction ={"column"}>
            <Flex  direction={"column"} height={"60%"}>
                <Flex height={"10%"} mt={3} alignItems={"center"} w={"100%"}>
                    <Menu >
                    <MenuButton  display={{ md: 'none' }}>
                        Apasa
                    </MenuButton >
                       <MenuList>
                           <MenuItem>
                               Run
                           </MenuItem>
                           <MenuItem>
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
                    </Stack>


                    <Stack direction={'row'} justify={'end'} w={"50%"} mx={3} display = {{ base : 'none', sm: 'none', md:"flex"}}>
                        <Button  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} bg ={"#243DE2"} >
                            Run
                        </Button>
                        <Button  mr={3} display = {{ base : 'none', sm: 'none', md:"inline"}} bg ={"#243DE2"} >
                            Save
                        </Button>
                    </Stack>
                </Flex>
                <Box  height={"90%"} px={4} pt={2}>
                    <Textarea h = {"100%"} resize={"none"}/>
                </Box>
            </Flex>
            <Flex  height={"40%"} borderColor={"#243DE2"} borderWidth={2} mt={3} mx={3} mb={3}>
                <Stack w={"80%"}>
                {/*    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />*/}
                </Stack>


            </Flex>
        </Flex>
    )
}


export default MainPage;