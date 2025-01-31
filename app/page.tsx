import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 bg-[#222] p-5 text-white">
      <main className="mx-auto max-w-[1536px]">
        <Header />
        <Main />
        <Footer />
      </main>
    </div>
  );
}

/**
 * 사용한 API
 * 날씨 API: weatherbit.io
 * 상태 관리: zustand
 * CSS: tailwind.css
 * 단순 컴포넌트: shadcn ui
 */
