import React, {useEffect, useRef, useState} from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Checkbox, Divider,
    Flex,
    Input, Select,
    Table,
    TableCaption,
    Tbody,
    Td,
    AlertDialogFooter,
    Tfoot,
    Th,
    Thead,
    Tr,
    useBreakpoint,
    useBreakpointValue, useColorModeValue, useToast, useDisclosure
} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import "./styleDropdown.css";
import "../index.css";
import {Btn} from "../Components/Btn";
import axios from "axios";


export function CreateTable(){
    const {state} = useLocation();
    const size = useBreakpointValue({base:"sm", sm:"sm", md:"md", lg:"lg"});
    const [details, setDetails] = useState(new Array<TableDetails>());
    const bg = useColorModeValue("#F8F9FA", "#232424");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);
    let pkExists = false;
    const tableNameRef = useRef(null);

    function newEntry() {
        let rows = details;
        console.log(rows)
        rows.push({...{isPrimary:false, columnName: "", datatype:"", isNullable:false}});
        setDetails([...rows]);
    }

    function remove(nr:number){
        console.error("stergem "+nr)
        let rows = details;
        console.log(rows)
        rows.splice(nr,1)
        setDetails([...rows]);
    }

    function checkPk(nr:number, checked:boolean){
        console.log(nr)
        let rows = details;
        rows[nr].isPrimary = checked;

        setDetails([...rows]);
    }
    function checkNullable(nr:number, checked:boolean){
        console.log(nr)
        let rows = details;
        rows[nr].isNullable = checked;

        setDetails([...rows]);
    }

    function setColumnName(nr:number, value:string){
        let rows = details;
        rows[nr].columnName = value;
        setDetails([...rows]);
    }
    function setDataType(nr:number, value:string){
        let rows = details;
        rows[nr].datatype = value;
        setDetails([...rows]);
    }

    async function createTable() {
        setLoading(true);
        let columnNameHash = new Set<string>();

        for (const row of details) {
            if (row.columnName.trim() == "") {
                setLoading(false);
                return newToast("Error", "There is a row with empty column name", "error");
            }
            if (row.datatype.trim() == "") {
                setLoading(false);
                return newToast("Error", "There is a row with empty data type", "error");
            }
            if (row.isPrimary) {
                console.log("a ajuns aici")
                pkExists = true;
            }
            columnNameHash.add(row.columnName);
        }
        if (columnNameHash.size != details.length) {
            setLoading(false);
            return newToast("Error", "There is a duplicate column name", "error");
        }

        // @ts-ignore
        if (tableNameRef.current!.value.trim() === "") {
            setLoading(false);
            return newToast("Error", "Table name is required", "error");
        }
        console.error(pkExists);
        if (!pkExists) {
            onOpen();
            return;
        }

        let columns = Array<any>();

        for (const row of details) {
            columns.push({
                ColumnName: row.columnName,
                ColumnType: row.datatype,
                IsPrimary: row.isPrimary,
                IsNullable: row.isNullable
            });
        }
        console.log(columns);
        // @ts-ignore
        let tableName = tableNameRef.current!.value.trim()

        axios.post(process.env.REACT_APP_ADDRESS + "/api/queries/table", {
            Name: tableName,
            Id: state.id,
            Columns: columns,
        }).then((res) => {
            console.log(res);
            setLoading(false);
        }).catch((err) => {
            console.log(err.response);
            setLoading(false);
        })

    }

    function newToast(title:string, description:string, status:any){
        return  toast({
            title: title,
            description: description,
            status: status,
            duration: 6000,
            isClosable: true,
        })
    }

    const types = [
           "int" ,
           "bigint",
            "smallint",
            "tinyint",
            "bit",
            "decimal",
            "numeric",
            "money",
            "smallmoney",
            "float(n)",
            "real",
            "datetime",
    ];

    return (
        <Flex h={"100%"} flexDirection={"column"} w={"100%"} color={useColorModeValue( "black","white")}>
            <Flex flexDirection={"row"} alignSelf={"end"} mb={4}>
                <Input placeholder={"table name"} w={"200px"} ref={tableNameRef} borderColor={"var(--colorPrimary)"} me={3} disabled={loading}/>
                <Btn primary={"true"} me={4} onClick={() => {createTable()}} disabled={loading}>Create Tabel</Btn>
            </Flex>
            <Flex >
                <Flex flexDirection={"column"} w={"100%"} overflowY={"auto"} h={"calc(100vh - 120px)"}>
                    <Table variant='simple' size={size} >
                        <Thead>
                            <Tr>
                                <Th textAlign={"center"}>Primary Key</Th>
                                <Th textAlign={"center"}>Column Name</Th>
                                <Th textAlign={"center"}>Type</Th>
                                <Th textAlign={"center"}>Nullable</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {details.map((e, nr) => {
                                return (
                                    <Tr key={"tr"+nr} >
                                        <Td>
                                            <Flex flexDirection={"column"} alignItems={"center"}>
                                                <Checkbox isDisabled={loading} borderColor={"var(--colorPrimary)"} key={"check"+nr}isChecked={details[nr].isPrimary}
                                                          onChange={(evt) => {
                                                              checkPk(nr, evt.target.checked)}} />
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Input disabled={loading} borderColor={"var(--colorPrimary)"} maxLength={128}
                                                   onChange={(evt) =>  setColumnName(nr, evt.target.value)}>
                                            </Input>
                                        </Td>
                                        <Td >
                                            <Input disabled={loading} borderColor={"var(--colorPrimary)"} maxLength={150} onChange={(evt) =>  setDataType(nr, evt.target.value)}/>
                                        </Td>
                                        <Td>
                                            <Flex flexDirection={"column"} alignItems={"center"}>
                                                <Checkbox isDisabled={loading} borderColor={"var(--colorPrimary)"} key={"check"+nr}isChecked={details[nr].isNullable}
                                                          onChange={(evt) => {
                                                              checkNullable(nr, evt.target.checked)}} />
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <Button colorScheme={"red"} disabled={loading} onClick={() => remove(nr)}>Delete</Button>
                                        </Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                    <Flex my={2}>
                        <Btn primary={"true"} onClick={() => newEntry()} disabled={loading}> Add New Column </Btn>
                        <Btn primary={"true"} ms={3} onClick={() => console.log(details)}> Show Details </Btn>
                    </Flex>
                </Flex>
            </Flex>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent color={useColorModeValue( "black","white")}>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                       Your table does not have any primary key set. Do you want to continue?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} colorScheme='red' onClick={() => {setLoading(false); onClose()}}>
                            No
                        </Button>
                        <Button  ml={3}  onClick={() => {pkExists = true;createTable(); onClose();  }}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </Flex>
    )
}

export interface TableDetails{
    isPrimary :boolean;
    isNullable :boolean;
    columnName :string;
    datatype :string;
}