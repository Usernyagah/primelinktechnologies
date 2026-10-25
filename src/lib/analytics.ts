import { format } from "date-fns";
import type { PageView } from "@/lib/db";

export type AnalyticsRange = "24h" | "7d" | "30d";

export interface TrafficBucket {
  label: string;
  pageViews: number;
  visitors: Set<string>;
}

export function createAnalyticsIdentity() {
  const createId = () => window.crypto.randomUUID();

  try {
    const visitorId = window.localStorage.getItem("analytics-visitor-id") ?? createId();
    let sessionId = window.sessionStorage.getItem("analytics-session-id");
    let sessionStartedAt = Number(
      window.sessionStorage.getItem("analytics-session-started-at")
    );
    if (!sessionId || !Number.isFinite(sessionStartedAt) || sessionStartedAt <= 0) {
      sessionId = createId();
      sessionStartedAt = Date.now();
    }

    window.localStorage.setItem("analytics-visitor-id", visitorId);
    window.sessionStorage.setItem("analytics-session-id", sessionId);
    window.sessionStorage.setItem(
      "analytics-session-started-at",
      String(sessionStartedAt)
    );

    return { visitorId, sessionId, sessionStartedAt };
  } catch (error) {
    console.warn("Analytics storage is unavailable; using a temporary visitor ID.", error);
    return {
      visitorId: createId(),
      sessionId: createId(),
      sessionStartedAt: Date.now(),
    };
  }
}

export function getAnalyticsRangeStart(range: AnalyticsRange, now = new Date()) {
  const days = range === "24h" ? 1 : range === "7d" ? 7 : 30;
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}

export function buildTrafficBuckets(
  views: PageView[],
  range: AnalyticsRange,
  now = new Date()
): Array<{ label: string; pageViews: number; visitors: number }> {
  const bucketCount = range === "24h" ? 24 : range === "7d" ? 7 : 30;
  const bucketSize = range === "24h" ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const start = new Date(now.getTime() - bucketCount * bucketSize);
  const buckets: TrafficBucket[] = Array.from({ length: bucketCount }, (_, index) => {
    const time = new Date(start.getTime() + index * bucketSize);
    return {
      label: format(time, range === "24h" ? "ha" : range === "7d" ? "EEE" : "MMM d"),
      pageViews: 0,
      visitors: new Set<string>(),
    };
  });

  for (const view of views) {
    if (!view.createdAt) continue;
    const timestamp = view.createdAt.toDate().getTime();
    const bucketIndex = Math.floor((timestamp - start.getTime()) / bucketSize);
    if (bucketIndex < 0 || bucketIndex >= buckets.length) continue;

    const bucket = buckets[bucketIndex];
    bucket.pageViews += 1;
    if (view.visitorId) bucket.visitors.add(view.visitorId);
  }

  return buckets.map(({ label, pageViews, visitors }) => ({
    label,
    pageViews,
    visitors: visitors.size,
  }));
}

export function buildPagePerformance(views: PageView[]) {
  const counts = new Map<string, number>();
  for (const view of views) {
    counts.set(view.path, (counts.get(view.path) ?? 0) + 1);
  }

  return Array.from(counts, ([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views || a.path.localeCompare(b.path));
}

export function buildVisitorMetrics(views: PageView[]) {
  const visitors = new Set<string>();
  const sessions = new Map<string, { views: number; durationSeconds: number }>();

  for (const view of views) {
    if (view.visitorId) visitors.add(view.visitorId);
    if (!view.sessionId) continue;

    const session = sessions.get(view.sessionId) ?? { views: 0, durationSeconds: 0 };
    session.views += 1;
    session.durationSeconds += view.durationSeconds ?? 0;
    sessions.set(view.sessionId, session);
  }

  const sessionCount = sessions.size;
  const bouncedSessions = Array.from(sessions.values()).filter(
    (session) => session.views === 1
  ).length;
  const totalDuration = Array.from(sessions.values()).reduce(
    (total, session) => total + session.durationSeconds,
    0
  );

  return {
    uniqueVisitors: visitors.size,
    averageSessionSeconds: sessionCount ? Math.round(totalDuration / sessionCount) : 0,
    bounceRate: sessionCount ? Math.round((bouncedSessions / sessionCount) * 100) : 0,
    hasVisitorData: visitors.size > 0,
    hasSessionData: sessionCount > 0,
    hasDurationData: views.some(
      (view) => view.sessionId && typeof view.durationSeconds === "number"
    ),
  };
}
