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
  Divider,
  NavLink,
} from "@mantine/core";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
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
import { useDisclosure } from "@mantine/hooks";
import PostModal from "./modals/PostModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { AiOutlineComment, AiFillDelete } from "react-icons/ai";

const CommentCard = ({
  text,
  username,
  userImage,
  createdAt,
  formattedCreatedAt,
  isUser,
  post,
  setPost,
}) => {
  return (
    <Stack
      w={"100%"}
      maw={375}
      pb={"xs"}
      p={"xs"}
      sx={{
        border: "1px solid rgba(201, 201, 201, 0.25)",
        borderRadius: "0.5rem",
        boxShadow: "0 0.5px 0px 0.5px rgba(201, 201, 201, 0.25)",

        // borderBottom: "1px solid rgba(201, 201, 201, 0.5)",
        // backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Flex
        w={"100%"}
        justify={"space-between"}
        align={"start"}
        sx={{
          borderBottom: "1px solid rgba(201, 201, 201, 0.5)",
        }}
      >
        <Flex justify={"center"} align={"start"} gap={"xs"} pb={4}>
          <Link passHref href={isUser ? "/my-profile" : `/profile/${username}`}>
            <UnstyledButton>
              <Flex
                gap={"xs"}
                title={isUser ? "Your profile" : `${username}'s profile`}
                styles={{
                  cursor: "pointer !important",
                }}
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
                  {username}
                </Title>
              </Flex>
            </UnstyledButton>
          </Link>
        </Flex>
        <Text
          sx={{
            color: "rgba(201, 201, 201, 0.75)",
            cursor: "default",
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
          }}
        >
          {text}
        </Text>
      </Flex>
      {isUser && (
        <Button
          title="Delete comment"
          w={"auto"}
          size={"xs"}
          mt={"-.6rem"}
          variant={"light"}
          color="red"
          leftIcon={<AiFillDelete />}
          onClick={async () => {
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
            } catch {
              setPost(originalPost);
            }
          }}
        >
          Delete
        </Button>
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
}) {
  const theme = useMantineTheme();
  const [caption, setCaption] = useState(post?.caption || "");
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const { data: session } = useSession();
  const audioRef = useRef(null);
  const captionRef = useRef(null);
  const commentRef = useRef(null);
  const isCurrent = currentlyPlaying === post?._id;
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentOpen, { open: openComment, close: closeComment }] =
    useDisclosure(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const isLiked = !!post?.likes?.find(
    (like) => like.username === session?.user?.name
  );
  const numComments = post?.comments?.length || 0;
  const numLikes = post?.likes?.length || 0;
  const [commentEditing, setCommentEditing] = useState(false);

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
              <ActionIcon>
                <SlUserFollow />
              </ActionIcon>
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
                    color: isLiked ? "#f87171" : "inherit",
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
                  onClick={() => setEditingCaption(true)}
                >
                  {truncateText(caption, isPostModal ? 25 : 17)}
                </Text>
                <Flex
                  align={"center"}
                  justify="center"
                  gap={"0.325rem"}
                  style={{
                    transform: "translateY(-.25rem) translateX(-.25rem)",
                  }}
                >
                  <FaHeart fontSize={"0.9rem"} />
                  <Text
                    fz={"0.9rem"}
                    style={{
                      cursor: "default",
                    }}
                  >
                    {numLikes} {pluralize("like", numLikes)}
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <TextInput
                pt={isPostModal ? 2 : 4}
                id="caption"
                maxLength={25}
                onBlur={() => {
                  if (isCaptionLoading) return;

                  if (caption.length === 0 || originalCaption.length === 0) {
                    setPost({
                      ...post,
                      caption: originalCaption,
                    });
                    setCaption(originalCaption);
                    setEditingCaption(false);
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
                          await axios.post("/api/protected/caption", {
                            postID: post?._id,
                            caption,
                          });
                          updateCaption(caption);
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
          {!isUser && (
            <Text
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
              {caption}
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
                        // if (!isCurrent) {
                        //   audioRef.current.pause();
                        //   audioRef.current.currentTime = 0;
                        // }
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
                        if (comment) return;
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
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      w="100%"
                      mt={"0.75rem"}
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
                      mt={"0.75rem"}
                      mb="1rem"
                      onClick={() => setCommentEditing(true)}
                      leftIcon={<AiOutlineComment />}
                      variant={"subtle"}
                      color="spotify"
                      sx={{
                        zIndex: 1000,
                      }}
                    >
                      Add a comment
                    </Button>
                  )}

                  {commentEditing && (
                    <Button
                      mb={"-0.2rem"}
                      style={{
                        zIndex: 1000,
                      }}
                      disabled={comment.length === 0}
                      fullWidth
                      loading={isCommentLoading}
                      onClick={async () => {
                        setIsCommentLoading(true);
                        const originalComments = post?.comments || [];
                        try {
                          const now = new Date().toISOString();
                          setPost({
                            ...post,
                            likes: post?.likes || [],
                            comments: [
                              ...(post?.comments || []),
                              {
                                text: comment,
                                createdAt: now,
                                username: session.user.name,
                                userImage: session.user.image,
                              },
                            ].sort((a, b) => {
                              return (
                                new Date(b.createdAt) - new Date(a.createdAt)
                              );
                            }),
                          });
                          await axios.post("/api/protected/comment", {
                            postID: post?._id,
                            name: session?.user?.name,
                            text: comment,
                            createdAt: now,
                          });
                          setComment("");
                          setCommentEditing(false);
                          setIsCommentLoading(false);
                        } catch {
                          setPost({
                            ...post,
                            likes: post?.likes || [],
                            comments: originalComments,
                          });
                          setIsCommentLoading(false);
                        }
                      }}
                    >
                      {isCommentLoading ? "Posting..." : "Post Comment"}
                    </Button>
                  )}
                </Stack>
              )}
              {isPostModal ? (
                <Stack w="100%" mt={"0.5rem"} px={"0.75rem"}>
                  {numComments === 0 && !comment ? (
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
                          h={commentEditing ? "150px" : "145px"}
                          type={"always"}
                          offsetScrollbars
                          // type={"hover"}
                          // type={"never"}
                          mt={commentEditing ? "0.25rem" : "-1rem"}
                          mb={numComments === 1 ? "-1.75rem" : "0.1rem"}
                          px={"0.75rem"}
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
                                  key={username}
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
                  mt={".25rem"}
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
