import styles from './card.module.css'
import Image from 'next/image'

export default function Card(){
    return(
        <div className = {styles.card}>
            <div className = {styles.cardimg}>
                <Image src = {'/img/vaccine.jpg'}
                alt='Vaccine'
                fill = {true}
                objectFit='cover'
                />
            </div>
            <div className = {styles.cardText}>Vaccine1</div>
        </div>

    );


}