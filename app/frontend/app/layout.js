import "./styles/globals.css";

export const metadata = {
  title: "Prática de Inglês",
  description: "Pratique vocabulário e frases em inglês",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
