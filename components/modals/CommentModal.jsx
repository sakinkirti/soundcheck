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
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import { notifications } from "@mantine/notifications";

const CommentCard = ({ text, username, userImage }) => {
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
      <Flex w="100%" align="start" justify="start" wrap={"wrap"}>
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
};

export default function CommentModal({
  post,
  setPost,
  session,
  opened,
  close,
  isUser,
}) {
  const [userComment, setUserComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasCommented = !!post?.comments?.find(
    (comment) => comment.username === session?.user?.name
  );
  const postDate = new Date(post?.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const postComment = async () => {
    setIsLoading(true);
    const oldComments = post?.comments;
    const now = new Date().toISOString();
    setPost({
      ...post,
      comments: [
        ...oldComments,
        {
          text: userComment,
          username: session?.user?.name,
          userImage: session?.user?.image,
          createdAt: now,
        },
      ],
    });
    try {
      await axios.post("/api/protected/comment", {
        postID: post?._id,
        name: session?.user?.name,
        text: userComment,
        createdAt: now,
      });
      notifications.show({
        title: "Success",
        message: "Comment posted",
        color: "green",
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setPost({
        ...post,
        comments: [...oldComments],
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
          setUserComment("");
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
              <Modal.Title>Comments</Modal.Title>
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
            {!isUser && !hasCommented && (
              <Stack w={"100%"} mb={"xl"} spacing={12}>
                <TextInput
                  data-autoFocus
                  w={"100%"}
                  placeholder="Your comment"
                  value={userComment}
                  onChange={(e) => setUserComment(e.currentTarget.value)}
                  icon={<AiOutlineComment />}
                />
                <Button
                  loading={isLoading}
                  disabled={userComment.length === 0}
                  onClick={postComment}
                >
                  <Text color="white">Post Comment</Text>
                </Button>
              </Stack>
            )}

            {post?.comments?.length === 0 ? (
              <Center w={"100%"}>
                <Text>No comments yet</Text>
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
                  {post?.comments?.map(({ text, username, userImage }) => (
                    <CommentCard
                      key={username}
                      text={text}
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
