import * as React from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Option from "../components/Option";
import RadioGroup from "@mui/joy/RadioGroup";
import CountDownTimer from "../components/CountDownTimer";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import questions from "../assets/questions";
import { optionsSelected, currentOption } from "../atoms/Exam";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/joy/Alert";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import LinearWithValueLabel from "../components/LinearWithValueLabel";
import { questionsAttemptedAtom } from "../atoms/Exam";
import img1 from "../assets/questions/1.png";
import img2 from "../assets/questions/2.png";
import img3 from "../assets/questions/3.png";
import img4 from "../assets/questions/4.png";
import img5 from "../assets/questions/5.png";
import img6 from "../assets/questions/6.png";
import img7 from "../assets/questions/7.png";
import img8 from "../assets/questions/8.png";
import img9 from "../assets/questions/9.png";
import img10 from "../assets/questions/10.png";
import axios from "axios";
import AppBar from "../components/AppBar";

function Question({
  question,
  questionNo,
  isSolved,
  optionSelected,
  setIsSelected,
}) {
  function Options() {
    const defaultOptionStyles = {
      label: () => ({
        sx: {
          fontWeight: "lg",
          fontSize: "md",
          color: "black",
        },
      }),
      action: ({ checked }) => ({
        sx: (theme) => ({
          ...(checked && {
            "--variant-borderWidth": "2px",
            "&&": {
              borderColor: theme.vars.palette.primary[500],
            },
          }),
        }),
      }),
    };
    const correctOptionStyles = {
      label: () => ({
        sx: {
          fontWeight: "lg",
          fontSize: "md",
          color: "black",
        },
      }),
      action: () => ({
        sx: (theme) => ({
          ...{
            "--variant-borderWidth": "2px",
            "&&": {
              borderColor: theme.vars.palette.success[500],
            },
          },
        }),
      }),
    };
    const wrongOptionStyles = {
      label: () => ({
        sx: {
          fontWeight: "lg",
          fontSize: "md",
          color: "black",
        },
      }),
      action: () => ({
        sx: (theme) => ({
          ...{
            "--variant-borderWidth": "2px",
            "&&": {
              borderColor: theme.vars.palette.danger[500],
            },
          },
        }),
      }),
    };
    const disabledOptionStyles = {
      label: () => ({
        sx: {
          fontWeight: "lg",
          fontSize: "md",
          color: "gray",
        },
      }),
    };
    const getOptionStyles = (value) => {
      if (!isSolved) {
        return defaultOptionStyles;
      } else if (isSolved && value == question.answer) {
        return correctOptionStyles;
      } else if (
        isSolved &&
        value == optionSelected &&
        optionSelected != question.answer
      ) {
        return wrongOptionStyles;
      } else {
        return disabledOptionStyles;
      }
    };
    return (
      <Box sx={{ width: "auto" }}>
        <RadioGroup
          aria-labelledby="storage-label"
          defaultValue="512GB"
          size="lg"
          sx={{ gap: 1.5 }}
        >
          {question.options.map((value, i) => (
            <Option
              value={value}
              key={i}
              styles={getOptionStyles(value)}
              isSolved={isSolved}
              setIsSelected={setIsSelected}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  }
  return (
    <div>
      <FormLabel
        id="storage-label"
        sx={{
          mb: 2,
          fontWeight: "xl",
          textTransform: "uppercase",
          fontSize: "xs",
          letterSpacing: "0.15rem",
        }}
      >
        {`Question ${questionNo}: `}
        <br />
        {question.question}
      </FormLabel>
      <Options />
    </div>
  );
}

function AlreadySubmitted() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "50%",
          margin: "100px auto",
          boxShadow: "0 0 12px 1px #adacac",
        }}
      >
        <Alert
          variant="soft"
          color="success"
          startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button
              size="sm"
              variant="solid"
              color="success"
              onClick={() => {
                navigate("/license");
              }}
            >
              Get License
            </Button>
          }
        >
          You have Already Submitted Your Exam Before.
        </Alert>
      </Box>
    </>
  );
}

function ExamPanel() {
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const setSubmittedAnswers = useSetRecoilState(optionsSelected);
  const [optionSelected, setOptionSelected] = useRecoilState(currentOption);
  const setQuestionsAttempted = useSetRecoilState(questionsAttemptedAtom);
  const [isSolved, setIsSolved] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
    alert("Please do not reload, go back, or close this tab.");
  };
  const submitAnswer = () => {
    setIsSolved(true);
    setSubmittedAnswers((arr) => [...arr, optionSelected]);
    setQuestionsAttempted((arr) => [...arr, questionNumber]);
  };
  React.useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);
  }, []);
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  return (
    <div>
      <LinearWithValueLabel progress={progress} />
      <div
        style={{
          position: "absolute",
          right: "35px",
          top: "25px",
        }}
      >
        <CountDownTimer
          duration={600}
          colors={["#ff9248", "#a20000"]}
          colorValues={[5, 2]}
          onComplete={() => {
            navigate("/results");
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          margin: "35px 200px",
          outline: "1px solid gray",
          padding: "20px",
          borderRadius: "20px",
          width: "65%",
        }}
      >
        <img
          src={images[questionNumber - 1]}
          style={{
            height: "100px",
            borderRadius: "15px",
            margin: "0 40%",
            marginBottom: "5px",
          }}
        />
        <Question
          question={questions[questionNumber - 1]}
          questionNo={questionNumber}
          isSolved={isSolved}
          optionSelected={optionSelected}
          setIsSelected={setIsSelected}
        />
        <div
          style={{
            marginTop: "20px",
            marginRight: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <Button
            color="primary"
            disabled={!isSelected}
            onClick={(e) => {
              submitAnswer();
              setIsSelected(false);
            }}
          >
            Submit
          </Button>
          <Button
            endDecorator={<KeyboardArrowRight />}
            color="neutral"
            onClick={() => {
              setProgress((prev) => prev + 10);
              setOptionSelected("");
              setIsSolved(false);
              if (questionNumber == questions.length) {
                window.removeEventListener("beforeunload", handleBeforeUnload);
                window.removeEventListener("popstate", handleBeforeUnload);
                window.removeEventListener("unload", handleBeforeUnload);
                navigate("/results");
              } else {
                setQuestionNumber((num) => num + 1);
              }
            }}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
}
export default function Exam() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  React.useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    if (!userID) {
      navigate("/invalid-user");
    }
    const fetchData = async () => {
      const res = await axios.get(
        `${backendURL}/user/details?userID=${userID}`
      );
      setUser(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {user ? user.isExamTaken ? <AlreadySubmitted /> : <ExamPanel /> : null}
    </div>
  );
}
