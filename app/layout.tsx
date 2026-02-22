import './globals.css';

export const metadata = {
  title: 'The Great Indian Budget',
  description: 'Institutional Grade Budget Analytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}