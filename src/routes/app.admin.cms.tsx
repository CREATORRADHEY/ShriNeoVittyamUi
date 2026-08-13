import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Globe, RefreshCw, Send, CheckCircle2, AlertTriangle, Eye, ArrowRight } from "lucide-react";
import { PortalShell, SectionCard } from "@/components/portal/portal-shell";
import { KpiCard, StatusBadge } from "@/components/states";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin/cms")({
  head: () => ({
    meta: [
      { title: "CMS Management — ShriNeo Capital" },
      { name: "description", content: "Manage public pages, translations, and preview publish cycles." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminCmsPage,
});

interface CmsPageItem {
  id: string;
  slug: string;
  category: string;
  hindiTranslation: "Complete" | "Missing" | "In Progress";
  updatedAt: string;
  status: "Published" | "Draft" | "Awaiting Approval" | "Staging Preview";
}

function AdminCmsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPageId, setSelectedPageId] = useState<string>("CMS-01");
  const [previewBuilding, setPreviewBuilding] = useState(false);

  const [pages, setPages] = useState<CmsPageItem[]>([
    { id: "CMS-01", slug: "/loans/personal", category: "Product", hindiTranslation: "Complete", updatedAt: "11 Mar 2026", status: "Published" },
    { id: "CMS-02", slug: "/trust-center/security", category: "Compliance", hindiTranslation: "Complete", updatedAt: "09 Mar 2026", status: "Published" },
    { id: "CMS-03", slug: "/blog/apr-and-fees", category: "Editorial", hindiTranslation: "Missing", updatedAt: "12 Mar 2026", status: "Awaiting Approval" },
    { id: "CMS-04", slug: "/loans/home", category: "Product", hindiTranslation: "In Progress", updatedAt: "Today", status: "Draft" },
  ]);

  const selectedPage = pages.find(p => p.id === selectedPageId);

  const handleTriggerPreview = (id: string) => {
    setPreviewBuilding(true);
    toast.info("CMS staging rebuild started. Generating secure content preview...");
    setTimeout(() => {
      setPreviewBuilding(false);
      setPages(prev => prev.map(p => p.id === id ? { ...p, status: "Staging Preview" } : p));
      toast.success("Staging preview link generated: https://preview.shrineo.in/draft-04a29");
    }, 1500);
  };

  const handlePublish = (id: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, status: "Published", updatedAt: "Just now" } : p));
    toast.success("Content published successfully to ShriNeo production CDN.");
  };

  const filteredPages = pages.filter(p =>
    p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalShell
      role="admin"
      title="Content Management (CMS)"
      subtitle="Manage public pages, localization records and preview publish cycles"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Published pages" value={String(pages.filter(p => p.status === "Published").length)} hint="Active on production" />
        <KpiCard label="Awaiting approval" value={String(pages.filter(p => p.status === "Awaiting Approval").length)} hint="Compliance review required" tone="warning" />
        <KpiCard label="Draft files" value={String(pages.filter(p => p.status === "Draft").length)} hint="Under active editing" />
        <KpiCard label="Missing Hindi" value={String(pages.filter(p => p.hindiTranslation === "Missing").length)} hint="Localization gap" tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1.2fr] mt-6 text-xs">
        {/* Table list */}
        <SectionCard title="Content Inventory" description="Click a page row to configure publish cycle options">
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search page slug or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-border bg-background pl-8 pr-3 py-1.5 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border text-left uppercase tracking-wider text-muted-foreground bg-surface">
                    <th scope="col" className="p-3">Page Slug</th>
                    <th scope="col" className="p-3">Category</th>
                    <th scope="col" className="p-3">Hindi Translation</th>
                    <th scope="col" className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map(p => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPageId(p.id)}
                      className={`border-b border-border hover:bg-neutral-50 cursor-pointer ${selectedPageId === p.id ? "bg-primary/5 font-semibold" : ""}`}
                    >
                      <td className="p-3 font-mono text-foreground">{p.slug}</td>
                      <td className="p-3 text-muted-foreground">{p.category}</td>
                      <td className="p-3">
                        <StatusBadge tone={p.hindiTranslation === "Complete" ? "success" : p.hindiTranslation === "In Progress" ? "warning" : "error"}>
                          {p.hindiTranslation}
                        </StatusBadge>
                      </td>
                      <td className="p-3">
                        <StatusBadge tone={p.status === "Published" ? "success" : p.status === "Awaiting Approval" ? "warning" : p.status === "Staging Preview" ? "info" : "neutral"}>
                          {p.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* CMS Preview Publish controller card */}
        <div>
          {selectedPage ? (
            <SectionCard title="Publish Cycle & Preview">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Target Slug</span>
                  <span className="font-mono text-sm font-semibold text-[#002B98]">{selectedPage.slug}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded bg-surface border p-3">
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Category</span>
                    <span className="font-medium text-foreground mt-0.5 block">{selectedPage.category}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Last Updated</span>
                    <span className="font-medium text-foreground mt-0.5 block">{selectedPage.updatedAt}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-3">
                  <h4 className="font-bold text-foreground">Staging Preview & QA</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Configure a temporary staging preview to review visual alignment and layout responsiveness before deployment.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1.5"
                      onClick={() => handleTriggerPreview(selectedPage.id)}
                      disabled={previewBuilding}
                    >
                      {previewBuilding ? (
                        <>
                          <RefreshCw className="size-3.5 animate-spin" /> Building...
                        </>
                      ) : (
                        <>
                          <Eye className="size-3.5" /> Start Preview Cycle
                        </>
                      )}
                    </Button>

                    {selectedPage.status === "Staging Preview" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:underline"
                        onClick={() => window.open("https://preview.shrineo.in/draft-04a29", "_blank")}
                      >
                        Launch Preview URL <ArrowRight className="size-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-3">
                  <h4 className="font-bold text-foreground">Production Release</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Promote draft changes to the global production CDN. This action invalidates the cache for all regional edge locations.
                  </p>

                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center gap-1.5"
                    onClick={() => handlePublish(selectedPage.id)}
                    disabled={selectedPage.status === "Published" || previewBuilding}
                  >
                    <Globe className="size-4" /> Publish to Production
                  </Button>
                </div>
              </div>
            </SectionCard>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
              Select a page from the inventory to manage its preview publish cycle.
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
