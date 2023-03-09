import {
  Modal,
  Select,
  Button,
  Center,
  Group,
  Avatar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { BsMusicNoteBeamed } from "react-icons/bs";
import Post from "../Post";
import { forwardRef, useState, useEffect } from "react";
import axios from "axios";

const SelectItem = forwardRef(
  ({ songName, albumImage, albumName, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={albumImage} />
        <div>
          <Text size="sm">{songName}</Text>
          <Text size="xs" opacity={0.65}>
            {albumName}
          </Text>
        </div>
      </Group>
    </div>
  )
);
SelectItem.displayName = "SelectItem";

export default function SelectSongModal({
  selectRef,
  opened,
  close,
  spotifyData,
  currentlyPlaying,
  setCurrentlyPlaying,
  session,
  setPost,
  originalCaption,
  setOriginalCaption,
  editingCaption,
  setEditingCaption,
}) {
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [selectedSongData, setSelectedSongData] = useState();

  useEffect(() => {
    if (opened) {
      setSelectedSong(spotifyData[0]?.songName || "");
      setSelectedSongData(spotifyData[0]);
    }
  }, [opened, spotifyData]);

  const postSong = async () => {
    setIsLoading(true);
    try {
      const {
        data: { _id },
      } = await axios.post("/api/protected/post", {
        ...selectedSongData,
        name: session.user.name,
      });
      setPost({
        ...selectedSongData,
        _id,
        username: session.user.name,
        userImage: session.user.image,
        caption: selectedSongData?.caption,
      });
      setOriginalCaption(selectedSongData?.caption || "");
      setEditingCaption(originalCaption.length === 0);
      setIsLoading(false);
      close();
    } catch {
      setIsLoading(false);
      setPost(null);
    }
  };

  return (
    <Modal
      keepMounted
      closeOnEscape={false}
      closeOnOutsideClick={false}
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      title="Choose a song"
      centered
      padding={"xl"}
      overlayProps={{
        blur: 3,
        opacity: 0.55,
      }}
    >
      <Select
        radius={"0.25rem"}
        ref={selectRef}
        defaultValue={selectedSong}
        withinPortal
        dropdownPosition="bottom"
        placeholder="Pick one"
        itemComponent={SelectItem}
        data={
          spotifyData?.map((data) => ({
            ...data,
            value: data.songName,
            label: data.songName,
          })) || []
        }
        searchable
        clearable
        allowDeselect
        maxDropdownHeight={350}
        nothingFound="No songs found"
        filter={(value, item) =>
          item.songName.toLowerCase().includes(value?.toLowerCase()?.trim()) ||
          item.albumName.toLowerCase().includes(value?.toLowerCase()?.trim())
        }
        value={selectedSong}
        onChange={(value) => {
          setSelectedSong(null);
          setTimeout(() => {
            setSelectedSong(value);
          }, 0);
          setSelectedSongData(
            spotifyData.find((data) => data.songName === value)
          );
        }}
        icon={<BsMusicNoteBeamed />}
        styles={{
          item: {
            "&[data-selected]": {
              backgroundColor: theme.colors.spotify[8],
              "&:hover": {
                backgroundColor: theme.colors.spotify[7],
              },
            },
          },
          input: {
            "&:focus": {
              borderColor: theme.colors.spotify[8],
            },
          },
        }}
      />

      {selectedSong && (
        <Center mt={16} mb={18}>
          <Post
            isUser={true}
            isSelect={true}
            post={selectedSongData}
            setPost={setSelectedSongData}
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
            originalCaption={originalCaption}
            setOriginalCaption={setOriginalCaption}
            editingCaption={editingCaption}
            setEditingCaption={setEditingCaption}
          />
        </Center>
      )}

      <Button
        onClick={postSong}
        fullWidth
        disabled={!selectedSong}
        mt={12}
        loading={isLoading}
      >
        Post this song!
      </Button>
    </Modal>
  );
}
