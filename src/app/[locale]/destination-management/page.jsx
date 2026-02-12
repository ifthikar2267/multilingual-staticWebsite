import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/utils/i18n";
import { getDmcRaw } from "@/services/dmcService";
import { normalizeDmcResponse } from "@/utils/normalizeDmc";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DMCHero from "@/components/DMC/DMCHero";
import FeaturedCards from "@/components/DMC/FeaturedCards";
import SectionsRenderer from "@/components/DMC/SectionsRenderer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  if (!isSupportedLocale(locale)) return {};

  try {
    const raw = await getDmcRaw(locale);
    const data = normalizeDmcResponse(raw);

    const title = data?.meta?.title || "Destination Management Company";
    const description = data?.meta?.description || "";
    const ogImage = data?.hero?.image?.url || null;

    return {
      title,
      description,
      alternates: { canonical: `/${locale}/destination-management` },
      openGraph: {
        title,
        description,
        type: "website",
        locale,
        images: ogImage ? [{ url: ogImage }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Destination Management Company",
      description: "",
    };
  }
}

export default async function DMCPage({ params }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  if (!isSupportedLocale(locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";

  let data = null;
  let error = null;

  try {
    const raw = await getDmcRaw(locale);
    data = normalizeDmcResponse(raw);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load DMC content. {error}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info">No content available for locale: {locale}</Alert>
    );
  }

  return (
    <Stack spacing={{ xs: 4, md: 7 }}>
      <DMCHero hero={data.hero} dir={dir} />

      {data.featuredCards?.length ? (
        <FeaturedCards cards={data.featuredCards} />
      ) : null}

      {data.sections?.length ? (
        <SectionsRenderer sections={data.sections} />
      ) : null}
    </Stack>
  );
}
