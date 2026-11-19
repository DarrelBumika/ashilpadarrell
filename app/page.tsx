import About from "@components/sections/About";
import Experiences from "@components/sections/Experiences";
import FloatingSlogan from "@components/ui/FloatingSlogan";
import Footer from "@components/sections/Footer";
import Header from "@components/sections/Header";
import HomeStage from "@components/sections/HomeStage";
import SelectedWorks from "@components/sections/SelectedWorks";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home() {
  const year = await copyrightYear();

  return (
    <main id="main" className="flex flex-1 flex-col bg-white">
      <Header />
      <HomeStage />
      <About />
      <SelectedWorks />
      <Experiences />
      <FloatingSlogan />
      <Footer year={year} />
    </main>
  );
}
