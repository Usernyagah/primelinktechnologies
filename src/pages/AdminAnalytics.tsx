import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CalendarDays,
  Clock3,
  Eye,
  MousePointer2,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSEO } from "@/components/PageSEO";
import { SEO_PAGES } from "@/lib/seo/site-config";
import { pageViewsApi } from "@/lib/db";
import {
  buildPagePerformance,
  buildTrafficBuckets,
  buildVisitorMetrics,
  getAnalyticsRangeStart,
  type AnalyticsRange,
} from "@/lib/analytics";

const RANGE_OPTIONS: Array<{ value: AnalyticsRange; label: string }> = [
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
];

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

const AdminAnalytics = () => {
  const [range, setRange] = useState<AnalyticsRange>("7d");

  const {
    data: views = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pageViews", range],
    queryFn: () => pageViewsApi.listSince(getAnalyticsRangeStart(range)),
  });
  const {
    data: activeSessions = [],
    isLoading: isLoadingActiveSessions,
    isError: isActiveSessionsError,
    error: activeSessionsError,
  } = useQuery({
    queryKey: ["activeAnalyticsSessions"],
    queryFn: () => pageViewsApi.listActiveSessions(new Date(Date.now() - 5 * 60 * 1000)),
    refetchInterval: 60_000,
  });

  const visitorMetrics = useMemo(() => buildVisitorMetrics(views), [views]);
  const traffic = useMemo(() => buildTrafficBuckets(views, range), [views, range]);
  const pagePerformance = useMemo(() => buildPagePerformance(views), [views]);
  const highestPageCount = pagePerformance[0]?.views ?? 1;

  return (
    <>
      <PageSEO {...SEO_PAGES.adminAnalytics} />
      <main className="min-h-[calc(100vh-7rem)] bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-7">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
              <p className="mt-1 text-slate-500">
                Monitor website traffic and visitor behavior
              </p>
            </div>
            <div
              role="group"
              aria-label="Analytics time range"
              className="inline-flex w-fit rounded-xl bg-slate-200/70 p-1"
            >
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={range === option.value}
                  onClick={() => setRange(option.value)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                    range === option.value
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </header>

          {isError ? (
            <p className="rounded-xl border border-red-200 bg-white p-6 text-center text-red-600">
              {(error as Error).message || "Failed to load analytics"}
            </p>
          ) : (
            <>
              <section
                aria-label="Traffic summary"
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                <MetricCard
                  label="Active Now"
                  value={
                    isLoadingActiveSessions || isActiveSessionsError
                      ? "—"
                      : activeSessions.length.toLocaleString()
                  }
                  description={
                    isActiveSessionsError
                      ? (activeSessionsError as Error).message || "Unable to load active sessions"
                      : "Seen in the last 5 minutes"
                  }
                  icon={<Activity className="h-5 w-5" />}
                  highlighted
                />
                <MetricCard
                  label="Total Page Views"
                  value={isLoading ? "—" : views.length.toLocaleString()}
                  description="Across all pages"
                  icon={<Eye className="h-5 w-5" />}
                />
                <MetricCard
                  label="Unique Visitors"
                  value={
                    isLoading
                      ? "—"
                      : views.length > 0 && !visitorMetrics.hasVisitorData
                        ? "—"
                        : visitorMetrics.uniqueVisitors.toLocaleString()
                  }
                  description="Anonymous browsers, tracked going forward"
                  icon={<Users className="h-5 w-5" />}
                />
                <MetricCard
                  label="Avg. Session Duration"
                  value={
                    isLoading
                      ? "—"
                      : views.length > 0 && !visitorMetrics.hasDurationData
                        ? "—"
                        : formatDuration(visitorMetrics.averageSessionSeconds)
                  }
                  description="Recorded time across sessions"
                  icon={<Clock3 className="h-5 w-5" />}
                />
                <MetricCard
                  label="Bounce Rate"
                  value={
                    isLoading
                      ? "—"
                      : views.length > 0 && !visitorMetrics.hasSessionData
                        ? "—"
                        : `${visitorMetrics.bounceRate}%`
                  }
                  description="Single-page sessions"
                  icon={<MousePointer2 className="h-5 w-5" />}
                />
              </section>

              <Card className="border-slate-200 bg-white text-slate-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Traffic Overview</CardTitle>
                  <CardDescription className="text-slate-500">
                    Visitors and page views over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                      Page views
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-600" />
                      Visitors
                    </span>
                  </div>
                  <div className="h-[280px] w-full">
                    {isLoading ? (
                      <div className="grid h-full place-items-center text-sm text-slate-500">
                        Loading traffic...
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={traffic} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}>
                          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                          <XAxis
                            dataKey="label"
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: "#cbd5e1" }}
                            minTickGap={24}
                          />
                          <YAxis
                            allowDecimals={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            width={40}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: 12,
                              borderColor: "#e2e8f0",
                              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                            }}
                            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="pageViews"
                            name="Page views"
                            stroke="#d9a441"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="visitors"
                            name="Visitors"
                            stroke="#0284c7"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white text-slate-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Page Performance</CardTitle>
                  <CardDescription className="text-slate-500">
                    Detailed page view statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p className="py-8 text-center text-sm text-slate-500">Loading page statistics...</p>
                  ) : pagePerformance.length === 0 ? (
                    <div className="py-10 text-center">
                      <CalendarDays className="mx-auto mb-3 h-9 w-9 text-amber-500" />
                      <p className="font-medium">No page views for this period</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Visits will appear here as people browse the site.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200">
                      {pagePerformance.map(({ path, views: pageViews }) => (
                        <div
                          key={path}
                          className="flex items-center gap-4 py-4 first:pt-1 last:pb-1"
                        >
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-50 text-amber-600">
                            <CalendarDays className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{path}</p>
                            <p className="text-sm text-slate-500">Page path</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-bold tabular-nums">{pageViews.toLocaleString()}</p>
                            <p className="text-sm text-slate-500">views</p>
                          </div>
                          <div
                            aria-hidden="true"
                            className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-slate-100 sm:block"
                          >
                            <div
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: `${(pageViews / highestPageCount) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
};

function MetricCard({
  label,
  value,
  description,
  icon,
  highlighted = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={cn(
        "border-slate-200 bg-white text-slate-950 shadow-sm",
        highlighted && "border-amber-200 bg-amber-50/70"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={cn(
            "text-sm font-medium",
            highlighted ? "text-amber-700" : "text-slate-800"
          )}
        >
          {label}
        </CardTitle>
        <span className={highlighted ? "text-amber-600" : "text-slate-400"}>{icon}</span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default AdminAnalytics;
