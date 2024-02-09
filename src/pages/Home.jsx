import { useEffect } from "react";
import AppBar from "../components/AppBar";
import ExamCard from "../components/ExamCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const naviagte = useNavigate();
  useEffect(() => {
    const innerHTML = document.getElementById("root").innerHTML;
    if (!innerHTML) {
      window.location.reload();
    }
    const userID = window.localStorage.getItem("userID");
    if (!userID) {
      naviagte("/invalid-user");
    }
  }, []);
  return (
    <>
      <AppBar />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ExamCard />
      </div>
    </>
  );
}
