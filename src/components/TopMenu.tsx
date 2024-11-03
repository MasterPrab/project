import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import { ServerSession } from 'mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function TopMenu() {
  const session = await getServerSession(authOptions)
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
          priority // Ensures faster load times
        />
      </Link>

      {/* Navigation Menu Items */}
      <TopMenuItem title="Select Shops" pageRef="/course" />
      <TopMenuItem title="Your Reservation" pageRef="/reservation" />
      <TopMenuItem title="about us" pageRef="/about" />
    
      {
      session? <Link href="/api/auth/signout"> 
          <div className='flex items-center absolute right-0 h-full px-2 text-cyan-600 text-sm'>
          Sign-out of {session.user?.name}</div> </Link>
      :<Link href="/api/auth/signin">
          <div className='flex items-center absolute right-0 h-full px-2 text-cyan-600 text-sm'>
          Sign-In</div></Link>

  }
    </div>
    


);

}