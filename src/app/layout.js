import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  title: "Jain Jewellers | Premium Indian Jewellery",
  description:
    "Discover timeless elegance with Jain Jewellers. Explore exquisite gold, diamond and silver jewellery collections crafted for every occasion.",
  openGraph: {
    title: "Jain Jewellers | Premium Indian Jewellery",
    description:
      "Discover timeless elegance with Jain Jewellers. Explore exquisite gold, diamond and silver jewellery collections crafted for every occasion.",
    type: "website",
    locale: "en_IN",
    siteName: "Jain Jewellers",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-charcoal font-sans">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
