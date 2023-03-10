import { Flex } from "@mantine/core";
import { Image } from '@mantine/core';
import { useSession, getSession } from "next-auth/react";

function MyProfile() {
  const { data: session } = useSession();
  console.log(typeof session?.user?.image);
  var img_link = "" + session?.user?.image;
  session?.user?.image
  console.log(session);
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"row"}
      wrap={"wrap"}
      h={"calc(100vh - 5rem)"}
      style={{
        transform: "translateY(5rem)",
      }}
    >
      <Flex>
        {JSON.stringify(session?.user?.name)}
      </Flex>
      <Flex>
       <Image width={240} height={240} mx = "auto" radius="md" src={img_link} fit="contain" alt="Random image" />
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
}

export default MyProfile;
