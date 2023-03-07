import { Modal, Flex, Text, Stack, ScrollArea, Center } from "@mantine/core";
import ProfileLink from "../ProfileLink";
import { truncateText } from "@/utils/truncateText";

const LikeCard = ({ username, userImage }) => {
  return <ProfileLink username={username} userImage={userImage} />;
};

export default function LikeModal({ post, isLoading, opened, close }) {
  const postDate = new Date(post?.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Modal.Root
      returnFocus={false}
      opened={opened}
      centered
      size={"xs"}
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
                {truncateText(post?.username, 16)}&apos;s post | {postDate}
              </Text>
            </Stack>
            <Modal.CloseButton />
          </Flex>
        </Modal.Header>
        <Modal.Body>
          <Flex w={"100%"} align={"start"} direction={"column"} mt={12}>
            {!post?.likes?.length ? (
              <Center w={"100%"}>
                <Text>No likes yet</Text>
              </Center>
            ) : (
              <ScrollArea w="100%" h={"150px"}>
                <Flex
                  align="center"
                  justify="center"
                  wrap="wrap"
                  rowGap={"md"}
                  columnGap={9}
                  w="100%"
                  style={{
                    zIndex: 1,
                  }}
                >
                  {post?.likes.map(({ username, userImage }) => (
                    <LikeCard
                      key={username}
                      username={username}
                      userImage={userImage}
                    />
                  ))}
                </Flex>
              </ScrollArea>
            )}
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
