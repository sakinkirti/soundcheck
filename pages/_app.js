import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { Notifications } from "@mantine/notifications";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const emptyColors = (num) => Array(num).fill("");
  return (
    <>
      <Head>
        <title>Soundcheck!</title>
        <meta
          name="description"
          content="a social media platform that allows users to post daily updates of what they are listening to"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            colors: {
              spotify: [
                ...emptyColors(7),
                "rgba(29, 185, 84, 0.9)",
                "rgba(29, 185, 84, 1)",
              ],
              lightWhite: [
                ...emptyColors(6),
                "#a8a9ad",
                "rgba(192, 193, 196, 0.75)",
                "#c0c1c4",
              ],
              lightGray: ["#3C3F42", ...emptyColors(7), "#25262b"],
              heartRed: [...emptyColors(8), "#f87171"],
            },
            primaryColor: "spotify",
            components: {
              Button: {
                styles: (theme) => ({
                  root: {
                    color: "white",
                    backgroundColor: theme.colors.spotify[6],
                    "&:hover": {
                      backgroundColor: theme.colors.spotify[7],
                    },
                  },
                }),
              },
            },
          }}
        >
          <Notifications />
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

function Auth({ children }) {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  return status === "authenticated" ? <Navbar>{children}</Navbar> : children;
}
