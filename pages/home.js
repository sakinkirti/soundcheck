import { getSession } from "next-auth/react";
import Rightbar from "@/components/Rightbar";
import { fetchSpotify } from "@/utils/fetchSpotify";
import client from "@/lib/sanity";
import { hasPostedTodayQuery, todayPostsQuery } from "@/lib/queries";
import { useState } from "react";
import { serverLogout } from "@/utils/serverLogout";
import Post from "@/components/Post";
import { Flex, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterModal from "@/components/modals/FilterModal";

function Home({ spotifyData, userPost, todayPosts, postStreak }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [feedPosts, setFeedPosts] = useState(todayPosts);
  const [feedFilter, setFeedFilter] = useState({
    date: new Date(),
    type: "Everyone",
  });
  const [filterOpened, { open: openFilter, close: closeFilter }] =
    useDisclosure(false);

  return (
    <>
      <FilterModal
        opened={filterOpened}
        close={closeFilter}
        feedFilter={feedFilter}
        setFeedFilter={setFeedFilter}
        todayPosts={todayPosts}
        feedPosts={feedPosts}
        setFeedPosts={setFeedPosts}
      />

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
          <Button
            variant="light"
            color="gray"
            size="sm"
            onClick={openFilter}
            sx={{
              position: "fixed",
              top: "2rem",
              left: "2rem",
              zIndex: 1000,
            }}
          >
            {feedFilter.type} on{" "}
            {feedFilter.date.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Button>
          {!feedPosts ? (
            <Text fz={"lg"}>
              No posts found. Try a different filter or check back later...
            </Text>
          ) : (
            feedPosts?.map((post) => (
              <Post
                key={post._id}
                post={post}
                currentlyPlaying={currentlyPlaying}
                setCurrentlyPlaying={setCurrentlyPlaying}
              />
            ))
          )}
        </Flex>

        <Rightbar
          postStreak={postStreak}
          spotifyData={spotifyData}
          userPost={userPost}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
      </Flex>
    </>
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
    const todaysString = today.toISOString();

    const { userPost, postStreak } = await client.fetch(hasPostedTodayQuery, {
      name: session?.user?.name,
      todayStart: todaysString,
    });

    const todayPosts = await client.fetch(todayPostsQuery, {
      name: session?.user?.name,
      todayStart: todaysString,
    });

    if (userPost) {
      return {
        props: {
          userPost,
          todayPosts,
          postStreak,
        },
      };
    }

    const spotifyData = await fetchSpotify(session?.user?.access_token);

    return {
      props: {
        todayPosts,
        spotifyData,
        postStreak,
      },
    };
  } catch {
    serverLogout(res);
  }
}

export default Home;
