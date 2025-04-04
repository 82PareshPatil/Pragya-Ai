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
"use client";

import Image from "next/image";
import { StackHandler, UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-background">
      <h1 className="text-2xl font-semibold mb-6">New project coming soon!</h1>

      <Button
        onClick={() => router.push("/dashboard")}
        className="text-lg px-6 py-3 rounded-xl"
      >
        Get Started
      </Button>

      <div className="absolute top-5 right-5">
        <UserButton />
      </div>
    </div>
  );
}
