import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="max- mx-auto flex w-full max-w-[1536px] flex-col gap-5 bg-[#222] p-5 text-white">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
