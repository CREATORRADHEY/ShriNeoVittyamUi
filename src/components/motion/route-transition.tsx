import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Route content transition.
 *
 * Public and borrower/agent routes fade up by 8px; lender and admin
 * workspaces crossfade only, so table scanning is never interrupted.
 * Persistent chrome (header, sidebar, bottom nav) is rendered by the routes
 * themselves and is not re-keyed here, so it never re-animates.
 *
 * After a real navigation, keyboard focus moves to the new page's H1 so
 * screen-reader and keyboard users start at the top of the new content. The
 * first render is left alone: nothing has changed for the visitor yet.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const operational = pathname.startsWith("/app/lender") || pathname.startsWith("/app/admin");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const heading = document.querySelector<HTMLElement>("main h1");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div key={pathname} className={operational ? "route-enter-flat" : "route-enter"}>
      {children}
    </div>
  );
}
