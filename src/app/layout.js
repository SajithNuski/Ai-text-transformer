import { Inter, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Text Transformer",
  description: "Summarize, rewrite, and translate text with a premium developer interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
