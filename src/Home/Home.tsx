import React from "react";
import Typewriter from 'typewriter-effect';
import {Button, Flex, Grid, GridItem, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export function Home(props:any){
    const nav = useNavigate();
    return (
        <Flex flexDirection={{base:"column", md:"row"}} w={"100%"}>
          <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}
                w={{base:"100%", md:"50%"}} h={"100%"}
                fontSize={"50px"} fontFamily={"Open Sans"} fontWeight={700} fontStyle={"normal"}
                color={useColorModeValue("black", "white")}>
              <Typewriter
                  onInit={(typewriter) => {
                      typewriter.pauseFor(600).typeString('SELECT * FROM Employees;')
                          .pauseFor(2500)
                          .deleteAll()
                          .typeString("Start learning SQL <span style=\"color: #2355D4;\">NOW</span>")
                          .start();
                  }}
              />
          </Flex>
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} w={{base:"100%", md:"50%"}} h={"100%"}>
                <Flex>
                    <Text fontSize={"50px"} fontFamily={"Open Sans"} fontWeight={700} fontStyle={"normal"} color={"#2355D4"}> Start learning<br/> SQL today</Text>
                </Flex>
                <Button mt={"2"} bg={"#2355D4"} px={12} onClick={() => nav("/register")}
                        _focus={{border:"none"}}
                        color={useColorModeValue("white","white")}>Sign Up</Button>
                <Text color={"#79797B"} mt={5} onClick={() => nav("/login")}>
                    If you have already an account you can press here.
                </Text>
            </Flex>


    </Flex>
    )
}
