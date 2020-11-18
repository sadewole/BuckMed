import { colors, createMuiTheme } from '@material-ui/core';

let theme = createMuiTheme({
  palette: {
    action: {
      active: '#007bff',
    },
    background: {
      default: colors.common.white,
      dark: '#f4f6f8',
      paper: colors.common.white,
    },
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    text: {
      primary: '#000',
      secondary: '#6c757d',
    },
  },
});

export default theme;
