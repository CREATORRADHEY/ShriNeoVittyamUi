import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { RouteTransition } from "@/components/motion/route-transition";
import { CookieConsent } from "@/components/motion/cookie-consent";
import { FullPageState, referenceStamp } from "@/components/states/full-page";
import { NotFoundPage } from "@/components/states/negative-pages";
import { PrototypeToolbar } from "@/components/prototype/toolbar";
import { PrototypeProvider } from "@/prototype/state";
import { I18nProvider } from "../i18n";
import { reportLovableError } from "../lib/lovable-error-reporting";


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <FullPageState
      code="500"
      title="We couldn't load this page."
      explanation="Something failed on our side while preparing this page. It isn't caused by anything you did."
      safety="Your information is safe. No application was submitted, changed or withdrawn."
      tone="error"
      reference={referenceStamp("SNV-ERR")}
      support="If this keeps happening, quote the reference above when you contact us."
      showSupportPanel
      actions={[
        {
          label: "Try again",
          onClick: () => {
            router.invalidate();
            reset();
          },
        },
        { label: "Return to homepage", to: "/", variant: "outline" },
        { label: "Contact support", to: "/contact", variant: "ghost" },
      ]}
      figure="system"
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ShriNeo Capital — Bharat Ka Digital Lending Partner" },
      {
        name: "description",
        content:
          "ShriNeo Capital is a vernacular-first digital lending platform. Compare personal, business, home and mortgage loan offers from participating banks and NBFCs.",
      },
      { name: "author", content: "SHRINEO VITTIYAM PRIVATE LIMITED" },
      { property: "og:site_name", content: "ShriNeo Capital" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150} skipDelayDuration={300}>
        <I18nProvider>
          <PrototypeProvider>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <RouteTransition>
              <Outlet />
            </RouteTransition>
            <Toaster />
            <CookieConsent />
            <PrototypeToolbar />
          </PrototypeProvider>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

