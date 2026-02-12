import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import MarkdownText from "@/components/about-us/MarkdownText";

export default function LogoSection({ section }) {
  const logos = Array.isArray(section?.logos) ? section.logos : [];

  return (
    <Box component="section" sx={{backgroundColor: "rgba(97, 75, 121, 0.2)", p: { xs: 2, md: 3 }}}>
      {section?.title ? (
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1.5 , color: "#ca4608"}}>
          {section.title}
        </Typography>
      ) : null}

      {section?.description ? (
        <Box sx={{ mb: 3 }}>
          <MarkdownText text={section.description}/>
        </Box>
      ) : (
        <Box/>
      )}

      <Paper>

        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {logos.map((logo, idx) => {
            const img = logo?.image;
            if (!img?.url) return null;

            return (
              <Grid key={logo?.id || idx} item xs={6} sm={4} md={3} sx={{backgroundColor: "rgba(97, 75, 121, 0.2)"}}>
                <Box
                  sx={{
                    position: "relative",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
      </Paper>
    </Box>
  );
}

