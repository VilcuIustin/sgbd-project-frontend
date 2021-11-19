import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate, Link as LinkRout} from "react-router-dom";
import {
    Box,
    LinkOverlay,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center, Switch, LinkBox, Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalFooter, ModalCloseButton,
} from "@chakra-ui/react";
import Login from "./Login/Login";
import MainPage from "./MainPage/MainPage";



function App() {
    const {toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()
    let navigate = useNavigate();
  return (
      <Flex className={"all"} grow={"1"} direction={"column"} bg = {useColorModeValue("#F8F9FA", "#232424")}>
          <Box bg='#243DE2' px={4}>
              <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                  <LinkBox className = "logo" >  <LinkOverlay href="/">SQL Hero</LinkOverlay> </LinkBox>

                  <Flex alignItems={'center'}>
                      <Menu >
                          <MenuButton  display={{ md: 'none' }}>
                              Apasa
                          </MenuButton >
                          <MenuList>
                              <MenuItem>
                                  Change Mode
                              </MenuItem>
                              <MenuItem>
                                  Upload script
                              </MenuItem>
                          </MenuList>
                      </Menu>
                      <Stack direction={'row'} spacing={7} display = {{ base : 'none', sm: 'none', md:"inline"}}>

                          <Button onClick={toggleColorMode}>
                              Change Mode
                          </Button>
                          <Button onClick={onOpen}>
                              Upload script
                          </Button>
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
          <Flex flex ="2" grow = "2">
                <Routes>
                    <Route path="/" element={<Login />}>
                    </Route>
                    <Route path="/home" element={<MainPage />}>
                    </Route>
                </Routes>
          </Flex>
      </Flex>
  );
}

export default App;
