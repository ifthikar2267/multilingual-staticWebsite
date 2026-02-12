import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HeaderClient from "@/components/layout/HeaderClient";
import Footer from "@/components/layout/Footer";

export default function AppShell({ locale, children }) {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <HeaderClient locale={locale} />
      <Container component="main" sx={{ flex: 1, width: "100%", maxWidth: "100% !important" }}>
        {children}
      </Container>
      <Footer locale={locale} />
    </Box>
  );
}

