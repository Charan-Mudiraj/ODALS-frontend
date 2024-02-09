import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScoreCard({
  score,
  total,
  percentage,
  username,
  isPassed,
}) {
  const navigate = useNavigate();
  const title = isPassed ? "🎊 Congrats " + username + " 🎊" : "Exam Failed";
  const description = isPassed
    ? "You have Passed in Exam Successfully"
    : "You have Failed in Exam. Better Luck Next Time";
  const cardColor = isPassed ? "success" : "warning";
  const status = isPassed ? "Passed" : "Failed";
  return (
    <Card variant="solid" color={cardColor} invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={percentage}>
          {score} / {total}
        </CircularProgress>
        <CardContent>
          <Typography level="h3">{title}</Typography>
          <Typography level="body-lg">{description}</Typography>
          <Typography level="body-md">
            <b>Status: </b>
            {status}
          </Typography>
          <Typography level="body-md">
            <b>Percentage: </b>
            {percentage}
          </Typography>
        </CardContent>
      </CardContent>
      {isPassed ? (
        <Button
          variant="solid"
          size="sm"
          onClick={() => {
            navigate("/license");
          }}
        >
          Get License
        </Button>
      ) : null}
    </Card>
  );
}
