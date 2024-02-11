import React, { useEffect, useRef, useState } from "react";
import { downloadPNG, printGivenHtml } from "../components/HtmlToPngGenerator";
import AppBar from "../components/AppBar";
import Button from "@mui/joy/Button";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
import { Typography } from "@mui/material";
import barCodeImg from "../assets/barcode.png";
import { Warning } from "../components/Alerts";
const backendURL = "https://odals-backend.onrender.com";

function ImageGeneratingTemplate({ Component }) {
  const imageRef = useRef(null);
  const customOuterDivStyles = {
    // border: "2px solid black",
    width: "fit-content",
    // padding: "30px 30px 15px 30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    // borderRadius: "15px",
    // boxShadow: "0 0 10px 1px black",
    // backgroundColor: "white",
  };
  const customButtonsDivStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  };
  return (
    <div style={customOuterDivStyles}>
      <div ref={imageRef} style={{ display: "inline-block" }}>
        <Component />
      </div>
      <div style={customButtonsDivStyles}>
        <Button
          component="a"
          onClick={() => {
            downloadPNG(imageRef);
          }}
          startDecorator={<DownloadIcon />}
        >
          Download
        </Button>
        <Button
          component="a"
          color="warning"
          onClick={() => {
            printGivenHtml(imageRef);
          }}
          startDecorator={<PrintIcon />}
        >
          Print
        </Button>
      </div>
    </div>
  );
}
function LicenceCard() {
  const [user, setUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState("");
  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    const fetchData = async () => {
      const res = await axios.get(
        `${backendURL}/user/details?userID=${userID}`
      );
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
    fetchData();
    fetchAvatar();
  }, []);
  return (
    <>
      {user ? (
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "12px",
            width: "fit-content",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              backgroundColor: "#007fff",
              textAlign: "center",
              color: "white",
              borderRadius: "12px 12px 0 0",
              padding: "6px 0",
              fontWeight: "bold",
            }}
          >
            DRIVER LICENSE
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "8px 15px 15px 15px",
            }}
          >
            <div>
              <img src={avatarURL} style={{ height: "140px" }} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#c70606",
                    borderRadius: "20px",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "70%",
                  }}
                >
                  Learner
                </Typography>
              </div>

              <Typography variant="body1">
                <strong>ID:</strong> {user._id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile Number:</strong> {user.number}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {user.address}
              </Typography>
              <div
                style={{
                  display: "flex",
                  gap: "60px",
                }}
              >
                <Typography variant="body1">
                  <strong>Date of Issue:</strong> {user.doi}
                </Typography>
                <Typography variant="body1">
                  <strong>Validity:</strong> {user.validity}
                </Typography>
              </div>
              <img
                src={barCodeImg}
                style={{ width: "100%", height: "40px", marginTop: "10px" }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default function Licence() {
  const [isValid, setIsValid] = useState(false);
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);
  const [error, setError] = useState({});
  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    if (!userID) {
      navigate("/invalid-user");
    }
    const verifyUser = async () => {
      const res = await axios.get(
        `${backendURL}/user/details?userID=${userID}`
      );
      const isExamTaken = res.data.isExamTaken;
      if (!isExamTaken) {
        setError({
          title: "Error",
          description: "You have not Attempted the Exam Yet",
        });
        setIsWarningAlertOpen(true);
        return;
      }
      const percentage = res.data.examPercentage;
      if (percentage < 60) {
        setError({
          title: "Error",
          description: "You have not Passed in the Exam",
        });
        setIsWarningAlertOpen(true);
        return;
      }
      setIsValid(true);
    };
    verifyUser();
  }, []);
  return (
    <div>
      <AppBar />
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "0",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Warning
          title={error.title}
          description={error.description}
          isOpen={isWarningAlertOpen}
          closeAlert={() => {
            setIsWarningAlertOpen(false);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isValid ? (
          <div>
            <h1
              style={{
                color: "#363535",
                fontFamily: "sans-serif",
                fontSize: "40px",
              }}
            >
              Your License Card
            </h1>
            <ImageGeneratingTemplate Component={LicenceCard} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
