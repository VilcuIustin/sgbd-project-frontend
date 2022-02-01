import React, {useState} from "react";
import {
    Box, Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {Btn} from "../Components/Btn";

export function Register(props:any){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, errorSetEmail] = useState("");
    const [errorPassword, errorSetPassword] = useState("");
    const [errorRepeatPassword, errorSetRepeatPassword] = useState("");

    const color = useColorModeValue("black", "white");
    const bg = useColorModeValue("","#333335")

    return (
        <Flex w={"100%"} h={"100%"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} color={color}>
            <Box shadow={"lg"} borderWidth={"1px"} borderColor={"var(--colorPrimary)"} borderRadius={"10"} maxW={"sm"} p={10} >
                <Flex flexDirection={"column"} w={"100%"} h={"100%"}>
                    <Heading as="h1" textAlign={"center"} color={""}>Register</Heading>
                    <FormControl id="email" mt={5}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" onChange={(e) => setEmail(e.target.value)}/>
                        <FormHelperText color={"red"}>{errorEmail}</FormHelperText>
                    </FormControl>
                    <FormControl id="password" mt={2}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <FormHelperText color={"red"}>{errorPassword}</FormHelperText>
                    </FormControl>
                    <FormControl id="repeatPassword" mt={2}>
                        <FormLabel>Repeat Password</FormLabel>
                        <Input type="password" onChange={(e) => errorSetRepeatPassword(e.target.value)}/>
                        <FormHelperText color={"red"}>{errorRepeatPassword}</FormHelperText>
                    </FormControl>
                    <Btn mt={3} primary={"true"}>
                        Sign in
                    </Btn>
                </Flex>
            </Box>
        </Flex>
    )
}