import {
  Flex,
  Image,
  Title,
  Text,
  ActionIcon,
  Button,
  Tooltip,
  RingProgress,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { MdOutlineComment } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import ProfileLink from "./ProfileLink";
import { BsSpotify, BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useRef, useEffect, useState } from "react";
import { truncateText } from "@/utils/truncateText";
import { pluralize } from "@/utils/pluralize";
import { useDisclosure } from "@mantine/hooks";
import CommentModal from "./modals/CommentModal";
import LikeModal from "./modals/LikeModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

function Post({
  post,
  currentlyPlaying,
  setCurrentlyPlaying,
  withHeader = true,
}) {
  const [currentPost, setCurrentPost] = useState(post);
  const theme = useMantineTheme();
  const [imageHovered, setImageHovered] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const { data: session } = useSession();
  const audioRef = useRef(null);
  const isCurrent = currentlyPlaying === currentPost?._id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentOpen, { open: openComment, close: closeComment }] =
    useDisclosure(false);
  const [likeOpen, { open: openLike, close: closeLike }] = useDisclosure(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const isLiked = !!currentPost?.likes?.find(
    (like) => like.username === session?.user?.name
  );
  const isCommented = !!currentPost?.comments?.find(
    (comment) => comment.username === session?.user?.name
  );
  const numComments = currentPost?.comments?.length || 0;
  const numLikes = currentPost?.likes?.length || 0;

  const likePost = async () => {
    setIsLikeLoading(true);
    openLike();
    const now = new Date().toISOString();
    const oldLikes = currentPost?.likes || [];
    if (isLiked) {
      setCurrentPost({
        ...currentPost,
        likes: oldLikes.filter((like) => like.username !== session?.user?.name),
      });
    } else {
      setCurrentPost({
        ...currentPost,
        likes: [
          ...oldLikes,
          {
            username: session?.user?.name,
            userImage: session?.user?.image,
            createdAt: now,
          },
        ],
      });
    }
    try {
      await axios.post("/api/protected/like", {
        postID: post?._id,
        name: session?.user?.name,
        type: isLiked ? "unlike" : "like",
        createdAt: now,
      });
      notifications.show({
        title: "Success",
        message: `You ${isLiked ? "unliked" : "liked"} ${
          currentPost?.username
        }'s post`,
        color: "green",
      });
      setIsLikeLoading(false);
    } catch {
      setIsLikeLoading(false);
      setCurrentPost({
        ...currentPost,
        likes: [...oldLikes],
      });
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener("play", () => {
      setCurrentlyPlaying(currentPost?._id);
      setIsPlaying(true);
    });
    audioRef.current.addEventListener("pause", () => setIsPlaying(false));
    audioRef.current.addEventListener("timeupdate", () => {
      if (!audioRef.current) return;
      const percent =
        (audioRef?.current?.currentTime / audioRef?.current?.duration) * 100;
      setSongProgress(percent);
    });
    audioRef.current.addEventListener("ended", () => setSongProgress(0));
  }, []);

  useEffect(() => {
    if (!isCurrent) {
      audioRef.current.pause();
    }
  }, [currentlyPlaying]);

  return (
    <>
      <CommentModal
        session={session}
        post={currentPost}
        setPost={setCurrentPost}
        opened={commentOpen}
        close={closeComment}
        isCommented={isCommented}
      />
      <LikeModal
        post={currentPost}
        isLoading={isLikeLoading}
        opened={likeOpen}
        close={closeLike}
      />

      <Flex
        bg="lightGray"
        justify={"center"}
        align={"center"}
        direction={"column"}
        px={"1.25rem"}
        pt={withHeader ? "0rem" : "0.75rem"}
        pb={"0.5rem"}
        style={{
          borderRadius: "0.5rem",
        }}
        maw={"calc(200px + 1.25rem)"}
        mah={"100%"}
      >
        {withHeader && (
          <Flex
            w="200px"
            justify={"space-between"}
            align={"end"}
            pt="0.75rem"
            pb="0.25rem"
            mb={"0.25rem"}
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.lightWhite[7]}`,
              transform: "translateY(-0.3rem)",
            })}
          >
            <ProfileLink
              username={currentPost?.username}
              userImage={currentPost?.userImage}
            />
            <Button.Group>
              <Tooltip
                label={`${numComments} ${pluralize("comment", numComments)}`}
              >
                <ActionIcon
                  title={
                    !isCommented ? "Comment on this post" : "View comments"
                  }
                  radius="xl"
                  size={"1.6rem"}
                  variant={"transparent"}
                  onClick={openComment}
                  sx={{
                    color: isCommented ? theme.colors.blue[3] : "inherit",
                  }}
                >
                  <MdOutlineComment />
                </ActionIcon>
              </Tooltip>

              <Tooltip
                label={`${numLikes} ${pluralize("like", numLikes)}`}
                events={{
                  hover: true,
                  touch: true,
                  focus: true,
                }}
              >
                <ActionIcon
                  title={`${isLiked ? "Unlike" : "Like"} this post`}
                  variant={"transparent"}
                  radius="xl"
                  size={"1.6rem"}
                  onClick={likePost}
                  sx={(theme) => ({
                    color: isLiked ? theme.colors.heartRed[8] : "inherit",
                    "&[data-disabled]": {
                      color: "#f87171 !important",
                    },
                  })}
                >
                  <FaHeart />
                </ActionIcon>
              </Tooltip>
            </Button.Group>
          </Flex>
        )}

        <Flex align="center" justify={"center"} direction={"column"}>
          <div
            style={{
              position: "relative",
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <Image
              src={currentPost?.albumImage}
              alt={currentPost?.albumName}
              radius={"0.25rem"}
              width={200}
              height={200}
              withPlaceholder
              style={{
                opacity: imageHovered || isPlaying ? 0.3 : 1,
                transition: "opacity 0.2s ease-in-out",
              }}
            />

            {(imageHovered || isPlaying) && (
              <RingProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                title={isPlaying ? "Pause" : "Play"}
                sections={[
                  {
                    value: songProgress,
                    color: theme.colors.spotify[8],
                  },
                ]}
                size={70}
                thickness={5}
                label={
                  <Center>
                    <ActionIcon
                      onClick={() => {
                        if (!isCurrent) {
                          audioRef.current.pause();
                          audioRef.current.currentTime = 0;
                        }
                        if (!isPlaying) {
                          audioRef.current.play();
                          setIsPlaying(true);
                        } else {
                          audioRef.current.pause();
                          setIsPlaying(false);
                        }
                      }}
                      title={isPlaying ? "Pause" : "Play"}
                      size="3rem"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent !important",
                        },
                      }}
                    >
                      {!isPlaying ? (
                        <BsPlayCircleFill
                          style={{
                            cursor: "pointer",
                          }}
                          fontSize={"3rem"}
                        />
                      ) : (
                        <BsPauseCircleFill
                          style={{
                            cursor: "pointer",
                          }}
                          fontSize={"3rem"}
                        />
                      )}
                    </ActionIcon>
                  </Center>
                }
              />
            )}
            {(imageHovered || isPlaying) && (
              <ActionIcon
                title="Listen on Spotify"
                component="a"
                href={currentPost?.songUrl}
                target="_blank"
                radius={"xl"}
                size={"2rem"}
                variant={"transparent"}
                sx={{
                  cursor: "pointer !important",
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                }}
              >
                <BsSpotify
                  fontSize={"1.25rem"}
                  style={{
                    cursor: "pointer !important",
                    color: theme.colors.spotify[8],
                  }}
                />
              </ActionIcon>
            )}
          </div>

          <audio
            src={currentPost?.previewUrl}
            type="audio/mpeg"
            ref={audioRef}
          />

          <Flex direction={"column"} justify={"center"} align={"center"} mt={8}>
            <Title
              title={
                currentPost?.songName.length >= 15
                  ? currentPost?.songName
                  : null
              }
              order={3}
              color="white"
              sx={{
                cursor: "default",
              }}
            >
              {truncateText(currentPost?.songName, 15)}
            </Title>
            <Text
              title={
                currentPost?.artists.join(", ").length >= 20
                  ? currentPost?.artists.join(", ")
                  : null
              }
              color="rgba(255, 255, 255, 0.8)"
              sx={{
                cursor: "default",
              }}
            >
              {truncateText(currentPost?.artists.join(", "), 20)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Post;
