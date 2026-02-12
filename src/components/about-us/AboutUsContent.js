import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import FeaturedCards from "@/components/about-us/FeaturedCards";
import HeroSection from "@/components/about-us/HeroSection";
import SectionRenderer from "@/components/about-us/SectionRenderer";

export default function AboutUsContent({ data, locale }) {
  if (!data) {
    return (
      <Alert severity="info">No content available for locale: {locale}</Alert>
    );
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
     <Stack spacing={{ xs: 4, md: 7 }}>
      <HeroSection hero={data.hero} dir={dir} />

      {data.featuredCards?.length ? (
        <FeaturedCards cards={data.featuredCards} />
      ) : null}

      <Box component="section">
        <Stack>
          {data.sections?.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

