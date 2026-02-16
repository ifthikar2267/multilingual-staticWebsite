"use client";

import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { headingStyle } from "../styles/typography";
import MarkdownText from "@/components/about-us/MarkdownText";
import { imageHoverZoom } from "../styles/imageStyles";

export default function CardGrid({ section, locale }) {
  const cards = Array.isArray(section?.cards) ? section.cards : [];
  const [expanded, setExpanded] = useState({});

  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isWhyTravelSection =
    section?.title?.toLowerCase().includes("why travel") ||
    section?.title?.includes("لماذا");

  const isArabic =
    locale === "ar" || /[\u0600-\u06FF]/.test(section?.title || "");

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#614B791A",
        p: { xs: 2, md: 3 },
        borderRadius: { xs: 1, md: 2 },
      }}
    >
      {section?.title && (
        <Typography variant="h5" sx={headingStyle}>
          {section.title}
        </Typography>
      )}

      {section?.description && (
        <Box sx={{ mb: 3 }}>
          <MarkdownText text={section.description} />
        </Box>
      )}

      {/* GRID LAYOUT */}
      <Grid container spacing={3} alignItems="flex-start">
        {cards
          .filter((c) => c?.enabled !== false)
          .map((card, idx) => {
            const id = card.id || idx;

            return (
              <Grid item xs={12} md={6} key={id}>
                <Paper
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderRadius: { xs: 3, md: 2 },
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                  }}
                >
                  {/* IMAGE */}
                  {card?.image?.url && (
                    <Box
                      sx={{
                        position: "relative",
                        height: { xs: 220, sm: 260, md: 400 },
                        bgcolor: "grey.100",
                        overflow: "hidden",
                        ...imageHoverZoom,
                      }}
                    >
                      <Image
                        src={card.image.url}
                        alt={
                          card.image.alt ||
                          card.title ||
                          "Card image"
                        }
                        fill
                        sizes="(max-width: 900px) 100vw, 40vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  )}

                  {/* CONTENT */}
                  <Box
                    sx={{
                      p: { xs: 3, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    {card?.title && (
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          alignSelf:
                            locale === "ar"
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {card.title}
                      </Typography>
                    )}

                    {card?.description && (
                      <>
                        <Typography
                          sx={{
                            fontFamily: "Gilroy-Semibold",
                            fontSize: "17px",
                            lineHeight: "24px",
                            color: "#333",
                            display: "-webkit-box",
                            WebkitLineClamp:
                              isWhyTravelSection &&
                              !expanded[id]
                                ? 3
                                : "unset",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {card.description}
                        </Typography>

                        {isWhyTravelSection && (
                          <Button
                            size="small"
                            sx={{
                              mt: 1,
                              color: "#614B79",
                              textTransform: "none",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily:
                                "Gilroy-Semibold",
                              background: "none",
                              alignSelf:
                                locale === "ar"
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                            onClick={() =>
                              handleToggle(id)
                            }
                          >
                            {expanded[id]
                              ? isArabic
                                ? "اقرأ أقل"
                                : "Read less"
                              : isArabic
                              ? "اقرأ أكثر"
                              : "Read more"}
                          </Button>
                        )}
                      </>
                    )}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
