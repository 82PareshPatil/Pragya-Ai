// import React from 'react'
// import AppHeader from './components/AppHeader'
// // import { ConvexProvider, ConvexReactClient } from "convex/react";
// function DashboardLayou({ children }) {
// return (
//     // <ConvexProvider client={convex}>
// <div>
// <AppHeader />

// <div className='p-10 mt-20 md:px-14 lg:px-32 xl:px-56 2xl:px-72'>
// {children}
// </div>
// </div>
// // </ConvexProvider>
// )
// }
// export default DashboardLayou

"use client";
import React from "react";
import AppHeader from "./components/AppHeader";
import { ConvexProvider, ConvexReactClient } from "convex/react";

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);


function DashboardLayout({ children }) {
  return (
    <ConvexProvider client={convex}>
      <div>
        <AppHeader />
        <div className="p-10 mt-20 md:px-14 lg:px-32 xl:px-56 2xl:px-72">
          {children}
        </div>
      </div>
    </ConvexProvider>
  );
}

export default DashboardLayout;
