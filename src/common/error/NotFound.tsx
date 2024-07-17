import { Button, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div style={{ margin: "20px" }}>
        <Typography variant="h4">Page not found</Typography>
      </div>
      <img
        src="https://www.faynlab.com/wp-content/uploads/2023/10/husky-holding-back-husky-trying-not-to-sneeze.gif"
        alt="gif"
        width={"250px"}
      ></img>
      <Button href={'/'}style={{marginTop:"30px"}}>Return to homepage</Button>
    </div>
  );
};
export default NotFound;
