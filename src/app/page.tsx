import Image from "next/image";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import styles from "./page.module.css";


export default function Home() {
  return (
    <main>
      <div>
        <Banner/>
      </div>
    </main>
  );
}
