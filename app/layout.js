import "./globals.css";

export const metadata = {
  title: "Oracle EPM Talks",
  description: "Insights, tips, and deep dives on Oracle EPM — Planning, Essbase, EDM, FDMEE, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="site-logo">
              Oracle EPM Talks <span>/ blog</span>
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} Oracle EPM Talks · Practical insights for EPM professionals.
          </div>
        </footer>
      </body>
    </html>
  );
}
