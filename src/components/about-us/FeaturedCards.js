import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { headingStyle } from "../styles/typography";
import { imageHoverZoom } from "../styles/imageStyles";

const parseSections = (text = "") => {
  const normalized = text.replace(/\\n/g, "\n");
  const blocks = normalized.split(/(?=###)/g);

  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("###")) {
        const withoutHashes = trimmed.replace(/^###\s*/, "");
        const lines = withoutHashes.split("\n");

        const title = lines.shift().trim();
        const content = lines.join("\n").trim();

        return { title, content };
      }

      return { title: null, content: trimmed };
    })
    .filter(Boolean);
};
/* ------------------------------------- */

export default function FeaturedCards({ cards }) {
  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        mb: 5,
        mt: { xs: 2, md: -25 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={4}>
        {cards
          .filter((c) => c?.enabled !== false)
          .map((card, idx) => {
            const sections = parseSections(card?.description);
            const textFirst = idx % 2 === 0;

            return (
              <Grid key={card.id || idx} item xs={12}>
                {/* BIG WHITE CONTAINER */}
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    p: { xs: 2, md: 3 },
                    position: "relative",
                    overflow: "hidden",
                 
                  }}
                >
                  <Grid container spacing={4} alignItems="stretch">
                    {/* TEXT BOX */}
                    <Grid
                      item
                      xs={12}
                      md={6}
                      order={{ xs: 1, md: textFirst ? 0 : 1 }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          bgcolor: "white",
                          position: "relative",
                          pt: { xs: 2, md: 6 },
                          px: { xs: 2, md: 1 },
                        }}
                      >
                        {card?.title && (
                          <Typography
                            variant="h5"
                            sx={ headingStyle }
                          >
                            {card.title}
                          </Typography>
                        )}

                        {sections.map((section, index) => (
                          <Box key={`section-${index}`} sx={{ mb: 2 }}>
                            {section.title && (
                              <Typography
                                sx={{
                                  fontFamily: "Gilroy-Semibold",
                                  fontSize: 17,
                                  lineHeight: "24px",
                                  fontWeight: 600,
                                  color: "#333",
                                  mb: 1,
                                }}
                              >
                                {section.title}
                              </Typography>
                            )}

                            {section.content && (
                              <Typography
                                sx={{
                                  fontSize: 17,
                                  fontFamily: "Gilroy-Regular",
                                  color: "#333",
                                  lineHeight: "24px",
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {section.content}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Grid>

                    {/*  IMAGE BOX */}
                    <Grid
                      item
                      xs={12}
                      md={6}
                      order={{ xs: 0, md: textFirst ? 1 : 0 }}
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
                            alt={card.image.alt || card.title || "image"}
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            style={{
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                        )}
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
