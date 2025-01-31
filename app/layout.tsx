import "./globals.css";

export const metadata = {
  title: "KOWAVE - 날씨 정보 대시보드 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
