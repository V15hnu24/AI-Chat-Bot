import Image from "next/image";
import { Inter } from "next/font/google";
import Body from "../components/Body";
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