import { createMuiTheme } from '@material-ui/core';
import { indigo, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal['400']
    },
    secondary: indigo,
  },
});

export default theme;
