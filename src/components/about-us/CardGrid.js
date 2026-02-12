import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MarkdownText from "@/components/about-us/MarkdownText";

export default function CardGrid({ section }) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];

  return (
    <Box component="section" sx={{backgroundColor: "#614B791A", p: { xs: 2, md: 3 }}}>
      {section?.title ? (
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1.5, color: "#ca4608" }}>
          {section.title}
        </Typography>
      ) : null}

      {section?.description ? (
        <Box sx={{ mb: 3 }}>
          <MarkdownText text={section.description} />
        </Box>
      ) : (
        <Box sx={{ mb: 1 }} />
      )}

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        {cards
          .filter((c) => c?.enabled !== false)
          .map((card, idx) => {
            const mdCols = card?.fullWidth ? 12 : 6;

            return (
              <Grid key={card.id || idx} item xs={12} md={mdCols}>
                <Paper
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderRadius: { xs: 3, md: 2 },
                  }}
                >
                  <Grid container>
                    {card?.image?.url ? (
                      <Grid item xs={12} md={12}>
                        <Box
                          sx={{
                            position: "relative",
                            height: { xs: 220, sm: 260, md: 400 },
                            bgcolor: "grey.100",
                          }}
                        >
                          <Image
                            src={card.image.url}
                            alt={card.image.alt || card.title || "Card image"}
                            fill
                            sizes="(max-width: 900px) 100vw, 40vw"
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Grid>
                    ) : null}

                    <Grid item xs={12} md={12}>
                      <Box
                        sx={{
                          p: { xs: 3, md: 3 },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {card?.title ? (
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
                          >
                            {card.title}
                          </Typography>
                        ) : null}

                        <MarkdownText
                          text={card?.description}
                          align="center"
                          headingWeight={600}
                          bodyWeight={400}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

