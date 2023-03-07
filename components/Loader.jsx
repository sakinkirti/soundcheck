import { Flex, Loader as MantineLoader } from "@mantine/core";

export default function Loader() {
  return (
    <Flex mih={"100vh"} align="center" justify="center" direction="column">
      <MantineLoader size="xl" />
    </Flex>
  );
}
