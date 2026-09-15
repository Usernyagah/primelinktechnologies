import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_HANDLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site-config";
import type { PageMetadata } from "@/lib/seo/types";

export const PageSEO = ({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadata) => {
  const canonicalUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE_URL;
  const resolvedOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:locale" content="en_KE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
    </Helmet>
  );
};
