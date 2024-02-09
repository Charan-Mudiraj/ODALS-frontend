import * as React from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

export default function CircularProgressResult({ score, total, percentage }) {
  return (
    <Box
      sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}
    >
      <CircularProgress size="lg" determinate value={percentage}>
        {score} / {total}
      </CircularProgress>
    </Box>
  );
}
