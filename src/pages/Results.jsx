import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { questionsAttemptedAtom, optionsSelected } from "../atoms/Exam";
import questions from "../assets/questions";
import axios from "axios";
import AppBar from "../components/AppBar";
import ScoreCard from "../components/ScoreCard";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [score, setScore] = useState(-1);
  const submittedAnswers = useRecoilValue(optionsSelected);
  const questionsAttempted = useRecoilValue(questionsAttemptedAtom);
  const percentage = parseFloat(score / questions.length) * 100;
  const [isPassed, setIsPassed] = useState(null);
  const [user, setUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState("");
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userID) {
      navigate("/invalid-user");
    }
    const fetchData = async () => {
      const res = await axios.get(
        `${backendURL}/user/details?userID=${userID}`
      );
      if (res.data.isExamTaken) {
        navigate("/exam");
      }
      setUser(res.data);
    };
    const fetchAvatar = async () => {
      const res = await axios.get(
        `${backendURL}/user/avatar?userID=${userID}`,
        { responseType: "blob" }
      );
      const blob = await res.data;
      const objectURL = URL.createObjectURL(blob);
      setAvatarURL(objectURL);
    };
    const evaluateResults = () => {
      let count = 0;
      for (let i = 0; i < questionsAttempted.length; i++) {
        if (
          submittedAnswers[i] == questions[questionsAttempted[i] - 1].answer
        ) {
          count++;
        }
      }
      return count;
    };
    fetchData();
    fetchAvatar();
    const results = evaluateResults();
    setScore(results);
    if (results >= 6) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  }, []);
  useEffect(() => {
    const uploadResults = async () => {
      if (!user) {
        return;
      }
      if (score == -1) {
        return;
      }
      const updatedDetails = {
        name: user.name,
        number: user.number,
        password: user.password,
        address: user.address,
        isExamTaken: true,
        examPercentage: percentage,
      };
      if (isPassed) {
        updatedDetails["doi"] = formatDate(currentDate);
        updatedDetails["validity"] = formatDate(validityDate);
      }
      const res = await axios.post(
        `${backendURL}/user/details?userID=${userID}`,
        updatedDetails
      );
    };
    uploadResults();
  }, [score, user]);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const currentDate = new Date();
  const validityDate = new Date();
  validityDate.setMonth(validityDate.getMonth() + 3);
  return (
    <div>
      <AppBar />
      <div
        style={{
          margin: "10px 100px",
        }}
      >
        <h1
          style={{
            color: "#363535",
            fontFamily: "sans-serif",
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          Result
        </h1>
        {user ? (
          <ScoreCard
            score={score}
            total={questions.length}
            percentage={percentage}
            username={user.name.split(" ")[0]}
            isPassed={isPassed}
          />
        ) : null}
      </div>
    </div>
  );
}
