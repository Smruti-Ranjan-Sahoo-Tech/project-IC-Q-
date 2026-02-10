import React, { useState } from 'react'

const Rudra = () => {
    const [data,setData]=useState("user")

  return (
    <div className='w-dvw h-dvh bg-white/10 flex justify-center items-center'>

        <div className=' bg-white w-md p-2 rounded-2xl'>
            <div className='flex flex-row justify-around'>
                <button className=' text-3xl font-bold '  onClick={()=>setData('user')}>User</button>
                <button className=' text-3xl font-bold '  onClick={()=>setData('admin')}>Admin</button>
            </div>
           {
            data==="admin"?<div className='text-4xl text-blue-700'>Admin</div>:<div className='text-4xl text-blue-700'>User</div>
           }
        
        </div>
    </div>
  )
}

export default Rudra