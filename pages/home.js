import { getSession } from "next-auth/react";
import Rightbar from "@/components/Rightbar";
import { Flex } from "@mantine/core";
import { fetchSpotify } from "@/utils/fetchSpotify";
import client from "@/lib/sanity";
import { hasPostedTodayQuery } from "@/lib/queries";
import { useState } from "react";
import { serverLogout } from "@/utils/serverLogout";

import Post from "@/components/Post";
// import { DatePicker } from "@mantine/dates";
// import { MdOutlineDateRange } from "react-icons/md";

function Home({ spotifyData, userPost, postStreak }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  return (
    <Flex
      style={{
        height: "calc(100vh - 5rem)",
      }}
      justify={"space-between"}
      align={"stretch"}
    >
      <Flex
        gap={10}
        justify={"space-evenly"}
        align={"center"}
        wrap={"wrap"}
        w={"80%"}
        h="100%"
        style={{
          transform: "translateY(5rem)",
        }}
      >
        {/* main content */}
        <Post
          post={userPost}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      </Flex>

      <Rightbar
        postStreak={postStreak}
        spotifyData={spotifyData}
        userPost={userPost}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
      />
    </Flex>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  if (!session) {
    serverLogout(res);
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { userPost, postStreak } = await client.fetch(hasPostedTodayQuery, {
      name: session?.user?.name,
      todayStart: today.toISOString(),
    });

    // fetch today posts

    if (userPost) {
      return { props: { userPost, postStreak } };
    }

    const spotifyData = await fetchSpotify(session?.user?.access_token);

    return {
      props: {
        postStreak,
        spotifyData,
      },
    };
  } catch {
    serverLogout(res);
  }
}

export default Home;
