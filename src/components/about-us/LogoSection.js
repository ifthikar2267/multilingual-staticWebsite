import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { headingStyle } from "../styles/typography";

export default function LogoSection({ section }) {
  const logos = Array.isArray(section?.logos) ? section.logos : [];

  return (
    /* ---------- Full width background ---------- */
    <Box
      component="section"
      sx={{
        backgroundColor: "rgba(97, 75, 121, 0.2)",
        py: { xs: 6, md: 8 },
        width: "100%",
      }}
    >
      {/* ---------- Content inside container ---------- */}
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* ---------- Left Content ---------- */}
          <Grid item xs={12} md={6}>
            {section?.title && (
              <Typography
                sx={ headingStyle }
              >
                {section.title}
              </Typography>
            )}

            {section?.description && (
              <Typography
                sx={{
                  fontFamily: "Gilroy-Semibold",
                  fontSize: "17px",
                  lineHeight: "26px",
                  color: "#333",
                }}
              >
                {section.description}
              </Typography>
            )}
          </Grid>

          {/* ---------- Logos ---------- */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4} alignItems="center">
              {logos.map((logo, idx) => {
                const img = logo?.image;
                if (!img?.url) return null;

                return (
                  <Grid key={logo?.id || idx} item xs={6} sm={4} md={3}>
                    <Box
                      sx={{
                        position: "relative",
                        height: 50,
                        width: "100%",
                      }}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || "Logo"}
                        fill
                        sizes="(max-width: 900px) 50vw, 25vw"
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
