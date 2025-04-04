import React from 'react'
import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
function AppHeader() {
return (
<div className='p-3 shadow-sm flex justify-between item-center'>
<Image src={"/logo1.png"} alt='logo'
width={160}
height={150}
/>
<UserButton />
</div>
)
}

export default AppHeader