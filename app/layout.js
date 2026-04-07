import "./globals.css";
import { DemoAppProvider } from "../components/DemoAppState";

export const metadata = {
  title: "Pulse Market Demo",
  description: "A bilingual Polymarket-style multi-page Next.js demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <DemoAppProvider>{children}</DemoAppProvider>
      </body>
    </html>
  );
}
