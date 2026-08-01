import logo from "@/assets/shrineo-logo-tagline.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="flex flex-col justify-between gap-8 border-t border-border px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <img
          src={logo.url}
          alt="ShriNeo Capital — Your dreams, our responsibility"
          width={72}
          height={72}
          loading="lazy"
          className="h-18 w-18 object-contain"
        />
        <p>&copy; {new Date().getFullYear()} ShriNeo Capital. All rights reserved.</p>
      </div>
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
