import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { imageHoverZoom } from "../styles/imageStyles";
import { headingStyle } from "../styles/typography";
import Typography from "@mui/material/Typography";

/* ---------- Paragraph Parser ---------- */
const parseParagraphs = (text = "") => {
  if (!text) return [];

  // Decode escaped HTML tags
  const decoded = text
    .replace(/\\u003C/g, "<")
    .replace(/\\u003E/g, ">");

  // Extract <p>...</p> blocks
  const matches = decoded.match(/<p>(.*?)<\/p>/gis);

  if (!matches) {
    // fallback: treat whole text as content
    return [decoded.trim()];
  }

  return matches.map((p) =>
    p.replace(/<\/?p>/gi, "").trim()
  );
};
/* -------------------------------------- */

export default function FeaturedCards({ cards }) {
  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <Box component="section" sx={{mt: {xs: 1, md: -25}}}>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {cards
          .filter((c) => c?.enabled !== false)
          .map((card, idx) => {
            const imageFirst = idx % 2 === 0;
            const paragraphs = parseParagraphs(card?.description);

            return (
              <Grid key={card.id || idx} item xs={12}>
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    p: { xs: 2, md: 3 },
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <Grid container spacing={4} alignItems="stretch">
                    {/* Image */}
                    <Grid
                      item
                      xs={12}
                      md={6}
                      order={{ xs: 0, md: imageFirst ? 1 : 0 }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: { xs: 260, md: "100%" },
                          minHeight: { md: 420 },
                          position: "relative",
                          borderRadius: "12px",
                          aspectRatio: "4 / 3",
                          overflow: "hidden",
                          ...imageHoverZoom,
                        }}
                      >
                        {card?.image?.url && (
                          <Image
                            src={card.image.url}
                            alt={
                              card.image.alt ||
                              card.title ||
                              "Featured"
                            }
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            style={{ objectFit: "cover", borderRadius: "12px" }}
                          />
                        )}
                      </Box>
                    </Grid>

                    {/* Content */}
                    <Grid
                      item
                      xs={12}
                      md={6}
                      order={{ xs: 1, md: imageFirst ? 0 : 1 }}
                    >
                      <Box sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          bgcolor: "white",
                          position: "relative",
                        }}>
                        {card?.title && (
                          <Typography
                            variant="h4"
                            sx={ headingStyle }
                          >
                            {card.title}
                          </Typography>
                        )}

                        <Box>
                          {paragraphs.map((para, i) => (
                            <Typography
                              key={i}
                              sx={{
                                fontFamily: "Gilroy",
                                fontSize: "17px",
                                lineHeight: "24px",
                                color: "#333",
                                margin: "0 0 16px",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {para}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
