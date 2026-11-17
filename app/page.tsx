import About from "@components/About";
import Header from "@components/Header";
import HomeStage from "@components/HomeStage";
import SelectedWorks from "@components/SelectedWorks";
import Slogan from "@components/Slogan";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <HomeStage />
      <About />
      <SelectedWorks />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-8">
        <Slogan />
      </div>
    </div>
  );
}
