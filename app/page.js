// import Image from "next/image";
// import { StackHandler, UserButton } from "@stackframe/stack";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-background">
//       <h1 className="text-2xl font-semibold mb-6">New project coming soon!</h1>
      
//       <Button
//         onClick={() => router.push("/dashboard")}
//         className="text-lg px-6 py-3 rounded-xl"
//       >
//         Get Started
//       </Button>

//       <div className="absolute top-5 right-5">
//         <UserButton />
//       </div>
//     </div>
//   );
// }
// "use client";

// import Image from "next/image";
// import { StackHandler, UserButton } from "@stackframe/stack";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-background">
//       <h1 className="text-2xl font-semibold mb-6">New project coming soon!</h1>

//       <Button
//         onClick={() => router.push("/dashboard")}
//         className="text-lg px-6 py-3 rounded-xl"
//       >
//         Get Started
//       </Button>

//       <div className="absolute top-5 right-5">
//         <UserButton />
//       </div>
//     </div>
//   );
// }



// yotube video 

"use client";

import Image from "next/image";
import { StackHandler, UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-background px-4 relative text-center">
      {/* UserButton Top Right */}
      <div className="absolute top-5 right-5">
        <UserButton />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        New Project Coming Soon!
      </h1>

      {/* Responsive YouTube Video */}
      <div className="w-full max-w-3xl aspect-video mb-8">
        <iframe
          className="w-full h-full rounded-2xl shadow-lg"
          src="https://www.youtube.com/embed/dkhuH0089b4"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Get Started Button */}
      <Button
        onClick={() => router.push("/dashboard")}
        className="text-lg px-6 py-3 rounded-xl"
      >
        Get Started
      </Button>
    </div>
  );
}
