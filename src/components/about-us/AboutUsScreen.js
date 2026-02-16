"use client";

import * as React from "react";
import { observer } from "mobx-react-lite";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useAboutUsStore } from "@/stores/AboutUsStoreProvider";
import HeroSection from "@/components/about-us/HeroSection";
import FeaturedCards from "@/components/about-us/FeaturedCards";
import SectionRenderer from "@/components/about-us/SectionRenderer";

const AboutUsScreen = observer(function AboutUsScreen({ locale }) {
  const store = useAboutUsStore();

  if (store.status === "error") {
    return (
      <Alert severity="error">
        Failed to load About Us content. {store.error}
      </Alert>
    );
  }

  if (!store.data) {
    return (
      <Alert severity="info">
        No content available for locale: {locale}
      </Alert>
    );
  }

  const { hero, featuredCards, sections } = store.data;

  return (
    <Stack spacing={{ xs: 4, md: 7 }}>
      <HeroSection hero={hero} />

      <Container>
        <Stack spacing={{ xs: 4, md: 7 }}>
          {featuredCards?.length ? <FeaturedCards cards={featuredCards} locale={locale} /> : null}

          <Box component="section">
            <Stack spacing={{ xs: 4, md: 6 }}>
              {sections?.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
});

export default AboutUsScreen;

