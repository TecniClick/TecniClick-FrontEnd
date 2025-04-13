import type { Metadata } from "next";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sonner";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: "TecniClick",
  description: "Los mejores Servicios Profesionales del Hogar al alcance de un Click!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <nav className="w-full bg-gradient-navbar p-4 shadow-lg">
            <NavBar />
          </nav>
          <main>{children}</main>
          <Toaster position="top-center" richColors theme="system" />
          <footer className="mt-auto">
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
