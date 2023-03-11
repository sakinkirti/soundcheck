import { Modal } from "@mantine/core";
import Post from "../Post";
import { useState } from "react";
import { useDidUpdate } from "@mantine/hooks";

export default function PostModal({
  post,
  setPost,
  opened,
  close,
  currentlyPlaying,
  setCurrentlyPlaying,
  isUser = false,
  originalCaption,
  setOriginalCaption,
  timeAgo,
  setEditingCaption,
  setCaption,
  isSelect,
  isRightbar,
  isCaptionLoading,
  following,
  setFollowing,
}) {
  const [currEditing, setCurrEditing] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useDidUpdate(() => {
    if (!isSelect && isRightbar) {
      if (opened) {
        if (!post?.caption) {
          setCurrEditing(true);
        }
      }
    }
  }, [opened]);

  return (
    <Modal
      size="auto"
      overlayProps={{
        blur: 3,
        opacity: 0.55,
      }}
      opened={opened}
      // centered
      onClose={() => {
        if (isCaptionLoading || isCommentLoading || isDeleteLoading) return;
        close();
      }}
      withCloseButton={false}
      padding={0}
      trapFocus={false}
    >
      <Post
        post={post}
        setPost={setPost}
        currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        isPostModal
        isUser={isUser}
        originalCaption={originalCaption}
        setOriginalCaption={setOriginalCaption}
        editingCaption={currEditing}
        setEditingCaption={setCurrEditing}
        timeAgo={timeAgo}
        setParentCaption={setCaption}
        setParentEditingCaption={setEditingCaption}
        isRightbar={false}
        isDeleteLoading={isDeleteLoading}
        setIsDeleteLoading={setIsDeleteLoading}
        isCommentLoading={isCommentLoading}
        setIsCommentLoading={setIsCommentLoading}
        following={following}
        setFollowing={setFollowing}
      />
    </Modal>
  );
}