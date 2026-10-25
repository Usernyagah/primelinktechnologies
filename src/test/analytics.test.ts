import { describe, expect, it } from "vitest";
import { Timestamp } from "firebase/firestore";
import type { PageView } from "@/lib/db";
import {
  buildPagePerformance,
  buildTrafficBuckets,
  buildVisitorMetrics,
  getAnalyticsRangeStart,
} from "@/lib/analytics";

function makeView(
  id: string,
  path: string,
  createdAt: Date,
  values: Partial<PageView> = {}
): PageView {
  return {
    id,
    path,
    createdAt: Timestamp.fromDate(createdAt),
    ...values,
  };
}

describe("analytics calculations", () => {
  it("counts unique browsers rather than page clicks, session duration, and single-page sessions", () => {
    const views = [
      makeView("view-1", "/", new Date(), {
        visitorId: "visitor-1",
        sessionId: "session-1",
        durationSeconds: 45,
      }),
      makeView("view-2", "/products", new Date(), {
        visitorId: "visitor-1",
        sessionId: "session-1",
        durationSeconds: 75,
      }),
      makeView("view-3", "/contact", new Date(), {
        visitorId: "visitor-2",
        sessionId: "session-2",
        durationSeconds: 30,
      }),
    ];

    expect(buildVisitorMetrics(views)).toEqual({
      uniqueVisitors: 2,
      averageSessionSeconds: 75,
      bounceRate: 50,
      hasVisitorData: true,
      hasSessionData: true,
      hasDurationData: true,
    });
  });

  it("groups traffic into date-range buckets and counts distinct visitors per bucket", () => {
    const now = new Date("2026-10-25T12:00:00");
    const start = getAnalyticsRangeStart("24h", now);
    const views = [
      makeView("view-1", "/", new Date(start.getTime() + 30 * 60 * 1000), {
        visitorId: "visitor-1",
      }),
      makeView("view-2", "/products", new Date(start.getTime() + 45 * 60 * 1000), {
        visitorId: "visitor-1",
      }),
      makeView("view-3", "/contact", new Date(start.getTime() + 2 * 60 * 60 * 1000), {
        visitorId: "visitor-2",
      }),
    ];

    const buckets = buildTrafficBuckets(views, "24h", now);

    expect(buckets).toHaveLength(24);
    expect(buckets[0]).toMatchObject({ pageViews: 2, visitors: 1 });
    expect(buckets[2]).toMatchObject({ pageViews: 1, visitors: 1 });
  });

  it("ranks page paths by view count", () => {
    const views = [
      makeView("view-1", "/", new Date()),
      makeView("view-2", "/products", new Date()),
      makeView("view-3", "/", new Date()),
    ];

    expect(buildPagePerformance(views)).toEqual([
      { path: "/", views: 2 },
      { path: "/products", views: 1 },
    ]);
  });
});
