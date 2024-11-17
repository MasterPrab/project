import styles from './card.module.css';
import Image from 'next/image';

export default function Card({ title, imageSrc }: { title: string; imageSrc: string }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardimg}>
        <Image
          src={imageSrc}
          alt={title}
          fill={true}
          objectFit="cover"
        />
      </div>
      <div className={styles.cardText}>{title}</div>
    </div>
  );
}