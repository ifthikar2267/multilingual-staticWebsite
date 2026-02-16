import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ReactCountryFlag from "react-country-flag";
import Button from "@mui/material/Button";
import Image from "next/image";
import ServerLinkButton from "@/components/navigation/ServerLinkButton";
import { HEADER_LOGO_URL } from "../constants/logos";


export default function Header({ locale }) {
  const otherLocale = locale === "ar" ? "en" : "ar";
  const switchHref = `/${otherLocale}/about-us`;

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 1, md: 2 },
        }}
      >
        {/* LOGO */}
        <Box sx={{ flex: 1, px: { xs: 1, md: 40 } }}>
          <a href={`/${locale}/about-us`}>
            <Image
              src={HEADER_LOGO_URL.brandLogo.url}
              alt={HEADER_LOGO_URL.brandLogo.alt}
              width={150}
              height={40}
              priority
              style={{ objectFit: "contain" }}
            />
          </a>
        </Box>

        {/* NAVIGATION */}
        <Box sx={{ display: "flex", gap: 1, px: { xs: 1, md: 40 } }}>
          <ServerLinkButton
            href={`/${locale}/about-us`}
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: "#E04E39",
              },
            }}
          >
            About Us
          </ServerLinkButton>

          <ServerLinkButton
            href={`/${locale}/destination-management`}
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: "#E04E39",
              },
            }}
          >
            DMC
          </ServerLinkButton>

          <Button component="a" href={switchHref} variant="outlined" sx={{ display: "flex", gap: 1 }}>
            <ReactCountryFlag
              svg
              countryCode={otherLocale === "ar" ? "SA" : "US"}
              style={{ width: "1.5em", height: "1.5em" }}
            />
            {otherLocale === "ar" ? "العربية" : "English"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
