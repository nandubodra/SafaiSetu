import './globals.css';

export const metadata = {
  title: 'SafaiSetu',
  description: 'Civic issue reporting and tracking platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
