import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function Test() {
  return (
    <Stack spacing={2} direction="row">
      <Typography variant="h1" gutterBottom>
        ياسر الدوسري
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
