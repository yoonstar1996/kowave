import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-5 bg-[#222] p-5 text-white">
      <div className="mx-auto max-w-[1536px]">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
