import Image from "next/image";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import styles from "./page.module.css";
import TopMenu from "@/components/TopMenu";

export default function Home() {
  return (
    <main>
      <div>
        <TopMenu/>
        <Banner/>
      </div>
    </main>
  );
}
