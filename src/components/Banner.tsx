'use client'
import styles from './banner.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Banner(){
    const {data:session} = useSession()
    console.log(session)
    const router= useRouter()
    
    return(
     <div className = {styles.banner}>
        <Image src={'/img/messagecover.png'}
            alt = 'cover'
            layout='fill'
            priority
            objectFit='cover'/>

            <button 
                className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent'
                onClick={(e) => { e.stopPropagation(); router.push('/course') }}
            >
                Select Shop
            </button>
            
     </div>   

     
    );
}