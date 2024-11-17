'use client'
import { Session } from 'inspector';
import styles from './banner.module.css'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

export default function Banner(){
    const {data:session} = useSession()
    console.log(session)
    
    return(
     <div className = {styles.banner}>
        <Image src={'/img/messagecover.png'}
            alt = 'cover'
            layout='fill'
            priority
            objectFit='cover'/>
            <div className = {styles.bannerText}>
                <h1>Welcome to Message Shop</h1>
                
            </div>
     </div>   
    );
}