// import React from "react";
import "./rightbar.module.css";

const RightBar = () => {
  return (
    <div className="rightbarContainer">
      Your Song
      <div className="rightbarTop"></div>
      <div className="rightbarMid">
        <h1>insert album image</h1>
      </div>
      <div className="rightbarBottom">
        <h2>song name</h2>
        <h3>artist name</h3>
      </div>
    </div>
  );
};

export default RightBar;
