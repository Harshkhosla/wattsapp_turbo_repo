"use client"
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState } from "react";

export function AuthComponent({ isSignin }:{isSignin:boolean}) {
    const [login, setLogin] = useState({
        login: "",
        password: "",
    });
    const change=(e)=>{
        e.preventDefault();
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const submit=()=>{

    }
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <div>

                <div className=" p-2 m-2  bg-black   rounded">
                    <Input onChange={change} className="mt-4" placeholder="email"></Input>
                    <Input onChange={change} className="mt-4" placeholder="password" ></Input>
                </div>
                {isSignin && <Button children="Submit" className="mt-4" appName="Signin" onClick={submit}></Button>}
                {!isSignin && <Button children="Submit" className="mt-4" appName="Signup" onClick={submit}></Button>}
                    
                </div>
            </div>
        </>
    )
};