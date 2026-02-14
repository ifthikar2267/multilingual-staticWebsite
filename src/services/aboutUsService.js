import { cache } from "react";

const ABOUT_US_URL =
  `${process.env.ABOUT_US_URL}/api/about-us?locale={locale}&populate[]=
  localizations,meta,hero.image,featuredCard.cards,featuredCard.cards.image,sections,sections.logos.image,sections.cards,sections.cards.image,awards,footerLinks.links,socialMedia.logo,staticLinks,corpLogo,links.logo,links.childLinks.logo,brandLogo,copyrightText,awardShield,ogImage`;

export const getAboutUsRaw = cache(async function getAboutUsRaw(locale) {
  const url = ABOUT_US_URL.replace("{locale}", encodeURIComponent(locale || "en"));
  // Disable caching to ensure true SSR HTML per request.
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch About Us (${res.status}): ${text || res.statusText}`
    );
  }

  return res.json();
});

