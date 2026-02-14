export function getStrapiImage(media) {
  const attrs = media?.data?.attributes;
  if (!attrs) return null;

  let url = attrs.url || null;
  
  // Ensure URL is absolute - if relative, it's likely coming from Strapi
  if (url && !url.startsWith('http')) {
    // Prepend Strapi base URL if URL is relative
    const strapiBase = process.env.ABOUT_US_URL || process.env.DMC_URL || 'https://alm-biz-web-strapi-dev.almosafer.com';
    url = `${strapiBase}${url}`;
  }

  return {
    url,
    width: attrs.width || null,
    height: attrs.height || null,
    alt: attrs.alternativeText || "",
  };
}

