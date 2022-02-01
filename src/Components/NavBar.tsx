import React from "react";
import {
    Box,
    Button,
    Flex,
    IconButton,
    LinkBox,
    LinkOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Stack, useColorMode, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import {HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {CanAccess} from "../Security/CanAccess";

export function NavBar(props:any){
    const {toggleColorMode } = useColorMode();
    const mode = useColorModeValue(false, true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    let navigate = useNavigate();

    function logOut() {
        window.localStorage.removeItem("token");
        window.sessionStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <Box px={4} >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <LinkBox className = "logo"  >  <LinkOverlay href="/" color={"#2355D4"} fontFamily={"Open Sans"} fontWeight={"bold"} fontStyle={"normal"}>SQL Hero</LinkOverlay> </LinkBox>

                <Flex alignItems={'center'}>
                    <Menu >
                        <MenuButton  display={{ md: 'none' }}  as={IconButton}
                                     aria-label="Options"
                                     icon={<HamburgerIcon />}>
                        </MenuButton>
                        <MenuList>
                            <MenuItem _focus={{border:"none"}}>
                                {mode? <MoonIcon/> : <SunIcon/>}

                            </MenuItem>

                            {CanAccess() &&
                            <MenuItem>
                                Upload script
                            </MenuItem>
                            }
                            <MenuItem>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Stack direction={'row'} spacing={7} display = {{ base : 'none', sm: 'none', md:"inline"}}>

                        <Button onClick={toggleColorMode} bg={""} _focus={{border:"none"}}>
                            {mode? <MoonIcon/> : <SunIcon/>}
                        </Button>
                        {CanAccess() &&
                        <Button onClick={onOpen} bg={""}>
                            Upload script
                        </Button>
                        }
                        {CanAccess() &&
                        <Button onClick={() => logOut()} bg={""}>
                            Log Out
                        </Button>
                        }
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>

                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button variant="ghost">Secondary Action</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );


}