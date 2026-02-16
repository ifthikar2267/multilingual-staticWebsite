import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { FALLBACK_LOGOS } from "../constants/logos";
import { getStrapiImage } from "@/utils/strapi";
import { getDmcRaw } from "@/services/dmcService";

/* Fetch */
async function fetchFooterData(locale) {
  try {
    const raw = await getDmcRaw(locale);
    return raw?.data?.attributes || {};
  } catch (error) {
    console.error("Footer data fetch failed:", error);
    return {};
  }
}

function replaceYear(text) {
  const year = String(new Date().getFullYear());
  return String(text || "").replace(/\[year\]/gi, year);
}

/* Link Helpers */
function pickLegalLinks(footerLinks) {
  const links = Array.isArray(footerLinks?.links)
    ? footerLinks.links
    : [];

  const terms = links.find((l) => /terms|use/i.test(l?.label || ""));
  const privacy = links.find((l) => /privacy/i.test(l?.label || ""));

  const out = [];
  if (terms?.url) out.push({ label: terms.label, url: terms.url });
  if (privacy?.url) out.push({ label: privacy.label, url: privacy.url });

  return out.length
    ? out
    : [
        { label: "Terms of Use", url: "/terms" },
        { label: "Privacy Policy", url: "/privacy" },
      ];
}

function pickStaticLinks(staticLinks) {
  const links = Array.isArray(staticLinks) ? staticLinks : [];

  const subscribe = links.find((l) =>
    /subscribe|newsletter/i.test(l?.label || "")
  );
  const contact = links.find((l) => /contact/i.test(l?.label || ""));

  const out = [];
  if (subscribe?.url) out.push(subscribe);
  if (contact?.url) out.push(contact);

  return out.length
    ? out
    : [
        { label: "Subscribe to our newsletter", url: "/subscribe" },
        { label: "Contact Us", url: "/contact" },
      ];
}


export default async function Footer({ locale = "en" }) {
  const attrs = await fetchFooterData(locale);

  const brandLogo =
    getStrapiImage(attrs?.brandLogo) || FALLBACK_LOGOS.brandLogo;
  const corpLogo =
    getStrapiImage(attrs?.corpLogo) || FALLBACK_LOGOS.corpLogo;

  let awards = Array.isArray(attrs?.awards)
    ? attrs.awards
        .map((a) => getStrapiImage(a?.image))
        .filter((a) => a?.url)
    : [];

  if (!awards.length) awards = FALLBACK_LOGOS.awards;

  let social =
    Array.isArray(attrs?.socialMedia) && attrs.socialMedia.length
      ? attrs.socialMedia
      : FALLBACK_LOGOS.socialMedia;

  const legalLinks = pickLegalLinks(attrs?.footerLinks);
  const staticLinks = pickStaticLinks(attrs?.staticLinks);

  const copyrightText = replaceYear(
    attrs?.copyrightText ||
      "Copyright Discover Saudi © [year] All rights reserved"
  );

  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#2E1A47", color: "white", py: { xs: 4, md: 5 } }}
    >
      <Container maxWidth="lg">
        {/* TOP SECTION */}
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* LEFT */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ position: "relative", width: 180, height: 45 }}>
                <Image
                  src={brandLogo.url}
                  alt="Brand"
                  fill
                  sizes="180px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </Box>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-start"
              >
                {awards.slice(0, 2).map((award, idx) => (
                  <Box
                    key={idx}
                    sx={{ position: "relative", width: 240, height: 42 }}
                  >
                    <Image
                      src={award.url}
                      alt="Award"
                      fill
                      sizes="240px"
                      style={{
                        objectFit: "contain",
                        objectPosition: "left",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* MIDDLE */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5}>
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                Legal
              </Typography>

              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.url}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 14,
                      opacity: 0.85,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {l.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Stack
              spacing={1.5}
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              textAlign={{ xs: "left", md: "right" }}
            >
              {staticLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.url}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {l.label}
                  </Typography>
                </Link>
              ))}

              <Stack direction="row" spacing={1.5}>
                {social.slice(0, 2).map((s, idx) => {
                  const label = s.label || "Social";
                  const href = s.url;
                  const isInstagram = /instagram/i.test(label);
                  const isTwitter = /twitter|x/i.test(label);

                  return (
                    <Link
                      key={idx}
                      href={href}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton
                        sx={{
                          color: "white",
                          bgcolor: "rgba(255,255,255,0.1)",
                          width: 36,
                          height: 36,
                          "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                        }}
                      >
                        {isInstagram ? (
                          <InstagramIcon sx={{ fontSize: 20 }} />
                        ) : isTwitter ? (
                          <XIcon sx={{ fontSize: 18 }} />
                        ) : (
                          label[0]
                        )}
                      </IconButton>
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{ my: 4, borderColor: "rgba(255,255,255,0.15)" }}
        />

        {/* ---------- BOTTOM SECTION ---------- */}
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT */}
          <Grid item xs={12} md={4}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Travel and Tourism Services License Permit Number: 12302979
            </Typography>
          </Grid>

          {/* CENTER */}
          <Grid item xs={12} md={4}>
            <Stack
              spacing={1}
              alignItems={{ xs: "flex-start", md: "center" }}
              textAlign="center"
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {copyrightText}
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Commercial Registration Number: 1010584439
              </Typography>
            </Stack>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Stack
              spacing={1}
              alignItems={{ xs: "flex-start", md: "flex-end" }}
            >
              <Box sx={{ position: "relative", width: 130, height: 60 }}>
                <Image
                  src={corpLogo.url}
                  alt="Corporate"
                  fill
                  sizes="130px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "right",
                  }}
                />
              </Box>

              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  textAlign: { xs: "left", md: "right" },
                }}
              >
                Category: Tour Operator, Travel & Tourism Agent, Hospitality
                Reservation Services
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
