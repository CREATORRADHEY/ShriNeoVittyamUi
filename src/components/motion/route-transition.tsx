import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Route content transition.
 *
 * Public and borrower/agent routes fade up by 8px; lender and admin
 * workspaces crossfade only, so table scanning is never interrupted.
 * Persistent chrome (header, sidebar, bottom nav) is rendered by the routes
 * themselves and is not re-keyed here, so it never re-animates.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const operational = pathname.startsWith("/app/lender") || pathname.startsWith("/app/admin");

  return (
    <div key={pathname} className={operational ? "route-enter-flat" : "route-enter"}>
      {children}
    </div>
  );
}
