import About from "@components/About";
import FloatingSlogan from "@components/FloatingSlogan";
import Header from "@components/Header";
import HomeStage from "@components/HomeStage";
import SelectedWorks from "@components/SelectedWorks";
import Footer from "@components/Footer";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home() {
  const year = await copyrightYear();

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <HomeStage />
      <About />
      <SelectedWorks />
      <FloatingSlogan />
      <Footer year={year} />
    </div>
  );
}
