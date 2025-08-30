"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Demo } from "@repo/ui/demo";
import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Pencil, Share2, Users, Sparkles, Github, ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter()
  const [group, setGroup] = useState('22')
  const [files, setFiles]= useState<File[] |null>(null)

  const fileuplload=(e:any)=>{
    console.log(e.target.files)
    
   const fileArray:File[] = Array.from(e.target.files);
   setFiles(fileArray);
  }
  const filesenddata=async()=>{
      const formdata = new FormData()
      files?.forEach(file=>formdata.append('file',file))
      files?.forEach(file=>formdata.append('gallery',file))
      await axios.post('http://localhost:4000/fileupload', formdata,{
        headers:{
          "Content-Type":'multipart/form-data'
          }
        })
  }

  const handleChange = () => {
    router.push(`/canvas/${group}`)
  }
  const handleChange2 = () => {
    router.push(`signup`)
  }
  return (
    <div >
       <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="text-center">
            <Input placeholder="Join the Room " className="px-2 py-2"  type="file" onChange={fileuplload}/>
            <Button children ={"upload"} appName="web"   className="bg-red-600 rounded-lg mt-6 px-4 py-2 border-4 " onClick={filesenddata}> 
              </Button>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
              Collaborative Whiteboarding
              <span className="text-primary/80"> Made Simple</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
              Create, collaborate, and share beautiful hand-drawn diagrams with your team in real-time.
              No sign-up required.
            </p>
            
            <div className="flex gap-4 justify-center">
            <Input placeholder="Join the Room " className="px-2 py-2" onChange={(e: any) => {
        setGroup(e.target.value)
      }} />
       <Button children={"Join Group"} appName="web" className="bg-red-600 rounded-lg mt-6 px-4 py-2 border-4 " onClick={handleChange} />
       <Link href={"/signup"}>
              <Button children ={"login"} appName="web"   className="bg-red-600 rounded-lg mt-6 px-4 py-2 border-4 " onClick={handleChange2}> 
              </Button>
       </Link>
              {/* <Button size="lg" variant="outline" className="gap-2">
                <Github className="w-4 h-4" /> View on GitHub
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See it in Action</h2>
            <p className="text-xl text-muted-foreground">
              Watch how easy it is to create and share your ideas
            </p>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border-4 border-primary/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
              alt="Excalidraw Demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Demo></Demo>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Templates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Enterprise</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 Excalidraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
      {/* <Input placeholder="Join the Room " className="px-2 py-2" onChange={(e: any) => {
        setGroup(e.target.value)
      }} />
      <Button children={"Join Group"} appName="web" className="bg-red-600 rounded-lg mt-6 px-4 py-2 border-4 " onClick={handleChange} /> */}
    </div>
  );
}
