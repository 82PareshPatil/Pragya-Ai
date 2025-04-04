// "use client"
// import React from 'react'
// import {useUser} from '@stackframe/stack'
// import {Button} from '@/components/ui/button'
// import { CoachingOptions } from '@/services/Options'
// import  Image  from 'next/image'
// import { BlurFade } from '@/components/magicui/blur-fade'
// import UserInputDialog from './UserInputDialog'
// function FeatureAssistants() {
//     const user=useUser();
// return(
//     <div>
//     <div className='flex justify-between item-center '>
// <div>
//     <h2 className='font-medium test-gray-500'>My Workspace</h2>
//     <h2 className='text-3xl font-bold'>Welcome back,{user?.displayName}</h2>
// </div>
// <Button>Profile</Button>
// </div>
// <div className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10'>
// {CoachingOptions.map((Option, index) => (
//      <BlurFade key={Option.icon} delay={0.25 + index *0.05} inView>
//         <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center'>
//         <UserInputDialog CoachingOptions={Option}>
//         <div key={index} className='flex flex-col justify-center items-center'>
        
    
//     <Image src={Option.icon} alt={Option.name} width={150} height={150} className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all' />
//         <h2 className='mt-2'>{Option.name}</h2>
//     </div>
//     </UserInputDialog>
//     </div>
//     </BlurFade>
    
// ))}

// </div>
// </div>
// )
// }

// export default FeatureAssistants

"use client";
import React from "react";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { CoachingOptions } from "@/services/Options";
import Image from "next/image";
import { BlurFade } from "@/components/magicui/blur-fade";
import UserInputDialog from "./UserInputDialog";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function FeatureAssistants() {
  const user = useUser();
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    
    <ConvexProvider client={convex}>
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-gray-500">My Workspace</h2> 
          <h2 className="text-3xl font-bold">Welcome back, {user?.displayName}</h2>
        </div>
        <Button>Profile</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10">
        {CoachingOptions.map((Option, index) => (
          <BlurFade key={Option.icon} delay={0.25 + index * 0.05} inView>
            <div className="p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center">
              <UserInputDialog CoachingOptions={Option}>
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <Image
                    src={Option.icon}
                    alt={Option.name}
                    width={150}
                    height={150}
                    className="h-[70px] w-[70px] hover:rotate-12 transition-all"
                  />
                  <h2 className="mt-2">{Option.name}</h2>
                </div>
                
              </UserInputDialog>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
    </ConvexProvider>
  );
}

export default FeatureAssistants;
