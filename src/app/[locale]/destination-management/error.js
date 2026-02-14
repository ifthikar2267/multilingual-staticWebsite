"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Error({ error, reset }) {
  return (
    <Stack spacing={2}>
      <Alert severity="error">
        {error?.message || "Something went wrong while loading DMC page."}
      </Alert>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </Stack>
  );
}
