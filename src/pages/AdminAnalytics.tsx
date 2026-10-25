import { useQuery } from "@tanstack/react-query";
import { BarChart3, Clock3, Eye, FileText } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSEO } from "@/components/PageSEO";
import { SEO_PAGES } from "@/lib/seo/site-config";
import { pageViewsApi } from "@/lib/db";

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/products": "Products",
  "/services": "Services",
  "/about": "About",
  "/contact": "Contact",
  "/checkout": "Checkout",
};

function getPageLabel(path: string) {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  if (path.startsWith("/product/")) return "Product details";
  return "Other page";
}

function formatVisitedAt(createdAt: { toDate: () => Date } | null) {
  if (!createdAt) return "Just now";
  return format(createdAt.toDate(), "MMM d, yyyy · h:mm a");
}

const AdminAnalytics = () => {
  const { data: visits = [], isLoading, isError, error } = useQuery({
    queryKey: ["pageViews"],
    queryFn: pageViewsApi.listRecent,
  });

  const pageCounts = visits.reduce<Record<string, number>>((counts, visit) => {
    counts[visit.path] = (counts[visit.path] ?? 0) + 1;
    return counts;
  }, {});
  const popularPages = Object.entries(pageCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5);
  const highestPageCount = popularPages[0]?.[1] ?? 1;
  const uniquePages = Object.keys(pageCounts).length;

  return (
    <>
      <PageSEO {...SEO_PAGES.adminAnalytics} />
      <main className="container-px py-10">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BarChart3 className="w-4 h-4" />
              Site analytics
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Pages visitors open</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recent page visits, without collecting visitor identities.
            </p>
          </div>

          {isLoading ? (
            <p className="py-16 text-center text-muted-foreground">Loading page visits...</p>
          ) : isError ? (
            <p className="py-16 text-center text-destructive">
              {(error as Error).message || "Failed to load page visits"}
            </p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent page views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{visits.length}</p>
                    <CardDescription>Latest 200 visits</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Different pages visited</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{uniquePages}</p>
                    <CardDescription>In the latest 200 visits</CardDescription>
                  </CardContent>
                </Card>
              </div>

              {visits.length === 0 ? (
                <div className="rounded-xl border border-border bg-surface py-16 text-center">
                  <BarChart3 className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">No page visits yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Visits from the public site will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most visited pages</CardTitle>
                      <CardDescription>Based on the latest 200 visits</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {popularPages.map(([path, count]) => (
                        <div key={path} className="space-y-2">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="truncate font-medium">{getPageLabel(path)}</span>
                            <span className="shrink-0 text-muted-foreground">{count} visits</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-accent"
                              style={{ width: `${(count / highestPageCount) * 100}%` }}
                            />
                          </div>
                          <p className="truncate text-xs text-muted-foreground">{path}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock3 className="h-4 w-4" />
                        Recent visits
                      </CardTitle>
                      <CardDescription>Most recent page opens first</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="border-b border-border text-left text-muted-foreground">
                            <tr>
                              <th className="pb-3 pr-4 font-medium">Page</th>
                              <th className="whitespace-nowrap pb-3 text-right font-medium">
                                Visited at
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {visits.map((visit) => (
                              <tr key={visit.id}>
                                <td className="py-3 pr-4">
                                  <p className="font-medium">{getPageLabel(visit.path)}</p>
                                  <p className="mt-0.5 max-w-56 truncate text-xs text-muted-foreground">
                                    {visit.path}
                                  </p>
                                </td>
                                <td className="whitespace-nowrap py-3 text-right text-muted-foreground">
                                  {formatVisitedAt(visit.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminAnalytics;
