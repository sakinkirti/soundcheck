import { Flex, Button, Title } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { BsSpotify } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"column"}
      mih={"100vh"}
      gap={20}
      bg={"lightGray"}
    >
      <Title size="2.5rem" order={1} color={"white"}>
        Soundcheck!
      </Title>
      <Button
        onClick={() => {
          setIsLoading(true);
          signIn("spotify", {
            callbackUrl: "/home",
          });
        }}
        size="md"
        leftIcon={<BsSpotify />}
        loading={isLoading}
      >
        Continue with Spotify
      </Button>
    </Flex>
  );
}

export default Index;
