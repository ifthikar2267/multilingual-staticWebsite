import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function DMCHero({ hero, dir = "ltr" }) {
  const image = hero?.image;
  const gradient =
    dir === "rtl"
      ? "linear-gradient(270deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)"
      : "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 260, sm: 320, md: 520 },
        width: "100%",
      }}
    >
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt || hero?.title || "DMC"}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : (
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "grey.200" }} />
      )}

      <Box sx={{ position: "absolute", inset: 0, background: gradient }} />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          pb: { xs: 3, md: 5 },
        }}
      >
        <Container>
          <Box sx={{ maxWidth: 720 }}>
            <Typography
              variant="h3"
              sx={{
                color: "common.white",
                fontWeight: 400,
                lineHeight: 1,
                fontSize: { xs: 32, sm: 40, md: 50 },
                textAlign: "start",
              }}
            >
              {hero?.title || "Destination Management Company"}
            </Typography>

            {hero?.subTitle ? (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mt: 1.5,
                  textAlign: "start",
                }}
              >
                {hero.subTitle}
              </Typography>
            ) : null}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
