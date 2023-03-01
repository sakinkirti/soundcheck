import React from "react";
import ProfilePic from "./ProfilePic";
import Username from "./Username";
import { useNavigate } from "react-router-dom";

const ProfileMin = ({ userId, username, isUser = false }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = isUser ? "/myprofile" : `/profile/${userId}`;
    navigate(path);
  };
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "25px",
        height: "30px",
        textAlign: "left",
        paddingLeft: "10px",
        paddingTop: "3px",
      }}
    >
      <div style={{ height: "22px", width: "22px" }}>
        <ProfilePic />
      </div>
      <div
        onClick={routeChange}
        style={{ paddingLeft: "10px", cursor: "pointer" }}
      >
        <Username username={username} />
      </div>
    </div>
  );
};

export default ProfileMin;
