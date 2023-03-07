import {
  Modal,
  Flex,
  Text,
  Stack,
  TextInput,
  Button,
  ScrollArea,
  Center,
} from "@mantine/core";
import ProfileLink from "../ProfileLink";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { FaHeart } from "react-icons/fa";

const LikeCard = ({ username, userImage }) => {
  return (
    <Flex
      align="start"
      gap={"md"}
      w="100%"
      pb={"xs"}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.lightWhite[7]}`,
      })}
    >
      <ProfileLink username={username} userImage={userImage} />
    </Flex>
  );
};

export default function LikeModal({
  post,
  setPost,
  session,
  opened,
  close,
  isUser,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const hasLiked = !!post?.likes?.find(
    (like) => like.username === session?.user?.name
  );
  const postDate = new Date(post?.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const likePost = async () => {
    setIsLoading(true);
    const oldLikes = post?.likes;
    const now = new Date().toISOString();
    if (hasLiked) {
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
        type: hasLiked ? "unlike" : "like",
        createdAt: now,
      });
      notifications.show({
        title: "Success",
        message: `Post ${hasLiked ? "unliked" : "liked"}`,
        color: "green",
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setPost({
        ...post,
        likes: [...oldLikes],
      });
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Modal.Root
      opened={opened}
      centered
      padding={"xl"}
      onClose={() => {
        if (!isLoading) {
          close();
        }
      }}
      scrollAreaComponent={Modal.NativeScrollArea}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Flex w={"100%"}>
            <Stack spacing={8} w={"100%"}>
              <Modal.Title>Likes</Modal.Title>
              <Text
                size="sm"
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {session?.user?.name}&apos;s post | {postDate}
              </Text>
            </Stack>
            <Modal.CloseButton />
          </Flex>
        </Modal.Header>
        <Modal.Body>
          <Flex w={"100%"} align={"start"} direction={"column"}>
            {!isUser && (
              <Stack w={"100%"} mb={"xl"} spacing={12}>
                <Button
                  loading={isLoading}
                  onClick={likePost}
                  leftIcon={<FaHeart />}
                >
                  <Text color="white">
                    {isLoading ? "" : hasLiked ? "Unlike" : "Like"}{" "}
                  </Text>
                </Button>
              </Stack>
            )}

            {post?.likes?.length === 0 ? (
              <Center w={"100%"}>
                <Text>No likes yet</Text>
              </Center>
            ) : (
              <ScrollArea w="100%" h={"150px"}>
                <Stack
                  align="start"
                  justify="start"
                  spacing={"md"}
                  style={{
                    zIndex: 1,
                  }}
                  w="100%"
                >
                  {post?.likes?.map(({ username, userImage }) => (
                    <LikeCard
                      key={username}
                      username={username}
                      userImage={userImage}
                    />
                  ))}
                </Stack>
              </ScrollArea>
            )}
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
