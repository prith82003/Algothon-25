import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Global } from "@mantine/core";
import "../styles/index.css";
import { Atkinson_Hyperlegible } from "next/font/google";

const font = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Algothon by SIG & UNSW Fintech </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" type="image/svg+xml" href="/logo.svg"></link>
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          colors: {
            fintechRed: [
              "#DAA0A0",
              "#DA7E7F",
              "#E15859",
              "#F02C2E",
              "#D82829",
              "#B33334",
              "#953A3A",
              "#7E3C3D",
              "#6C3C3D",
              "#5D3A3B",
            ],
            spaceNavy: [
              "#3C4656",
              "#343F51",
              "#2C394D",
              "#24334A",
              "#1C2D48",
              "#152846",
              "#17253B",
              "#182232",
              "#181F2A",
              "#171C24",
            ],
          },
          primaryColor: "fintechRed",
          primaryShade: 3,
          ...font.style,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
