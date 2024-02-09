import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import carLogo from "../assets/car.png";
import { useNavigate } from "react-router-dom";
export default function ExamCard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "85%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          overflow: "auto",
          resize: "none",
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={200} sx={{ minWidth: 200 }}>
          <img src={carLogo} loading="lazy" alt="" />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            Driving Assessment and Licensing Exam
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Get a Test Driving License Upon Successful Completion
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Questions
              </Typography>
              <Typography fontWeight="lg">10</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Time Limit
              </Typography>
              <Typography fontWeight="lg">10 minutes</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Minimum Score
              </Typography>
              <Typography fontWeight="lg">60 / 100</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Exam Type
              </Typography>
              <Typography fontWeight="lg">Online</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                navigate("/exam");
              }}
            >
              Start Exam
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
