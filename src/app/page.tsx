import Image from "next/image";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Banner/>
      <div style={{margin:"25px", display:'flex',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",
        alignContent:"space-around"}}>
        <Card/>
        </div>
    </main>
  );
}
