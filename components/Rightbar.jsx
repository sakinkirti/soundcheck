import { Flex, Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Post from "./Post";
import SelectSongModal from "./modals/SelectSongModal";
import { pluralize } from "@/utils/pluralize";
import CommentModal from "./modals/CommentModal";
import LikeModal from "./modals/LikeModal";
import { MdOutlineComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";

function Rightbar({
  spotifyData,
  userPost,
  currentlyPlaying,
  setCurrentlyPlaying,
  postStreak,
}) {
  const [post, setPost] = useState(userPost);
  const hasPostedToday = !!post;
  const [selectSongOpened, { open: openSelectSong, close: closeSelectSong }] =
    useDisclosure(!hasPostedToday);
  const [likeOpen, { open: openLike, close: closeLike }] = useDisclosure(false);
  const [commentOpen, { open: openComment, close: closeComment }] =
    useDisclosure(false);
  const [streak, setStreak] = useState(postStreak);
  const selectRef = useRef(null);
  const { data: session } = useSession();

  const [numComments, setNumComments] = useState(post?.comments?.length || 0);
  const [numLikes, setNumLikes] = useState(post?.likes?.length || 0);

  useEffect(() => {
    if (selectSongOpened) {
      setTimeout(() => {
        selectRef?.current?.focus();
      }, 200);
    }
  }, [selectRef?.current]);

  return (
    <>
      <SelectSongModal
        selectRef={selectRef}
        opened={selectSongOpened}
        close={closeSelectSong}
        spotifyData={spotifyData}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        setStreak={setStreak}
        session={session}
        setPost={setPost}
      />
      <CommentModal
        session={session}
        post={post}
        setPost={setPost}
        opened={commentOpen}
        close={closeComment}
        isUser={true}
      />
      <LikeModal
        session={session}
        post={post}
        setPost={setPost}
        opened={likeOpen}
        close={closeLike}
        isUser={true}
      />

      <Flex
        w={"20%"}
        sx={(theme) => ({
          borderLeft: `1px solid ${theme.colors.lightWhite[6]}`,
          boxShadow: `0 0.5px 0px 0.5px ${theme.colors.lightWhite[6]}`,
        })}
        justify={"space-between"}
        align={"center"}
        direction={"column"}
        style={{
          position: "fixed",
          left: "80%",
          height: "calc(100vh - 5rem)",
          transform: "translateY(5rem)",
          zIndex: 1,
        }}
      >
        {hasPostedToday ? (
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            h={"100%"}
          >
            <Post
              withHeader={false}
              post={post}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
            />
            <Stack w="100%" mt={"1rem"} spacing={10}>
              <Button
                leftIcon={<AiFillFire fontSize={"1.1rem"} />}
                color="green"
                variant={"filled"}
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor: `${theme.colors.green[8]} !important`,
                    cursor: "default",
                  },
                  "&:active": {
                    transform: "none !important",
                  },
                })}
              >
                {streak} day streak
              </Button>
              <Button
                onClick={() => {
                  if (numLikes > 0) {
                    openLike();
                  }
                }}
                leftIcon={<FaHeart />}
                color="gray"
                variant={"outline"}
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor:
                      numLikes > 0 ? "lightGray" : "transparent !important",
                    cursor: numLikes > 0 ? "pointer" : "default",
                  },
                  "&:active": {
                    transform:
                      numLikes > 0
                        ? theme.activeStyles.transform
                        : "none !important",
                  },
                })}
              >
                {numLikes} {pluralize("like", numLikes)}
              </Button>
              <Button
                leftIcon={<MdOutlineComment />}
                onClick={() => {
                  if (numComments > 0) {
                    openComment();
                  }
                }}
                color="gray"
                variant={"outline"}
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor:
                      numComments > 0 ? "lightGray" : "transparent !important",
                    cursor: numComments > 0 ? "pointer" : "default",
                  },
                  "&:active": {
                    transform:
                      numComments > 0
                        ? theme.activeStyles.transform
                        : "none !important",
                  },
                })}
              >
                {numComments} {pluralize("comment", numComments)}
              </Button>
            </Stack>
          </Flex>
        ) : (
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={16}
            h={"100%"}
          >
            <Button
              size={"md"}
              onClick={() => {
                openSelectSong();
                setTimeout(() => {
                  selectRef?.current?.focus();
                }, 200);
              }}
              disabled={selectSongOpened}
            >
              Choose a song
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default Rightbar;
