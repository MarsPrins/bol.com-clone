import Image from "next/image";
import styles from "@/styles/page.module.scss";
import Feautured from "@/components/main/Feautured";
import CategoryList from "@/components/main/CategoryList";
import SaleList from "@/components/main/SaleList";
import BigPromo from "@/components/main/DagDeal";
import { Suspense } from "react";
import New from "@/components/main/New";
import AanbiedingRij from "@/components/main/AanbiedingRij";

export default function Home() {
  return (
    <main className={styles.main}>
      <Feautured />
      <CategoryList />
      <SaleList />
      <BigPromo />
      <New />
      <AanbiedingRij />
    </main>
  );
}
