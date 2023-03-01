import React from "react";
import defaultPic from "../../public/default_profile.png";

const ProfilePic = (styles, src) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img style={{ styles }} src={defaultPic} alt="default" />
    </div>
  );
};

export default ProfilePic;
