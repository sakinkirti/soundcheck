import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import { useSession } from "next-auth/react";

function ProfileLink({ username, userImage }) {
  const { data: session } = useSession();

  return (
    <Link
      href={
        session?.user?.name === username
          ? "/my-profile"
          : `/profile/${username}`
      }
      passHref
    >
      <Button
        title={`${username}'s profile`}
        compact
        size="sm"
        sx={(theme) => ({
          zIndex: -1,
          fontSize: "0.75rem",
          color: theme.colors.lightGray[7],
          backgroundColor: theme.colors.lightGray[0],
          "&:hover": {
            backgroundColor: theme.colors.lightGray[0],
          },
        })}
        component="a"
        leftIcon={
          <Avatar
            size={18}
            src={userImage}
            alt={`${username}'s profile`}
            radius={"xl"}
            style={{
              border: "1px solid #c0c1c4",
            }}
          />
        }
      >
        {truncateText(username, 12)}
      </Button>
    </Link>
  );
}

export default ProfileLink;
