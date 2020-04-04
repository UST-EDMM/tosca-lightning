import { createMuiTheme } from '@material-ui/core';
import { indigo, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: teal['400'],
    },
  },
});

export default theme;
