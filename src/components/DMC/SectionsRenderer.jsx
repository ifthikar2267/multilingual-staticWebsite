import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MarkdownText from "@/components/about-us/MarkdownText";

export default function SectionsRenderer({ sections }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <Box component="section" sx={{backgroundColor: "rgba(97, 75, 121, 0.1)", p: { xs: 3, md: 4 }, borderRadius: 2 }}>
      {sections.map((section) => (
        <Box key={section.id} sx={{ mb: { xs: 6, md: 8 } }}>
          {section?.title ? (
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 2, textAlign: "start", color: "#ca4608" }}
            >
              {section.title}
            </Typography>
          ) : null}

          {section?.description ? (
            <Box sx={{ mb: 3 }}>
              <MarkdownText
                text={section.description}
                align="start"
                headingWeight={600}
                bodyWeight={400}
              />
            </Box>
          ) : null}

          {section?.image?.url ? (
            <Box
              sx={{
                position: "relative",
                height: { xs: 240, sm: 320, md: 600 },
                mb: 3,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Image
                src={section.image.url}
                alt={section.image.alt || section.title || "Section"}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: "cover" }}
              />
            </Box>
          ) : null}

          {section?.cards?.length ? (
            <Grid container spacing={{ xs: 2.5, md: 3 }}>
              {section.cards
                .filter((c) => c?.enabled !== false)
                .map((card, idx) => {
                  const mdCols = card?.fullWidth ? 12 : 4;
                  const hasImage = !!card?.image?.url;

                  return (
                    <Grid key={card.id || idx} item xs={12} sm={6} md={mdCols}>
                      <Paper
                        variant="outlined"
                        sx={{
                          overflow: "hidden",
                          borderRadius: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {hasImage ? (
                          <Box
                            sx={{
                              position: "relative",
                              height: { xs: 180, md: 200 },
                              bgcolor: "grey.100",
                            }}
                          >
                            <Image
                              src={card.image.url}
                              alt={card.image.alt || card.title || "Card"}
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                              style={{ objectFit: "cover" }}
                            />
                          </Box>
                        ) : null}

                        <Box
                          sx={{
                            p: { xs: 2.5, md: 3 },
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {card?.title ? (
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                mb: 1.5,
                                textAlign: "start",
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                              }}
                            >
                              {card.title}
                            </Typography>
                          ) : null}

                          {card?.description ? (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textAlign: "start",
                                lineHeight: 1.6,
                              }}
                            >
                              {card.description}
                            </Typography>
                          ) : null}
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}
