import Image from "next/image";
import { Inter } from "next/font/google";
import MainHome from "../components/MainHome";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <MainHome/>
      </div>
    </>
  );
}