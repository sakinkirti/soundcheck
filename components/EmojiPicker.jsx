import { Flex, ActionIcon } from "@mantine/core";

export default function EmojiPicker({
  emojis,
  isPostModal,
  text,
  setText,
  setAddedEmoji,
  isComment,
  currentRef,
}) {
  return (
    <Flex
      w={"100%"}
      align={"center"}
      justify={"center"}
      mt={!isPostModal ? "-.1rem" : isComment ? ".2rem" : "-.25rem"}
      mb={!isPostModal ? ".5rem" : isComment ? ".2rem" : ".5rem"}
    >
      {emojis.map((emoji, i) => (
        <ActionIcon
          key={i}
          onMouseDown={() => {
            if (setAddedEmoji) {
              setAddedEmoji(true);
            }
            const newText = text.length === 0 ? `${emoji}` : `${text} ${emoji}`;
            setText(newText);
          }}
          onClick={() => {
            if (currentRef) {
              currentRef.current.focus();
            }
            setAddedEmoji(false);
          }}
        >
          {emoji}
        </ActionIcon>
      ))}
    </Flex>
  );
}
