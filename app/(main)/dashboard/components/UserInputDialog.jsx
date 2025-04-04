// import React, { useState } from 'react'
// import { Textarea } from "@/components/ui/textarea"
// import { CoachingExpert } from '@/services/Options'
// import  Image  from 'next/image'
// import { useMutation} from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button'
// import { DialogClose } from '@radix-ui/react-dialog'

  
// function UserInputDialog({children, CoachingOptions}) {

//     const [selectedExpert, setSelectedExpert]=useState();
//     const [topic, setTopic]=useState();
//     // const createDiscussionRoom=useMutation(api.DiscussionRoom.CreateNewRoom);
//     const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
//     const [loading, setLoading]=useState(false);
//     const OnClickNext=async()=>{
//         setLoading(true);
//         const result=await createDiscussionRoom({
//         topic:topic,
//         coachingOption:coachingOption ?. name,
//         expertName: selectedExpert
        
//         })
//         console.log(result);
//         setLoading(false);
//     }
// return (
//     <Dialog>
//     <DialogTrigger>{children}</DialogTrigger>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>{CoachingOptions.name}</DialogTitle>
//         <DialogDescription aschild>
//           <div className='mt-3'>
//             <h2 className='text-black'>
//             Enter a Topic to Master Your Skills in {CoachingOptions.name}
//             </h2>
//             <Textarea placeholder='Enter Your Topic here...' onChange={(e) => setTopic(e. target.value)} className='mt-2'/>
//             <h2 className='text-black mt-4'>
//             Select Your Expert For {CoachingOptions.name}
//             </h2>
//             <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
//             {CoachingExpert.map((expert,index)=>(
//                 <div key={index} onClick={()=>setSelectedExpert(expert.name)} className={` p-1 rounded-2xl`}>
// <Image src={expert.avatar} alt={expert.name}
// width={140}
// height={140}
// className = {`${selectedExpert==expert.name&& 'border'} rounded-2xl h-[120px] w-[140px] object-cover mt-3 hover:scale-105 transition-all cursor-pointer p-1 border-chart-4`}
// />
//                <h2 className='text-center'>{expert.name}</h2>
// </div>
//             ))}
//             </div>
//             <div className='flex gap-5 justify-end mt-5'>
//                 <DialogClose aschild>
//                 <Button variant={'ghost'}>Cancel</Button>
//                 </DialogClose>
               
//                 <Button disabled={(!topic || !selectedExpert || laoding) } onClick={OnClickNext}>{loading&& <LoaderCircle className='animate-spin'/>} Next</Button>
//             </div>
//           </div>
//         </DialogDescription>
//       </DialogHeader>
//     </DialogContent>
//   </Dialog>

// )

// }

// export default UserInputDialog



// "use client";

// import React, { useState } from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { CoachingExpert } from "@/services/Options";
// import Image from "next/image";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";  // ✅ Ensure Correct API Import
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import { useRouter } from "next/router";

// function UserInputDialog({ children, CoachingOptions }) {
//   const [selectedExpert, setSelectedExpert] = useState(null);
//   const [topic, setTopic] = useState("");
//   const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
//   const [loading, setLoading] = useState(false);
//   const [openDialog, setOpenDialog]=useState(false);
//    const router=useRouter();
//   const onClickNext = async () => {
//     if (!topic || !selectedExpert) return;

//     setLoading(true);
//     try {
//       const result = await createDiscussionRoom({
//         topic: topic,
//         coachingOption: CoachingOptions?.name,
//         expertName: selectedExpert,
//       });
//       console.log(result);
//     } catch (error) {
//       console.error("Error creating discussion room:", error);
//     }
//     setLoading(false);
//     setOpenDialog(false);
//     router.push('/discussion-room/'+result);  
//   };

//   return (
//     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{CoachingOptions?.name}</DialogTitle>
//           <DialogDescription asChild>
//             <div className="mt-3">
//               <h2 className="text-black">
//                 Enter a Topic to Master Your Skills in {CoachingOptions?.name}
//               </h2>
//               <Textarea
//                 placeholder="Enter Your Topic here..."
//                 onChange={(e) => setTopic(e.target.value)}
//                 className="mt-2"
//               />
//               <h2 className="text-black mt-4">
//                 Select Your Expert For {CoachingOptions?.name}
//               </h2>
//               <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
//                 {CoachingExpert.map((expert, index) => (
//                   <div
//                     key={index}
//                     onClick={() => setSelectedExpert(expert.name)}
//                     className={`p-1 rounded-2xl cursor-pointer ${
//                       selectedExpert === expert.name ? "border-2 border-blue-500" : ""
//                     }`}
//                   >
//                     <Image
//                       src={expert.avatar}
//                       alt={expert.name}
//                       width={140}
//                       height={140}
//                       className="rounded-2xl h-[120px] w-[140px] object-cover mt-3 hover:scale-105 transition-all"
//                     />
//                     <h2 className="text-center">{expert.name}</h2>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex gap-5 justify-end mt-5">
//                 <DialogClose asChild>
//                   <Button variant="ghost">Cancel</Button>
//                 </DialogClose>
//                 <Button disabled={!topic || !selectedExpert || loading} onClick={onClickNext}>
//                   {loading && <LoaderCircle className="animate-spin mr-2" />} Next
//                 </Button>
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default UserInputDialog;












"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CoachingExpert } from "@/services/Options";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"; // ✅ Ensure Correct API Import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Correct Import

function UserInputDialog({ children, CoachingOptions }) {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [topic, setTopic] = useState("");
  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter(); // ✅ Correct Import

  const onClickNext = async () => {
    if (!topic || !selectedExpert) return;

    setLoading(true);
    try {
      const result = await createDiscussionRoom({
        topic: topic,
        coachingOption: CoachingOptions?.name,
        expertName: selectedExpert,
      });

      console.log(result);
      
      if (result) {
        router.push(`/discussion-room/${result}`); // ✅ Ensure result exists before navigating
      }
    } catch (error) {
      console.error("Error creating discussion room:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{CoachingOptions?.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2 className="text-black">
                Enter a Topic to Master Your Skills in {CoachingOptions?.name}
              </h2>
              <Textarea
                placeholder="Enter Your Topic here..."
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2"
              />
              <h2 className="text-black mt-4">
                Select Your Expert For {CoachingOptions?.name}
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                {CoachingExpert.map((expert, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedExpert(expert.name)}
                    className={`p-1 rounded-2xl cursor-pointer ${
                      selectedExpert === expert.name ? "border-2 border-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={expert.avatar}
                      alt={expert.name}
                      width={140}
                      height={140}
                      className="rounded-2xl h-[120px] w-[140px] object-cover mt-3 hover:scale-105 transition-all"
                    />
                    <h2 className="text-center">{expert.name}</h2>
                  </div>
                ))}
              </div>
              <div className="flex gap-5 justify-end mt-5">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button disabled={!topic || !selectedExpert || loading} onClick={onClickNext}>
                  {loading && <LoaderCircle className="animate-spin mr-2" />} Next
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UserInputDialog;
