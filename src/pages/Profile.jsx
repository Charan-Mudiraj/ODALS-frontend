import AppBar from "../components/AppBar";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { useEffect, useState } from "react";
import "./styles/profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Warning, Success } from "../components/Alerts";
const backendURL = "https://odals-backend.onrender.com";
export default function Profile() {
  const [isUpdating, setUpdating] = useState(false);
  const [isChangingPwd, setChangingPwd] = useState(false);
  const [user, setUser] = useState({});
  const [avatarURL, setAvatarURL] = useState("");
  const navigate = useNavigate();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [success, setSuccess] = useState({});
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);
  const [error, setError] = useState({});
  useEffect(() => {
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
  const updateAvatar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.addEventListener("change", async () => {
      const selectedFile = input.files[0];
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      const userID = window.localStorage.getItem("userID");
      const res = await axios.post(
        `${backendURL}/user/avatar?userID=${userID}`,
        formData
      );
      window.location.reload();
    });
  };
  const savePassword = async () => {
    const currPassword = document.getElementById("curr-password").value;
    if (currPassword != user.password) {
      setError({
        title: "Error",
        description: "Current Password is Incorrect",
      });
      setIsWarningAlertOpen(true);
      return;
    }
    const newPassword = document.getElementById("new-password").value;
    if (newPassword == user.password) {
      setError({
        title: "Error",
        description: "New Password Cannot be the same as Current Password",
      });
      setIsWarningAlertOpen(true);
      return;
    }
    const updatedDetails = {
      name: user.name,
      address: user.address,
      number: user.number,
      password: newPassword,
    };
    const res = await axios.post(
      `${backendURL}/user/details?userID=${user._id}`,
      updatedDetails
    );
    const status = res.data.status;
    const message = res.data.message;
    if (status == "ok") {
      setChangingPwd(false);
      setSuccess({
        title: "Success",
        description: "Password Updated Successfully",
      });
      setIsSuccessAlertOpen(true);
    } else {
      setError({ title: "Error", description: message });
      setIsWarningAlertOpen(true);
    }
  };
  const saveProfile = async () => {
    const newName = document.getElementById("name").value;
    const newAddress = document.getElementById("address").value;
    const newNumber = document.getElementById("number").value;
    const updatedDetails = {};
    updatedDetails["name"] = newName.trim(" ");
    updatedDetails["address"] = newAddress.trim(" ");
    updatedDetails["number"] = newNumber.trim(" ");
    updatedDetails["password"] = user.password;
    const res = await axios.post(
      `${backendURL}/user/details?userID=${user._id}`,
      updatedDetails
    );
    const status = res.data.status;
    const message = res.data.message;
    if (status == "ok") {
      setUpdating(false);
      window.location.reload();
    } else {
      setError({ title: "Error", description: message });
      setIsWarningAlertOpen(true);
    }
  };
  function ProfileCard() {
    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            outline: "3px solid gray",
            outlineStyle: "dashed",
            margin: "50px auto",
            columnGap: "40px",
            fontSize: "25px",
            width: "max-content",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "400px",
              }}
            >
              <div>
                <FormLabel>UserID</FormLabel>
                <Input id="_id" disabled defaultValue={user._id} />
              </div>
              <div>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your Name"
                  id="name"
                  disabled={!isUpdating}
                  defaultValue={user.name}
                />
              </div>
              <div>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Your Address"
                  id="address"
                  disabled={!isUpdating}
                  defaultValue={user.address}
                  sx={{ outlineColor: "black" }}
                />
              </div>
              <div>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  placeholder="10 digit mobile number"
                  id="number"
                  disabled={!isUpdating}
                  defaultValue={user.number}
                  sx={{
                    "--Input-focusedHighlight": "red",
                    "&:focus-within": {
                      borderColor: "red",
                    },
                  }}
                />
              </div>
              <div>
                <FormLabel>Email</FormLabel>
                <Input id="email" disabled defaultValue={user.email} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              {isUpdating ? (
                <Button
                  color="primary"
                  onClick={saveProfile}
                  id="save-profile-btn"
                >
                  Save
                </Button>
              ) : (
                <>
                  <Button
                    color="primary"
                    onClick={() => {
                      setUpdating(true);
                    }}
                    id="update-profile-btn"
                  >
                    Update Profile
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setChangingPwd(true);
                    }}
                    id="change-password-btn"
                  >
                    Change Password
                  </Button>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <img
              src={avatarURL}
              style={{
                height: "150px",
                borderRadius: "20px",
              }}
            />
            <Button color="primary" onClick={updateAvatar}>
              Update Avatar
            </Button>
          </div>
        </div>
      </>
    );
  }
  function ChangePasswordCard() {
    return (
      <>
        <div
          style={{
            outline: "3px solid gray",
            outlineStyle: "dashed",
            margin: "50px auto",
            fontSize: "25px",
            width: "max-content",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "400px",
              }}
            >
              <div>
                <FormLabel>Current Password</FormLabel>
                <Input
                  placeholder="Enter Current Password"
                  id="curr-password"
                />
              </div>
              <div>
                <FormLabel>New Password</FormLabel>
                <Input placeholder="Enter New Password" id="new-password" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <Button color="primary" onClick={savePassword}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
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
        <Success
          title={success.title}
          description={success.description}
          isOpen={isSuccessAlertOpen}
          closeAlert={() => {
            setIsSuccessAlertOpen(false);
          }}
        />
      </div>
      {isChangingPwd ? <ChangePasswordCard /> : <ProfileCard />}
    </>
  );
}
