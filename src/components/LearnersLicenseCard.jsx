import React from "react";
import { styled } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

// Define a custom styled component for the root container
const RootContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f0f0f0", // Adjust as needed
  borderRadius: "8px", // Adjust as needed
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adjust as needed
});

// Define a custom styled component for the avatar
const StyledAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  marginRight: "16px",
});

// Define a custom styled component for the details container
const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

// Define the LearnersLicenseCard component
const LearnersLicenseCard = ({ id, name, mobileNumber, address }) => {
  // Get current date and validity date
  const currentDate = new Date();
  const validityDate = new Date();
  validityDate.setMonth(validityDate.getMonth() + 3);

  return (
    <RootContainer>
      <StyledAvatar alt="Avatar" src="/path/to/avatar.jpg" />
      <DetailsContainer>
        <Typography variant="h5" gutterBottom>
          DRIVER LICENSE
        </Typography>
        <Typography variant="body1">
          <strong>ID:</strong> {id}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {name}
        </Typography>
        <Typography variant="body1">
          <strong>Mobile Number:</strong> {mobileNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {address}
        </Typography>
        <Typography variant="body1">
          <strong>Date of Issue:</strong> {currentDate.toDateString()}
        </Typography>
        <Typography variant="body1">
          <strong>Validity:</strong> {validityDate.toDateString()}
        </Typography>
      </DetailsContainer>
    </RootContainer>
  );
};

export default LearnersLicenseCard;
