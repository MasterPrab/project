import Link from "next/link";
import styles from './topmenu.module.css';

interface TopMenuItemProps {
    title: string;
    pageRef: string;
}

export default function TopMenuItem({ title, pageRef }: TopMenuItemProps) {
    return (
        <Link href={pageRef} className={styles.itemcontainer} aria-label={title}>
            {title}
        </Link>
    );
}