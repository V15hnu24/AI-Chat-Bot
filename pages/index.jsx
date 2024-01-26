import Image from "next/image";
import { Inter } from "next/font/google";
import Body from "../components/Body";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Body/>
      </div>
    </>
  );
}