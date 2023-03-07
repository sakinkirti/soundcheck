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
import { forwardRef, useState } from "react";
import { notifications } from "@mantine/notifications";
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
  setStreak,
  session,
  setPost,
}) {
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [selectedSongData, setSelectedSongData] = useState();

  const postSong = async () => {
    setIsLoading(true);
    setPost({
      ...selectedSongData,
      username: session.user.name,
      userImage: session.user.image,
    });
    setStreak((prev) => prev + 1);
    try {
      await axios.post("/api/protected/post", {
        ...selectedSongData,
        name: session.user.name,
      });
      notifications.show({
        title: "Success",
        message: "Your song was posted",
        color: "green",
      });
      setIsLoading(false);
      close();
    } catch {
      setPost(null);
      setStreak((prev) => prev - 1);
      setIsLoading(false);
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        if (!isLoading) {
          selectRef?.current?.blur();
          close();
          setSelectedSong(null);
        }
      }}
      title="Choose a song"
      centered
      padding={"xl"}
    >
      <Select
        radius={"0.25rem"}
        ref={selectRef}
        defaultValue={selectedSong}
        withinPortal
        dropdownPosition="bottom"
        placeholder="Pick one"
        itemComponent={SelectItem}
        data={spotifyData?.map((data) => ({
          ...data,
          value: data.songName,
          label: data.songName,
        }))}
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
            withHeader={false}
            post={selectedSongData}
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
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