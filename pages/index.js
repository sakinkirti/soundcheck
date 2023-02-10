import { useState, useEffect } from "react";
import { BsSpotify } from "react-icons/bs";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
        }}
      >
        Soundcheck!
      </h1>
      <button
        style={{
          backgroundColor: "#1DB954",
          padding: "0.5rem 1rem",
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          border: "none",
          marginTop: "0.1rem",
          cursor: "pointer",
          opacity: isHovered ? 0.9 : 1,
          transition: "all 0.1s ease-in-out",
          transform: isActive ? "scale(0.99)" : "scale(1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        <BsSpotify fontSize="1.2rem" />
        CONNECT WITH SPOTIFY
      </button>

      <h1>{data?.name}</h1>
    </div>
  );
};

export default Home;
