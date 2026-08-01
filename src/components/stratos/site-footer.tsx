export function SiteFooter() {
  return (
    <footer className="flex flex-col justify-between gap-8 border-t border-border px-6 py-12 text-sm text-muted-foreground md:flex-row">
      <p>&copy; {new Date().getFullYear()} Stratos Technologies Inc. All rights reserved.</p>
      <nav aria-label="Legal" className="flex flex-wrap gap-8">
        <a href="#top" className="transition-colors hover:text-foreground">
          Privacy Policy
        </a>
        <a href="#top" className="transition-colors hover:text-foreground">
          Terms of Service
        </a>
        <a href="#top" className="transition-colors hover:text-foreground">
          Status
        </a>
      </nav>
    </footer>
  );
}
