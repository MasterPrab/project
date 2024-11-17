import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Banner />
      <div className={styles.cardContainer}>
        <Card title="Massage Shop 1" imageSrc="/img/spa1.jpg" />
        <Card title="Massage Shop 2" imageSrc="/img/spa2.png" />
        <Card title="Massage Shop 3" imageSrc="/img/spa3.jpg" />
      </div>
      {/* Text and clickable link */}
      <div className={styles.reserveText}>
        <p>If you want to reserve, click <Link href="/course"><span className={styles.clickHere}>here!!!</span></Link></p>
      </div>
    </main>
  );
}