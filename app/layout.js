import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageModal from "@/components/LanguageModal";
import ChatAssistant from "@/components/ChatAssistant";
import "./globals.css";

export const metadata = {
  title: "MedicTravel - Turismo Médico de Calidad",
  description: "Descubre las mejores clínicas y especialidades médicas. Turismo médico de primera clase con atención personalizada.",
  keywords: "turismo médico, clínicas, especialidades médicas, tratamientos, salud",
  openGraph: {
    title: "MedicTravel - Turismo Médico de Calidad",
    description: "Descubre las mejores clínicas y especialidades médicas.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <LanguageModal />
          <Navbar />
          {children}
          <ChatAssistant />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
