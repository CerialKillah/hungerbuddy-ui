import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../../storage/ReduxProvider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}
        suppressHydrationWarning
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
