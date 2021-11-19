import React from 'react';
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
    useColorModeValue
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";




function Login(props: any){
    let navigate = useNavigate();
    const signIn = () => {
        navigate("/home")
    }



    return(
        <Flex className = "main" flex ="1" grow = "1" align={'center'}
              justify={'center'}  h={"100%"}>
            <Flex className={"login-card"} borderColor="#243DE2" borderWidth={2}
                bg={useColorModeValue('#fff', '#232424')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', '#232424')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="WORKSPACE">
                                <FormLabel>Workspace</FormLabel>
                                <Input type="text"/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
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