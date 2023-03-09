import { Modal, SegmentedControl, Stack, Text } from "@mantine/core";
import { MdOutlineDateRange } from "react-icons/md";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useDidUpdate } from "@mantine/hooks";
import { pluralize } from "@/utils/pluralize";

export default function FilterModal({
  opened,
  close,
  feedFilter,
  setFeedFilter,
  todayPosts,
  feedPosts,
  setFeedPosts,
}) {
  useDidUpdate(() => {
    if (!feedPosts) {
      // notifications.show({
      //   message: `No posts found for or ${
      //     feedFilter.type
      //   } on ${feedFilter.date.toLocaleString("en-US", {
      //     month: "long",
      //     day: "numeric",
      //     year: "numeric",
      //   })}`,
      //   color: "blue",
      // });
    } else {
      // notifications.show({
      //   message: `Showing ${feedPosts.length} ${pluralize(
      //     "post",
      //     feedPosts.length
      //   )} for ${feedFilter.type} on ${feedFilter.date.toLocaleString("en-US", {
      //     month: "long",
      //     day: "numeric",
      //     year: "numeric",
      //   })}`,
      //   color: "blue",
      // });
    }
  }, [feedFilter, feedPosts]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`${feedFilter.type} on ${feedFilter.date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`}
      returnFocus={false}
      centered
      size="sm"
      padding={"xl"}
      overlayProps={{
        blur: 3,
        opacity: 0.55,
      }}
    >
      <Stack w={"100%"} align={"center"} justify={"center"} spacing={"lg"}>
        {/* <Text mt={"-0.25rem"} mb={"-0.5rem"}>
          {feedFilter.type} on{" "}
          {feedFilter.date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Text> */}
        <DatePickerInput
          w={"100%"}
          icon={<MdOutlineDateRange />}
          dropdownType="modal"
          label="Pick date"
          placeholder="Pick date"
          value={feedFilter.date}
          onChange={(date) => {
            setFeedFilter({
              ...feedFilter,
              date: date,
            });
            const isToday = date.toDateString() === new Date().toDateString();
            if (isToday) {
              setFeedPosts(todayPosts);
            } else {
              setFeedPosts(null);
            }
          }}
          mx="auto"
          maw={400}
          minDate={new Date("2023-03-08")}
          maxDate={new Date("2023-03-09")}
          // maxDate={new Date()}
        />
        <SegmentedControl
          data={[
            { label: "Everyone", value: "Everyone" },
            { label: "Following", value: "Following" },
          ]}
          value={feedFilter.type}
          onChange={(value) => {
            setFeedFilter({
              ...feedFilter,
              type: value,
            });
          }}
        />
      </Stack>
    </Modal>
  );
}
