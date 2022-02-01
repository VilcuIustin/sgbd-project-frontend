import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {Input, Textarea} from "@chakra-ui/react";

export function TextInputCustom(props:any){

    const inputRef = useRef(null) as unknown as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        props.sql(inputRef.current.value);
    }, [props.scriptRun]);

/*      <Textarea ref={inputRef} resize={"none"} h={"100%"} value={query} onChange={async e => {
                await setQuery(e.target.value);

                console.log(query);
            }}/>*/
    return(
        <Input type={"textarea"}  ref={inputRef} />

    )
}
