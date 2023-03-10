import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Post from "./Post";
import SelectSongModal from "./modals/SelectSongModal";

function Rightbar({
  spotifyData,
  post,
  setPost,
  currentlyPlaying,
  setCurrentlyPlaying,
  timeAgo,
}) {
  const [originalCaption, setOriginalCaption] = useState(post?.caption || "");
  const hasPostedToday = !!post;
  const [selectSongOpened, { open: openSelectSong, close: closeSelectSong }] =
    useDisclosure(!hasPostedToday);
  const selectRef = useRef(null);
  const { data: session } = useSession();
  const [editingCaption, setEditingCaption] = useState(!originalCaption);

  return (
    <>
      <SelectSongModal
        selectRef={selectRef}
        opened={selectSongOpened}
        close={closeSelectSong}
        spotifyData={spotifyData}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        session={session}
        postID={post?._id}
        setPost={setPost}
        originalCaption={originalCaption}
        setOriginalCaption={setOriginalCaption}
        editingCaption={editingCaption}
        setEditingCaption={setEditingCaption}
      />

      <Flex
        w={"25%"}
        sx={(theme) => ({
          borderLeft: `1px solid ${theme.colors.lightWhite[6]}`,
          boxShadow: `0 0.5px 0px 0.5px ${theme.colors.lightWhite[6]}`,
        })}
        justify={"space-between"}
        align={"center"}
        direction={"column"}
        style={{
          position: "fixed",
          left: "75%",
          height: "calc(100vh - 5rem)",
          transform: "translateY(5rem)",
          zIndex: 1,
        }}
      >
        {hasPostedToday && (
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            h={"100%"}
          >
            <Post
              isUser
              post={post}
              setPost={setPost}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
              originalCaption={originalCaption}
              setOriginalCaption={setOriginalCaption}
              editingCaption={editingCaption}
              setEditingCaption={setEditingCaption}
              timeAgo={timeAgo}
              isRightbar
            />
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default Rightbar;
