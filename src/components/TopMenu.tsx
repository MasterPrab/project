import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.menucontainer}>
      {/* Logo as a clickable link to the home page */}
      <Link href="/">
        <Image 
          src="/img/messagelogo.jpg" 
          className={styles.logoimg} 
          alt="Company Logo" 
          width={50} 
          height={50} 
          priority
        />
      </Link>

      {/* Navigation Menu Items */}
      <TopMenuItem title="Select Shops" pageRef="/course" />
      <TopMenuItem title="Your Reservation" pageRef="/cart" />
      <TopMenuItem title="About Us" pageRef="/about" />
    
      {/* Conditional Sign-In / Sign-Out based on session */}
      {session ? (
        <Link href="/api/auth/signout">
          <div className={`${styles.authButton} ${styles.signOut}`}>
            Sign out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className={`${styles.authButton} ${styles.signIn}`}>
            Sign In
          </div>
        </Link>
      )}
    </div>
  );
}