export default function InvalidUser() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "4px dashed gray",
        fontSize: "25px",
        alignItems: "center",
        width: "fit-content",
        margin: "50px auto",
        padding: "0 80px",
      }}
    >
      <h1>Error: 401</h1>
      <h3>Unauthorized Access</h3>
      <p>Please Login to Get Access</p>
    </div>
  );
}
