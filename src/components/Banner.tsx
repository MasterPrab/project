import styles from './banner.module.css'
import Image from 'next/image'

export default function Banner(){
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