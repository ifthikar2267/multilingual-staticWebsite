import { cache } from "react";

const DMC_URL =
  `${process.env.DMC_URL}/api/ds-dmc?locale={locale}&populate[]=localizations,meta,hero.image,featuredCard.cards,featuredCard.cards.image,sections,sections.cardSection,sections.cardSection.image,sections.image,sections.cardSection.cards.image,awards,footerLinks.links,socialMedia.logo,staticLinks,corpLogo,links.logo,links.childLinks.logo,brandLogo,copyrightText,awardShield,ogImage`;

export const getDmcRaw = cache(async function getDmcRaw(locale) {
  const url = DMC_URL.replace("{locale}", encodeURIComponent(locale || "en"));
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch DMC (${res.status}): ${text || res.statusText}`
    );
  }

  return res.json();
});
