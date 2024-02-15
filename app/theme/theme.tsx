"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const MuiTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
  const muitheme = createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });
  return <ThemeProvider theme={muitheme}>{children}</ThemeProvider>;
};

export default MuiTheme;
