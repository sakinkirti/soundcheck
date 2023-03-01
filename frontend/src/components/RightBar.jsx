import React from "react";
import AlbumImg from "./PostComps/AlbumImg";
import ArtistName from "./PostComps/ArtistName";
import SongName from "./PostComps/SongName";
import ProfileMin from "./ProfileComps/ProfileMin";
import "./rightbar.css";

const RightBar = ({ username, albumImg, artist, song }) => {
  return (
    <div className="rightbarContainer">
      Your Song
      <div className="rightbarTop">
        <ProfileMin isUser username={username} style={{ float: "left" }} />
      </div>
      <div className="rightbarMid">
        <AlbumImg className="albumImg" img={albumImg} />
      </div>
      <div className="rightbarBottom">
        <SongName song={song} />
        <ArtistName artist={artist} />
      </div>
    </div>
  );
};

export default RightBar;
