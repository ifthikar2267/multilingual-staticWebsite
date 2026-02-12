import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getStrapiImage } from "@/utils/strapi";

const ABOUT_US_URL =
  `${process.env.ABOUT_US_URL}/api/about-us?locale={locale}&populate[]=meta,hero.image,featuredCard.cards,featuredCard.cards.image,sections,sections.logos.image,sections.cards,sections.cards.image,awards,footerLinks.links,socialMedia.logo,staticLinks,corpLogo,links.logo,links.childLinks.logo,brandLogo,copyrightText,awardShield,ogImage`;

async function fetchFooterData(locale) {
  const url = ABOUT_US_URL.replace("{locale}", encodeURIComponent(locale || "en"));
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Footer fetch failed: ${res.status}`);
  const json = await res.json();
  return json?.data?.attributes || {};
}

function replaceYear(text) {
  const year = String(new Date().getFullYear());
  return String(text || "").replace(/\[year\]/gi, year);
}

function pickLegalLinks(footerLinks) {
  const links = Array.isArray(footerLinks?.links) ? footerLinks.links : [];
  const terms =
    links.find((l) => /terms/i.test(l?.label || "")) ||
    links.find((l) => /use/i.test(l?.label || ""));
  const privacy = links.find((l) => /privacy/i.test(l?.label || ""));

  const out = [];
  if (terms?.url) out.push({ label: terms.label || "Terms of Use", url: terms.url });
  if (privacy?.url)
    out.push({ label: privacy.label || "Privacy Policy", url: privacy.url });

  if (out.length) return out;

  // Fallback (design-required)
  return [
    { label: "Terms of Use", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
  ];
}

function pickStaticLinks(staticLinks) {
  const links = Array.isArray(staticLinks) ? staticLinks : [];

  const subscribe =
    links.find((l) => /subscribe/i.test(l?.label || "")) ||
    links.find((l) => /newsletter/i.test(l?.label || ""));
  const contact = links.find((l) => /contact/i.test(l?.label || ""));

  const out = [];
  if (subscribe?.url)
    out.push({ label: subscribe.label || "Subscribe to newsletter", url: subscribe.url });
  if (contact?.url) out.push({ label: contact.label || "Contact Us", url: contact.url });

  if (out.length) return out;

  // Fallback (design-required)
  return [
    { label: "Subscribe to newsletter", url: "/subscribe" },
    { label: "Contact Us", url: "/contact" },
  ];
}

export default async function Footer({ locale = "en" }) {
  const attrs = await fetchFooterData(locale);

  const brandLogo = getStrapiImage(attrs?.brandLogo);
  console.log("Footer data:", { attrs, brandLogo });
  const awardShield = getStrapiImage(attrs?.awardShield);
  const corpLogo = getStrapiImage(attrs?.corpLogo);

  const social = Array.isArray(attrs?.socialMedia) ? attrs.socialMedia : [];
  const legalLinks = pickLegalLinks(attrs?.footerLinks);
  const staticLinks = pickStaticLinks(attrs?.staticLinks);
  const copyrightText = replaceYear(attrs?.copyrightText || "© [year]");

  return (
    <Box component="footer" sx={{ bgcolor: "#2E1A47", color: "common.white"}}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
          {/* Left */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              {brandLogo?.url ? (
                <Box sx={{ position: "relative", width: 170, height: 40 }}>
                  <Image
                    src={brandLogo.url}
                    alt={brandLogo.alt || "Brand logo"}
                    fill
                    sizes="170px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : (
                <Typography sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
                  Brand
                </Typography>
              )}

              {awardShield?.url ? (
                <Box sx={{ position: "relative", width: 44, height: 44 }}>
                  <Image
                    src={awardShield.url}
                    alt={awardShield.alt || "Award shield"}
                    fill
                    sizes="44px"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : null}
            </Stack>
          </Grid>

          {/* Middle */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.25} sx={{ textAlign: "start" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Legal
              </Typography>
              <Stack spacing={0.75}>
                {legalLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.url}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        "&:hover": { opacity: 1, textDecoration: "underline" },
                      }}
                    >
                      {l.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Right */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.25} sx={{ textAlign: "start" }}>
              <Stack spacing={0.75}>
                {staticLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.url}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        "&:hover": { opacity: 1, textDecoration: "underline" },
                      }}
                    >
                      {l.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>

              {social.length ? (
                <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
                  {social.map((s, idx) => {
                    const href = s?.url || s?.link || "#";
                    const img = getStrapiImage(s?.logo);
                    const label = s?.label || s?.title || "Social";

                    return (
                      <IconButton
                        key={s?.id || idx}
                        component={Link}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        sx={{
                          border: "1px solid rgba(255,255,255,0.18)",
                          color: "common.white",
                        }}
                      >
                        {img?.url ? (
                          <Box sx={{ position: "relative", width: 18, height: 18 }}>
                            <Image
                              src={img.url}
                              alt={img.alt || label}
                              fill
                              sizes="18px"
                              style={{ objectFit: "contain" }}
                            />
                          </Box>
                        ) : (
                          <span style={{ fontSize: 12 }}>{label.slice(0, 1)}</span>
                        )}
                      </IconButton>
                    );
                  })}
                </Stack>
              ) : null}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: "rgba(255,255,255,0.15)" }} />

        {/* Bottom row */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ textAlign: "start" }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {copyrightText}
          </Typography>

          {corpLogo?.url ? (
            <Box sx={{ position: "relative", width: 150, height: 28 }}>
              <Image
                src={corpLogo.url}
                alt={corpLogo.alt || "Corporate logo"}
                fill
                sizes="150px"
                style={{ objectFit: "contain" }}
              />
            </Box>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

