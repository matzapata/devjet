import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "gray.900")(props),
    },
    html: {
      bg: mode("white", "gray.900")(props),
    },
  }),
};

const theme = extendTheme(
  {
    styles,
  },
  withProse()
);

export default theme;
