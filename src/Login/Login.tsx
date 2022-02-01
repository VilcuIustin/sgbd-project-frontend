import React, {useState} from 'react';
import './Login.css';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Link,
    Stack,
    Checkbox,
    useColorModeValue, FormHelperText
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {validate} from "email-validator";
import axios from "axios";




function Login(props: any){
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [password, setPassword] = useState("");
    const [errorEmail, errorSetEmail] = useState("");
    const [errorPassword, errorSetPassword] = useState("");

    const signIn = () => {
        if (!validate(email)) {
            errorSetEmail("Email is invalid");
        } else {
            errorSetEmail("")
        }
       /* if (password.length < 6) {
            errorSetPassword("Password must be at least 6 characters");
        }*/
        /* else if(!password.match("/[[:alnum:]]+/g")){
             setPasswordError("Password must contains letters and numbers");
         }*/
       /* else {
            errorSetPassword("");
        }*/
        if(errorEmail != "" || errorPassword != ""){
            return;
        }
        axios.post(process.env.REACT_APP_ADDRESS + "/api/account/login", {email:email, password:password})
            .then((res) => {
                window.localStorage.removeItem("token");
                window.sessionStorage.removeItem("token");
                if(rememberme){
                    window.localStorage.setItem("token",  res.data.data.token);
                }
                else
                    window.sessionStorage.setItem("token",  res.data.data.token);

                window.location.href="/workspaces";
            })
            .catch((err) => {
                console.error(err);
            })

    }

    return(
        <Flex className = "main" flex ="1" grow = "1" align={'center'}
              justify={'center'}  h={"100%"}>
            <Flex className={"login-card"}  borderWidth={2}
                bg={useColorModeValue('#fff', '#232424')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', '#232424')}

                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" onChange={(e) => setEmail(e.target.value)}/>
                                <FormHelperText color={"red"}>{errorEmail}</FormHelperText>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
                                <FormHelperText color={"red"}>{errorPassword}</FormHelperText>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox onChange={(e) => setRememberme(e.target.checked)}>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={'#243DE2'}
                                    color={'white'}
                                    _hover={{
                                        bg: '#244DF2',
                                    }}
                                    onClick={signIn}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
        )




}
export default Login;