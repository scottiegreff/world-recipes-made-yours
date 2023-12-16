import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "./context/AuthProvider";
import { ThemeProvider } from "../app/context/ThemeProvider";
import NavMenu from "./components/NavMenu";
import { authOptions } from "@/lib/authOptions";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Recipe App",

  description:
    "An app that uses AI to generate recipes based on the users dietary restrictions and preferences.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="true"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <main className="flex flex-col justify-center items-center">
              <NavMenu />
              {children}
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
