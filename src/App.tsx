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
    Center,
    Switch,
    LinkBox,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooter,
    ModalCloseButton,
    IconButton,
} from "@chakra-ui/react";
import Login from "./Login/Login";
import QueryExecution from "./QueryExecution/QueryExecution";
import Workspace from "./Workspace/Workspace";
import {HamburgerIcon} from "@chakra-ui/icons";
import {NavBar} from "./Components/NavBar";
import {CanAccess} from "./Security/CanAccess";
import {Home} from "./Home/Home";
import {Register} from "./Register/Register";
import {PageNotFound} from "./PageNotFound";
import {Courses} from "./Courses/Courses";
import {SelectSection} from "./SelectSection/SelectSection";
import {CreateTable} from "./CreateTable/CreateTable";



function App() {

  return (
      <Flex className={"all"} direction={"column"} bg = {useColorModeValue("#F8F9FA", "#232424")}>
          <NavBar/>
          <Flex flex ="2" grow = "2">
                <Routes>
                    <Route path="/" element={CanAccess() ? <SelectSection/> :<Home />}>
                    </Route>
                    <Route path="/courses" element={CanAccess() ? <Courses/> :<Home />}>
                    </Route>
                    <Route path="/commands" element={<QueryExecution />}>
                    </Route>
                    <Route path="/workspaces" element={CanAccess() ? <Workspace/> : <Login/>}>
                    </Route>
                    <Route path="/create/table" element={CanAccess() ? <CreateTable/> : <Home/>}>
                    </Route>
                    <Route path="/login" element={!CanAccess() ? <Login/> : <Workspace/>}>
                    </Route>
                    <Route path="/register" element={!CanAccess() ? <Register/> : <Workspace/>}>
                    </Route>
                    <Route path={"*"} element={<PageNotFound/>}></Route>
                </Routes>
          </Flex>
      </Flex>
  );
}

export default App;
