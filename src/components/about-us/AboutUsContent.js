import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import FeaturedCards from "@/components/about-us/FeaturedCards";
import HeroSection from "@/components/about-us/HeroSection";
import SectionRenderer from "@/components/about-us/SectionRenderer";

export default function AboutUsContent({ data, locale }) {
  if (!data) {
    return (
      <Alert severity="info">
        No content available for locale: {locale}
      </Alert>
    );
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <Stack spacing={{ xs: 4, md: 7 }}>
      {/* Hero full width */}
      <HeroSection hero={data.hero} dir={dir} />

      {/* Featured cards inside container */}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}> 
      <Container>
        {data.featuredCards?.length ? (
          <FeaturedCards cards={data.featuredCards} />
        ) : null}
      </Container>
      </Box>

      {/* Sections rendering */}
      {data.sections?.map((section) => {
        const isLogoSection =
          section?.component === "common.logos-section";

        // Logo section full width
        if (isLogoSection) {
          return (
            <SectionRenderer
              key={section.id}
              section={section}
            />
          );
        }

        // Other sections inside container
        return (
          <Box key={section.id} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Container key={section.id}>
            <SectionRenderer section={section} />
          </Container>
          </Box>
        );
      })}
    </Stack>
  );
}
