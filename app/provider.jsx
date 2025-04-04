"use client"
import React, { Suspense } from 'react'
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Authprovoder from "./Authprovoder";


function Provider({children}){
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
return (
<Suspense fallback={<p>Loading ...</p>}>
<ConvexProvider client={convex}>
    
    <Authprovoder> 
    {children}
    </Authprovoder>
    </ConvexProvider></Suspense>

)
}



export default provider;