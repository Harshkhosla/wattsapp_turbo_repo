"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const [group, setGroup] = useState('22')


  const handleChange = () => {
    // alert("hello ")
    router.push(`/group/${group}`)
  }


  return (
    <div >

      <Input placeholder="Join the Room " className="px-2 py-2" onChange={(e: any) => {
        setGroup(e.target.value)
      }} />
      <Button children={"Join Group"} appName="web" className="bg-red-600 rounded-lg mt-6 px-4 py-2 border-4 " onClick={handleChange} />
    </div>
  );
}
