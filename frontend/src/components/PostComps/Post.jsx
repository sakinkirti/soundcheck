import React from "react";
import ProfileMin from "../ProfileComps/ProfileMin";
import AlbumImg from "./AlbumImg";
import ArtistName from "./ArtistName";
import SongName from "./SongName";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import LikeCount from "./LikeCount";

const Post = (props) => {
  const [liked, setLiked] = useState(false);
  const like = () => setLiked(!liked);
  const likes = useRef(0);

  useEffect(() => {
    if (!liked) {
      likes.current += 1;
    } else {
      likes.current -= 1;
    }
  }, [liked]);

  const { userId, username, album, song, artist } = props;

  return (
    <div
      className="grid"
      style={{
        textAlign: "center",
        backgroundColor: "var(--color-beige)",
        borderRadius: "25px",
        padding: "10px",
        height: "200px",
      }}
    >
      <ProfileMin
        userId={userId}
        username={username}
        style={{ float: "center" }}
      />
      <AlbumImg img={album} />
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontSize: "10px",
            width: "60%",
            textAlign: "center",
            marginLeft: "18%",
          }}
        >
          <SongName song={song} />
          <ArtistName artist={artist} />
        </div>
        <div
          onClick={like}
          style={{
            float: "right",
            height: "30px",
            width: "30px",
            marginTop: "5px",
            cursor: "pointer",
            display: "flex",
          }}
        >
          <FaHeart
            style={{
              width: "20px",
              height: "20px",
              color: liked ? "red" : "white",
            }}
          />
          <LikeCount count={likes.current} />
        </div>
      </div>
    </div>
  );
};

export default Post;
