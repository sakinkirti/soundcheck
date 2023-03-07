import {
  Title,
  Flex,
  Avatar,
  Menu,
  Group,
  Text,
  UnstyledButton,
  Navbar as MantineNavbar,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { BsChevronDown } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

function Navbar({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuHover, setMenuHover] = useState(false);

  return (
    <>
      <MantineNavbar
        width="100%"
        height={"5rem"}
        bg={"lightGray"}
        style={{
          position: "fixed",
          top: "0%",
          zIndex: 100,
        }}
      >
        <Flex
          w="100%"
          h="100%"
          justify={"space-between"}
          align={"center"}
          px={16}
        >
          <Title
            color="white"
            onClick={() => router.push("/home")}
            style={{
              cursor: "pointer",
              transform: "translateY(-0.25rem)",
              userSelect: "none",
            }}
          >
            Soundcheck!
          </Title>

          <Menu
            trigger="hover"
            openDelay={100}
            closeDelay={400}
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            withinPortal
            onOpen={() => setMenuHover(true)}
            onClose={() => setMenuHover(false)}
          >
            <Menu.Target>
              <UnstyledButton
                sx={(theme) => ({
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: menuHover
                    ? theme.colors.lightGray[0]
                    : "transparent",
                  "&:hover": {
                    backgroundColor: theme.colors.lightGray[0],
                  },
                })}
              >
                <Group spacing={8}>
                  <Avatar
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    radius="xl"
                    size={27}
                    sx={(theme) => ({
                      border: `1.25px solid ${theme.colors.lightWhite[8]}`,
                    })}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {session?.user?.name}
                  </Text>
                  <BsChevronDown size={"1rem"} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => router.push("/my-profile")}
                icon={<CgProfile size={"0.9rem"} stroke={1.5} />}
              >
                Profile
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                onClick={() => signOut()}
                icon={<FaSignOutAlt size={"0.9rem"} stroke={1.5} />}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </MantineNavbar>
      {children}
    </>
  );
}

export default Navbar;
