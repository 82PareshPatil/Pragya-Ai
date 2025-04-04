"use client"
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react'

import React, { useEffect } from 'react'

function Authprovoder({ children }) {

const user=useUser();
const CreateUser=useMutation(api.user.CreateUser); 
const [userData, setUserData]=useState();
useEffect(()=>{
    user&&CreateNewUser();
    console.log(user);
}, [user] )
const CreateNewUser=async()=>{
    const result=await CreateUser({
    name: user ?. displayName,
    email:user.primaryEmail
});
    console. log(result) ;
    setUserData(result);
  
}
return (
<div>
    <UserContext.provider value={{userData,setUserData}}>
    {children}
    </UserContext.provider>

</div>

)
}
export default Authprovoder