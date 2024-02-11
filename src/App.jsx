import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { lazy, Suspense } from "react";
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Exam = lazy(() => import("./pages/Exam"));
const InvalidUser = lazy(() => import("./pages/InvalidUser"));
const Results = lazy(() => import("./pages/Results"));
const License = lazy(() => import("./pages/License"));
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "axios";
const backendURL = process.env.BACKEND_URL;
function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    // Start the server and do not wait for res
    axios.get(`${backendURL}`);

    const userID = window.localStorage.getItem("userID");
    if (userID) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  }, []);
  return null;
}
export function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress size="lg" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/invalid-user" element={<InvalidUser />} />
            <Route path="/results" element={<Results />} />
            <Route path="/license" element={<License />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
