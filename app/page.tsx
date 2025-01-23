import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1280px] bg-black p-5 text-white">
      <Header />
      <Main />
      <footer>푸터입니다</footer>
    </div>
  );
}
