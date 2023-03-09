import {
  Flex,
  Image,
  Title,
  Text,
  ActionIcon,
  RingProgress,
  Center,
  UnstyledButton,
  useMantineTheme,
  Tooltip,
  Stack,
  ScrollArea,
  Avatar,
  Button,
  TextInput,
  Textarea,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { FaHeart, FaUserPlus, FaUserCheck } from "react-icons/fa";
import {
  BsSpotify,
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsCheck,
  BsPencil,
} from "react-icons/bs";
import { useRef, useEffect, useState } from "react";
import { truncateText } from "@/utils/truncateText";
import { pluralize } from "@/utils/pluralize";
import PostModal from "./modals/PostModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AiOutlineComment, AiFillDelete, AiFillEdit } from "react-icons/ai";
import EmojiPicker from "./EmojiPicker";
import { useDisclosure } from "@mantine/hooks";

const CommentCard = ({
  text,
  username,
  userImage,
  createdAt,
  formattedCreatedAt,
  isUser,
  post,
  setPost,
  setComment,
  setCommentEditing,
  setIsEditType,
  setOriginalComment,
  setEditCommentCreatedAt,
  setIsDeleteLoading,
}) => {
  return (
    <Stack
      w={"100%"}
      maw={375}
      p={"xs"}
      sx={{
        borderRadius: "0.25rem",
        border: "0.75px solid rgba(201, 201, 201, 0.25)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        // backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Flex
        w={"100%"}
        justify={"space-between"}
        align={"center"}
        sx={{
          borderBottom: "1px solid rgba(201, 201, 201, 0.5)",
        }}
      >
        <Flex align={"center"} gap={"xs"} pb={4}>
          <Link passHref href={isUser ? "/my-profile" : `/profile/${username}`}>
            <UnstyledButton>
              <Flex
                gap={"xs"}
                title={isUser ? "Your profile" : `${username}'s profile`}
                styles={{
                  cursor: "pointer !important",
                }}
                align="center"
                mb={-1}
              >
                <Avatar
                  size={32}
                  src={userImage}
                  alt={`${username}'s profile`}
                  radius={"xl"}
                  style={{
                    border: "1px solid #c0c1c4",
                  }}
                />
                <Title
                  order={6}
                  fw={500}
                  sx={{
                    color: "#e7e7e7",
                    cursor: "default",
                  }}
                >
                  {truncateText(username, 16)}
                </Title>
              </Flex>
            </UnstyledButton>
          </Link>
        </Flex>
        <Text
          sx={{
            color: "rgba(201, 201, 201, 0.75)",
            cursor: "default",
            transform: "translateY(-0.35rem)",
          }}
        >
          {formattedCreatedAt}
        </Text>
      </Flex>
      <Flex mt={-6} mb={4} maw={375} w={"100%"}>
        <Text
          sx={{
            color: "#c9c9c9",
            cursor: "default",
            wordBreak: "break-word",
            transform: "translateX(0.25rem)",
          }}
        >
          {text}
        </Text>
      </Flex>
      {isUser && (
        <Group grow spacing={0} w={"100%"} mt={"-.5rem"} position="center">
          <Button
            fullWidth
            size={"xs"}
            title="Edit comment"
            variant={"default"}
            // variant={"light"}
            color="blue"
            sx={{
              borderTopRightRadius: "0rem",
              borderBottomRightRadius: "0rem",
              borderBottomLeftRadius: "0.25rem",
              borderTopLeftRadius: "0.25rem",
              "&:hover": {
                backgroundColor: "rgba(25, 113, 194, 0.2) !important",
              },
            }}
            leftIcon={<AiFillEdit />}
            onClick={() => {
              setCommentEditing(true);
              setIsEditType(true);
              setOriginalComment(text);
              setEditCommentCreatedAt(createdAt);
              setTimeout(() => {
                setComment(text);
              }, 0);
            }}
          >
            Edit
          </Button>
          <Button
            fullWidth
            title="Delete comment"
            size={"xs"}
            variant={"default"}
            // variant={"light"}
            color="red"
            sx={{
              borderTopRightRadius: "0.25rem",
              borderBottomRightRadius: "0.25rem",
              borderBottomLeftRadius: "0rem",
              borderTopLeftRadius: "0rem",
              "&:hover": {
                backgroundColor: "#4b272b !important",
              },
            }}
            leftIcon={<AiFillDelete />}
            onClick={async () => {
              setIsDeleteLoading(true);
              const originalPost = post;
              try {
                setPost({
                  ...post,
                  comments: post?.comments?.filter(
                    (comment) => comment.createdAt !== createdAt
                  ),
                });
                await axios.delete("/api/protected/delete-comment", {
                  data: {
                    postID: post?._id,
                    key: createdAt,
                    name: username,
                  },
                });
                setIsDeleteLoading(false);
              } catch {
                setIsDeleteLoading(false);
                setPost({
                  ...originalPost,
                });
              }
            }}
          >
            Delete
          </Button>
        </Group>
      )}
    </Stack>
  );
};

function Post({
  post,
  setPost,
  currentlyPlaying,
  setCurrentlyPlaying,
  isUser = false,
  isPostModal = false,
  isSelect = false,
  originalCaption,
  setOriginalCaption,
  editingCaption,
  setEditingCaption,
  timeAgo,
  isRightbar = false,
  setParentCaption = () => {},
  setParentEditingCaption = () => {},
  isCommentLoading,
  setIsCommentLoading,
  isDeleteLoading,
  setIsDeleteLoading,
  following,
  setFollowing,
}) {
  const theme = useMantineTheme();
  const [caption, setCaption] = useState(post?.caption || "");
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [imageHovered, setImageHovered] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const { data: session } = useSession();
  const audioRef = useRef(null);
  const captionRef = useRef(null);
  const commentRef = useRef(null);
  const isCurrent = currentlyPlaying === post?._id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const numComments = post?.comments?.length || 0;
  const numLikes = post?.likes?.length || 0;
  const [commentEditing, setCommentEditing] = useState(false);
  const [isEditType, setIsEditType] = useState(false);
  const emojis = ["🔥", "❤️", "👍", "😂", "😍", "🤩", "😭", "🤔"];
  const [addedEmoji, setAddedEmoji] = useState(false);
  const [originalComment, setOriginalComment] = useState("");
  const [editCommentCreatedAt, setEditCommentCreatedAt] = useState("");
  const [commentOpen, { open: openComment, close: closeComment }] =
    useDisclosure(false);
  const isFollowing = following?.includes(post?.username);
  const isLiked = !!post?.likes?.find(
    (like) => like.username === session?.user?.name
  );

  const likePost = async () => {
    setIsLikeLoading(true);
    const now = new Date().toISOString();
    const oldLikes = post?.likes || [];
    if (isLiked) {
      setPost({
        ...post,
        likes: oldLikes.filter((like) => like.username !== session?.user?.name),
      });
    } else {
      setPost({
        ...post,
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
      setIsLikeLoading(false);
    } catch {
      setIsLikeLoading(false);
      setPost({
        ...post,
        likes: [...oldLikes],
      });
    }
  };

  const getScrollHeight = () => {
    if (commentEditing) {
      return "150px";
    }
    if (editingCaption) {
      return "125px";
    }
    if (!isPostModal) {
      return "175px";
    }
    if (isUser) {
      return "175px";
    }
    if (post?.caption) {
      return "135px";
    }
  };

  const getModalBottomPad = () => {
    if (isPostModal) {
      if (isUser) {
        return "0rem";
      }
      if (post?.caption) {
        return "3.5rem";
      }
    }
    return "0rem";
  };

  useEffect(() => {
    audioRef.current.addEventListener("play", () => {
      setCurrentlyPlaying(post?._id);
      setIsPlaying(true);
    });
    audioRef.current.addEventListener("pause", () => {
      if (audioRef?.current?.currentTime) {
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    });
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

  useEffect(() => {
    if (editingCaption && caption.length !== 0) {
      captionRef.current.focus();
    }
  }, [editingCaption]);

  useEffect(() => {
    if (commentRef?.current) {
      commentRef.current.focus();
    }
  }, [commentEditing]);

  return (
    <>
      <PostModal
        post={post}
        setPost={setPost}
        opened={commentOpen}
        close={closeComment}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        session={session}
        isUser={isUser}
        originalCaption={originalCaption}
        setOriginalCaption={setOriginalCaption}
        setEditingCaption={setEditingCaption}
        timeAgo={timeAgo}
        setCaption={setCaption}
        isSelect={isSelect}
        isRightbar={isRightbar}
        isCaptionLoading={isCaptionLoading}
        isCommentLoading={isCommentLoading}
        isDeleteLoading={isDeleteLoading}
        following={following}
        setFollowing={setFollowing}
      />

      <Flex
        bg="lightGray"
        justify={"center"}
        align={"center"}
        direction={"column"}
        px={"1.5rem"}
        pt={isUser && "0.75rem"}
        sx={{
          borderRadius: "0.5rem !important",
          overflowY: "hidden !important",
        }}
        maw={425}
        mah={"100%"}
        pb={getModalBottomPad()}
      >
        {!isUser && (
          <Flex
            w={isPostModal ? "100%" : "275px"}
            justify={"space-between"}
            mt="-0.5rem"
            pb="0.25rem"
            mb={"0.75rem"}
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.lightWhite[7]}`,
            })}
          >
            <Link href={`/profile/${post?.username}`} passHref>
              <Button
                ml={isPostModal ? "-.5rem" : "-.3rem"}
                title={`${post?.username}'s profile`}
                compact
                size={isPostModal ? "md" : "sm"}
                sx={{
                  zIndex: 1,
                  fontSize: isPostModal ? "0.85rem" : "0.75rem",
                  color: "rgba(255, 255, 255, 0.75)",
                  backgroundColor: "transparent !important",
                  cursor: "pointer",
                }}
                component="a"
                leftIcon={
                  <Avatar
                    size={isPostModal ? 24 : 20}
                    src={post?.userImage}
                    alt={`${post?.username}'s profile`}
                    radius={"xl"}
                    style={{
                      border: "1px solid #c0c1c4",
                    }}
                  />
                }
              >
                {truncateText(post?.username, isPostModal ? 32 : 22)}
              </Button>
            </Link>
            <Flex justify={"center"} align="center">
              <Tooltip
                label={
                  isFollowing
                    ? `Unfollow ${post?.username}`
                    : `Follow ${post?.username}`
                }
                position="bottom-end"
              >
                <ActionIcon
                  sx={{
                    color: isFollowing ? "rgba(29, 185, 84, .75)" : "#c1c2c5",
                    "&[data-disabled]": {
                      color: "rgba(29, 185, 84, .75) !important",
                    },
                  }}
                  variant={"transparent"}
                  radius="xl"
                  disabled={isFollowLoading}
                  onClick={async () => {
                    setIsFollowLoading(true);
                    const originalFollowing = following || [];
                    try {
                      setFollowing(
                        isFollowing
                          ? originalFollowing.filter(
                              (user) => user !== post?.username
                            )
                          : [...originalFollowing, post?.username]
                      );
                      await axios.post("/api/protected/follow", {
                        name: session?.user?.name,
                        toFollowName: post?.username,
                        type: isFollowing ? "unfollow" : "follow",
                      });
                      setIsFollowLoading(false);
                    } catch {
                      setIsFollowLoading(false);
                      setFollowing(originalFollowing);
                    }
                  }}
                >
                  {isFollowing ? (
                    <FaUserCheck fontSize="1.175rem" />
                  ) : (
                    <FaUserPlus fontSize="1.175rem" />
                  )}
                </ActionIcon>
              </Tooltip>
              <Tooltip
                label={`${numLikes} ${pluralize("like", numLikes)}`}
                position="bottom-end"
                zIndex={2}
              >
                <ActionIcon
                  variant={"transparent"}
                  radius="xl"
                  onClick={likePost}
                  disabled={isLikeLoading}
                  sx={{
                    color: isLiked ? "#f87171" : "#c1c2c5",
                    "&[data-disabled]": {
                      color: "#f87171 !important",
                    },
                  }}
                >
                  <FaHeart />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Flex>
        )}

        <Flex align="center" justify={"center"} direction={"column"}>
          {isUser &&
            (!editingCaption ? (
              <Flex w={"100%"} justify={"space-between"} align={"center"}>
                <Text
                  title="Edit caption"
                  color="white"
                  fw={"bold"}
                  fs="xs"
                  style={{
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                  mt="-.4rem"
                  mb={"0.25rem"}
                  zIndex={100}
                  onClick={() => {
                    setIsEditType(false);
                    setCommentEditing(false);
                    setComment("");
                    setEditingCaption(true);
                  }}
                >
                  {truncateText(caption, isPostModal ? 25 : 22)}
                </Text>
                {!isSelect && (
                  <Flex
                    align={"center"}
                    justify="center"
                    gap={"0.325rem"}
                    style={{
                      transform: "translateY(-.25rem) translateX(-.25rem)",
                    }}
                  >
                    <FaHeart
                      fontSize={"0.9rem"}
                      style={{
                        color: "#f87171",
                      }}
                    />
                    <Text
                      fz={"0.9rem"}
                      style={{
                        cursor: "default",
                      }}
                    >
                      {numLikes} {pluralize("like", numLikes)}
                    </Text>
                  </Flex>
                )}
              </Flex>
            ) : (
              <TextInput
                data-autoFocus
                pt={isPostModal ? 2 : 4}
                id="caption"
                maxLength={25}
                onBlur={() => {
                  if (isCaptionLoading || addedEmoji) return;

                  if (caption.length === 0 || originalCaption.length === 0) {
                    setPost({
                      ...post,
                      caption: originalCaption,
                    });
                    setCaption(originalCaption);
                    setEditingCaption(originalCaption.length === 0);
                    return;
                  } else if (caption !== originalCaption) {
                    setPost({
                      ...post,
                      caption: originalCaption,
                    });
                    setCaption(originalCaption);
                  }
                  setEditingCaption(false);
                }}
                ref={captionRef}
                w="100%"
                value={caption}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 25) return;
                  setCaption(e.target.value);
                  setPost({
                    ...post,
                    caption: e.target.value,
                  });
                }}
                placeholder="Add a caption..."
                icon={<BsPencil />}
                mb={isPostModal ? "0.75rem" : ".5rem"}
                mt={isPostModal ? "0rem" : "-.4rem"}
                rightSection={
                  <ActionIcon
                    onMouseDown={async () => {
                      const updateCaption = (captionValue, isError = false) => {
                        setPost({
                          ...post,
                          caption: captionValue,
                        });
                        setCaption(captionValue);
                        setOriginalCaption(captionValue);
                        setParentCaption(captionValue);
                        if (isError) {
                          setParentEditingCaption(!captionValue);
                          setEditingCaption(!captionValue);
                        } else {
                          setParentEditingCaption(!post?.caption);
                          setEditingCaption(!post?.caption);
                        }
                      };

                      if (isSelect) {
                        updateCaption(caption);
                      } else {
                        const ogCaption = originalCaption;
                        setIsCaptionLoading(true);
                        try {
                          updateCaption(caption);
                          await axios.post("/api/protected/caption", {
                            postID: post?._id,
                            caption,
                          });
                          setIsCaptionLoading(false);
                        } catch {
                          updateCaption(ogCaption, true);
                          setIsCaptionLoading(false);
                        }
                      }
                    }}
                    title="Add caption"
                    disabled={
                      isCaptionLoading ||
                      (caption.length === 0 && originalCaption.length === 0) ||
                      caption === originalCaption
                    }
                    loading={isCaptionLoading}
                    variant={"filled"}
                  >
                    <BsCheck />
                  </ActionIcon>
                }
                style={{
                  zIndex: 100,
                }}
              />
            ))}
          {isUser && editingCaption && (
            <EmojiPicker
              emojis={emojis}
              isPostModal={isPostModal}
              text={caption}
              setText={setCaption}
              setAddedEmoji={setAddedEmoji}
              currentRef={captionRef}
            />
          )}

          {!isUser && (
            <Text
              title={
                isPostModal
                  ? caption.length > 29
                    ? caption
                    : ""
                  : caption.length > 21
                  ? caption
                  : ""
              }
              color="white"
              fw={"bold"}
              fs="xs"
              style={{
                cursor: "default",
                alignSelf: "flex-start",
              }}
              mt="-.4rem"
              mb={"0.25rem"}
              zIndex={100}
            >
              {truncateText(caption, isPostModal ? 29 : 21)}
            </Text>
          )}

          <div
            style={{
              position: "relative",
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <Image
              src={post?.albumImage}
              alt={post?.albumName}
              radius={"0.25rem"}
              width={!isPostModal ? 275 : 375}
              height={!isPostModal ? 275 : 375}
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
                size={isPostModal ? 105 : 90}
                thickness={isPostModal ? 7.5 : 7.5}
                label={
                  <Center>
                    <ActionIcon
                      onClick={() => {
                        audioRef.current.currentTime = 0;
                        if (!isPlaying) {
                          audioRef.current.play();
                          setIsPlaying(true);
                        } else {
                          audioRef.current.pause();
                          setIsPlaying(false);
                        }
                      }}
                      title={isPlaying ? "Pause" : "Play"}
                      size={isPostModal ? "4.5rem" : "3.75rem"}
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
                          fontSize={isPostModal ? "4.5rem" : "3.75rem"}
                        />
                      ) : (
                        <BsPauseCircleFill
                          style={{
                            cursor: "pointer",
                          }}
                          fontSize={isPostModal ? "4.5rem" : "3.75rem"}
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
                href={post?.songUrl}
                target="_blank"
                radius={"xl"}
                size={isPostModal ? "2rem" : "1.6rem"}
                // size={"2rem"}
                // size={isPostModal ? "3rem" : "2rem"}
                variant={"transparent"}
                sx={{
                  cursor: "pointer !important",
                  position: "absolute",
                  top: "0.6rem",

                  right: "0.6rem",
                }}
              >
                <BsSpotify
                  fontSize={isPostModal ? "2rem" : "1.6rem"}
                  // fontSize={isPostModal ? "2.25rem" : "1.5rem"}
                  style={{
                    cursor: "pointer !important",
                    color: theme.colors.spotify[8],
                  }}
                />
              </ActionIcon>
            )}
          </div>

          <audio src={post?.previewUrl} type="audio/mpeg" ref={audioRef} />

          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            mt={8}
            mb={isSelect && "0.5rem"}
          >
            <Title
              title={
                post?.songName.length >= (isPostModal ? 32 : 15)
                  ? post?.songName
                  : null
              }
              order={3}
              color="white"
              sx={{
                cursor: "default",
              }}
            >
              {truncateText(post?.songName, isPostModal ? 30 : 15)}
            </Title>
            <Text
              title={
                post?.artists.join(", ").length >= (isPostModal ? 42 : 20)
                  ? post?.artists.join(", ")
                  : null
              }
              color="rgba(255, 255, 255, 0.8)"
              sx={{
                cursor: "default",
              }}
            >
              {truncateText(post?.artists.join(", "), isPostModal ? 42 : 20)}
            </Text>
          </Flex>
          {!isSelect && (
            <Flex
              w="100%"
              gap={"0.4rem"}
              justify={"space-between"}
              align={"start"}
              direction={"column"}
              pt="0.25rem"
              sx={{
                transform: "translateY(-0.3rem)",
                borderTop: `1px solid ${theme.colors.lightWhite[7]}`,
              }}
            >
              {isPostModal && (
                <Stack w={"100%"} spacing={8}>
                  {commentEditing ? (
                    <Textarea
                      onBlur={() => {
                        if (isEditType && comment === originalComment) {
                          setIsEditType(false);
                          setComment("");
                          setCommentEditing(false);
                          return;
                        }
                        if (comment) return;
                        setIsEditType(false);
                        setComment("");
                        setCommentEditing(false);
                      }}
                      ref={commentRef}
                      sx={{
                        zIndex: 1000,
                      }}
                      maxLength={100}
                      data-autoFocus
                      value={comment}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length > 100) return;
                        setComment(value);
                      }}
                      placeholder="Add a comment..."
                      w="100%"
                      mt={"0.5rem"}
                      icon={
                        <AiOutlineComment
                          style={{
                            position: "absolute",
                            top: ".75rem",
                            left: "0.75rem",
                          }}
                        />
                      }
                    />
                  ) : (
                    <Button
                      mt={"0.5rem"}
                      mb="1rem"
                      onClick={() => setCommentEditing(true)}
                      leftIcon={<AiOutlineComment />}
                      variant={"light"}
                      color="spotify"
                      sx={{
                        zIndex: 1000,
                      }}
                    >
                      Add a comment
                    </Button>
                  )}

                  {commentEditing && (
                    <>
                      <EmojiPicker
                        emojis={emojis}
                        isPostModal={isPostModal}
                        text={comment}
                        setText={setComment}
                        setAddedEmoji={setAddedEmoji}
                        currentRef={commentRef}
                        isComment
                      />
                      <Button
                        mb={
                          isUser
                            ? "-0.2rem"
                            : post?.caption
                            ? "-3.65rem"
                            : "0rem"
                        }
                        style={{
                          zIndex: 1000,
                        }}
                        disabled={
                          comment.length === 0 ||
                          (isEditType && comment === originalComment)
                        }
                        fullWidth
                        loading={isCommentLoading}
                        onClick={async () => {
                          setIsCommentLoading(true);
                          const originalComments = post?.comments || [];
                          try {
                            const now = new Date().toISOString();
                            if (!isEditType) {
                              const newComment = {
                                text: comment,
                                createdAt: now,
                                username: session.user.name,
                                userImage: session.user.image,
                              };
                              setPost({
                                ...post,
                                comments: [newComment, ...originalComments],
                              });
                            } else {
                              setPost({
                                ...post,
                                comments: originalComments
                                  .map((c) => {
                                    if (c.createdAt === editCommentCreatedAt)
                                      return {
                                        ...c,
                                        text: comment,
                                        createdAt: now,
                                      };
                                    return c;
                                  })
                                  .sort(
                                    (a, b) =>
                                      new Date(b.createdAt) -
                                      new Date(a.createdAt)
                                  ),
                              });
                            }
                            await axios.post("/api/protected/comment", {
                              postID: post?._id,
                              name: session?.user?.name,
                              text: comment,
                              createdAt: isEditType
                                ? editCommentCreatedAt
                                : now,
                              type: isEditType ? "edit" : "post",
                            });
                            setComment("");
                            setCommentEditing(false);
                            setIsCommentLoading(false);
                            setIsEditType(false);
                            setEditCommentCreatedAt("");
                            setIsCommentLoading(false);
                          } catch {
                            setPost({
                              ...post,
                              comments: originalComments,
                            });
                            setIsCommentLoading(false);
                          }
                        }}
                      >
                        {isCommentLoading
                          ? "Posting..."
                          : `${isEditType ? "Update" : "Post"} Comment`}
                      </Button>
                    </>
                  )}
                </Stack>
              )}
              {isPostModal ? (
                <Stack w="100%" mt={"0.5rem"} px={"0.75rem"}>
                  {post?.comments?.length === 0 && !commentEditing ? (
                    <Center
                      pb={"0.5rem"}
                      mt={commentEditing ? "-0rem" : "-1rem"}
                      mb={6}
                    >
                      <Text color="dimmed" fontSize={"0.9rem"}>
                        No comments
                      </Text>
                    </Center>
                  ) : (
                    <Stack w={"100%"}>
                      {!commentEditing && (
                        <ScrollArea
                          type={"always"}
                          offsetScrollbars
                          h={getScrollHeight()}
                          mt={commentEditing ? "0.25rem" : "-.75rem"}
                          mb={
                            isPostModal
                              ? isUser
                                ? ".525rem"
                                : "-3rem"
                              : "0.1rem"
                          }
                          px={"0.5rem"}
                        >
                          <Stack
                            align="start"
                            justify="start"
                            spacing={"md"}
                            style={{
                              zIndex: 1,
                            }}
                          >
                            {post?.comments?.map(
                              ({ text, username, userImage, createdAt }) => (
                                <CommentCard
                                  key={createdAt}
                                  text={text}
                                  username={username}
                                  userImage={userImage}
                                  createdAt={createdAt}
                                  formattedCreatedAt={timeAgo.format(
                                    new Date(createdAt)
                                  )}
                                  isUser={username === session?.user?.name}
                                  post={post}
                                  setPost={setPost}
                                  setComment={setComment}
                                  setCommentEditing={setCommentEditing}
                                  setIsEditType={setIsEditType}
                                  setOriginalComment={setOriginalComment}
                                  setEditCommentCreatedAt={
                                    setEditCommentCreatedAt
                                  }
                                  setIsDeleteLoading={setIsDeleteLoading}
                                />
                              )
                            )}
                          </Stack>
                        </ScrollArea>
                      )}
                    </Stack>
                  )}
                </Stack>
              ) : (
                <Flex
                  w="100%"
                  justify={"space-between"}
                  align={"center"}
                  mt={".3rem"}
                  mb={".2rem"}
                >
                  <UnstyledButton
                    onClick={() => {
                      setCurrentlyPlaying(null);
                      openComment();
                    }}
                    c="dimmed"
                    sx={{
                      transform: "translateX(.25rem) translateY(-.25rem)",
                    }}
                  >
                    {numComments === 0
                      ? "Add a comment..."
                      : numComments === 1
                      ? "View comment"
                      : `View all ${numComments} comments`}
                  </UnstyledButton>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default Post;
