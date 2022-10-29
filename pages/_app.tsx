import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#19071E",
      },
    },
  },

  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    primary: "#7928CA",
    secondary: {
      50: "#f5edfa",
      100: "#dacce5",
      200: "#c0abd2",
      300: "#a88ac0",
      400: "#8f68ae",
      500: "#754e94",
      600: "#5b3d73",
      700: "#412c53",
      800: "#271a33",
      900: "#0f0815",
    },
    green: {
      50: "#e7f9e7",
      100: "#c9e7c9",
      200: "#a8d6a8",
      300: "#87c486",
      400: "#66b365",
      500: "#4d9a4c",
      600: "#3b783a",
      700: "#295528",
      800: "#163416",
      900: "#011300",
    },
    red: {
      50: "#ffeaea",
      100: "#edc7c7",
      200: "#dca4a4",
      300: "#cc7f7f",
      400: "#bd5c5b",
      500: "#a34241",
      600: "#803333",
      700: "#5c2324",
      800: "#391415",
      900: "#1a0303",
    },

    purple: {
      100: "#7928CA",
    },
    pink: {
      50: "#ffe7fc",
      100: "#f5bfea",
      200: "#ea95d9",
      300: "#e06cc8",
      400: "#d643b8",
      500: "#bc2a9e",
      600: "#931f7c",
      700: "#6a1558",
      800: "#410a36",
      900: "#1a0116",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
