import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';

export default function TopMenu() {
  return (
    <div className={styles.menucontainer}>
      {/* Logo as a clickable link to the home page */}
      <Link href="/">
        <Image 
          src="/img/messagelogo.jpg" 
          className={styles.logoimg} 
          alt="logo" 
          width={50}  // Set appropriate dimensions
          height={50} 
          priority // Ensures faster load time
        />
      </Link>

      {/* Navigation Menu Items */}
      <TopMenuItem title="Select Course" pageRef="/course" />
      <TopMenuItem title="Your Reservation" pageRef="/reservation" />
      <TopMenuItem title="about us" pageRef="/about" />
    </div>
  );
}