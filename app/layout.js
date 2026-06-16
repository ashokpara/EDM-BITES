import "./globals.css";

export const metadata = {
  title: "Oracle EDM",
  description: "Your home for electronic dance music — drops, artists, festivals, and culture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="site-logo">
              Oracle EDM <span>/ blog</span>
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} Oracle EDM · The set never ends.
          </div>
        </footer>
      </body>
    </html>
  );
}
