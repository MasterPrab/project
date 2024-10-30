import styles from './banner.module.css'
import Image from 'next/image'

export default function Banner(){
    return(
     <div className = {styles.banner}>
        <Image src={'/img/cover.jpg'}
            alt = 'cover'
            layout='fill'
            priority
            objectFit='cover'/>
            <div className = {styles.bannerText}>
                <h1>Vaccine Service Center</h1>
                
            </div>
     </div>   
    );
}