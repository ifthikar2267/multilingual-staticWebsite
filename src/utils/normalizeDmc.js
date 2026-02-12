import { getStrapiImage } from "@/utils/strapi";

function normalizeCard(card) {
  return {
    id: card?.id ?? null,
    title: card?.title ?? null,
    description: card?.description ?? null,
    enabled: card?.enabled !== false,
    fullWidth: !!card?.fullWidth,
    url: card?.url ?? null,
    image: getStrapiImage(card?.image),
  };
}

function normalizeSection(section) {
  const cardSection = section?.cardSection;

  // cardSection is an array where each item IS a card (not a wrapper with cards inside)
  const cards = Array.isArray(cardSection)
    ? cardSection.map((item) => ({
        id: item?.id ?? null,
        title: item?.title ?? null,
        description: item?.description ?? null,
        enabled: item?.enabled !== false,
        fullWidth: !!item?.fullWidth,
        url: item?.url ?? null,
        image: getStrapiImage(item?.image),
      }))
    : [];

  // Handle image.data as array (Strapi sometimes returns array)
  let sectionImage = null;
  if (section?.image) {
    if (Array.isArray(section.image.data) && section.image.data.length > 0) {
      sectionImage = getStrapiImage({ data: section.image.data[0] });
    } else {
      sectionImage = getStrapiImage(section.image);
    }
  }

  return {
    id: section?.id ?? null,
    component: section?.__component ?? null,
    title: section?.title ?? null,
    description: section?.description ?? null,
    image: sectionImage,
    cards,
  };
}

export function normalizeDmcResponse(raw) {
  const attrs = raw?.data?.attributes || {};

  const heroImage = getStrapiImage(attrs?.hero?.image);

  const featuredCards = Array.isArray(attrs?.featuredCard?.cards)
    ? attrs.featuredCard.cards.map(normalizeCard)
    : [];

  const sections = Array.isArray(attrs?.sections)
    ? attrs.sections.map(normalizeSection)
    : [];

  const awards = Array.isArray(attrs?.awards)
    ? attrs.awards.map((award) => ({
        id: award?.id ?? null,
        title: award?.title ?? null,
        description: award?.description ?? null,
        image: getStrapiImage(award?.image),
      }))
    : [];

  return {
    locale: attrs?.locale || "en",
    meta: {
      title: attrs?.meta?.metaTitle || "Destination Management Company",
      description: attrs?.meta?.metaDescription || "",
    },
    hero: {
      title: attrs?.hero?.title || "",
      subTitle: attrs?.hero?.subTitle || "",
      image: heroImage,
    },
    featuredCards,
    sections,
    awards,
  };
}
