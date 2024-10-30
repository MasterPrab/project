import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';

export default function TopMenu(){
    return(
        <div className= {styles.menucontainer} >
            <Image src = {'/img/logo.jpg'} className = {styles.logoimg} 
            alt = 'logo' 
            height={0} 
            width = {0} 
            sizes = '100vh'/>

        </div>
    );
}