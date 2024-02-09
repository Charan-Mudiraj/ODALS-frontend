import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

const Container = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Root = styled(Box)({
  position: "relative",
});

const Bottom = styled(CircularProgress)({
  color: "#b2b2b2",
});

const Top = styled(CircularProgress)({
  animationDuration: "100ms",
  position: "absolute",
  left: 0,
});

const Circle = styled("circle")({
  strokeLinecap: "round",
});

const Text = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.35em",
  marginTop: "5px",
});

const CountDownTimer = (props) => {
  const { duration, colors = [], colorValues = [], onComplete } = props;

  const [timeDuration, setTimeDuration] = useState(duration);
  const [countdownText, setCountdownText] = useState();
  const [countdownPercentage, setCountdownPercentage] = useState(100);
  const [countdownColor, setCountdownColor] = useState("#004082");

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTimeDuration((prev) => {
        const newTimeDuration = prev - 1;
        const percentage = Math.ceil((newTimeDuration / duration) * 100);
        setCountdownPercentage(percentage);

        if (newTimeDuration === 0) {
          clearInterval(intervalId);
          intervalId = null;
          onComplete();
        }

        return newTimeDuration;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      intervalId = null;
    };
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeDuration / 60);
    const seconds = timeDuration % 60;
    setCountdownText(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  }, [timeDuration]);

  useEffect(() => {
    for (let i = 0; i < colorValues.length; i++) {
      const item = colorValues[i];
      if (timeDuration === item) {
        setCountdownColor(colors[i]);
        break;
      }
    }
  }, [timeDuration]);

  return (
    <>
      <Container>
        <Root>
          <Bottom variant="determinate" size={65} thickness={4} value={100} />
          <Top
            classes={{
              circle: Circle,
            }}
            variant="determinate"
            size={65}
            thickness={4}
            value={countdownPercentage}
            style={{
              transform: "scaleX(-1) rotate(-90deg)",
              color: countdownColor,
            }}
          />
        </Root>
        <Text style={{ fontSize: "large" }}>{countdownText}</Text>
      </Container>
    </>
  );
};

export default CountDownTimer;
