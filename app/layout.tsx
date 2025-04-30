import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SaasPdf",
  description: "Summaries of pdf..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased `}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main>{children}</main>
            {/* <Footer /> */}
            <Toaster position="top-right" closeButton theme="light" />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
