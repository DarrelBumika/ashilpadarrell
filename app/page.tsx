import Header from "@components/Header";
import Hero from "@components/Hero";
import Image from "next/image";
import MeImage from "@src/img/me.png";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white p-8 relative">
      <Header />
      <Hero />
      <Image
            src={MeImage}
            alt="line"
            className="absolute right-0 h-screen w-auto object-cover mask-[linear-gradient(to_bottom,black_20%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
          />
    </div>
  );
}
