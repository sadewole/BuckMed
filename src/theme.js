import _ from 'lodash';
import { colors, createMuiTheme } from '@material-ui/core';

const baseOptions = {
  direction: 'ltr',
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
};

const themeOption = [
  {
    name: 'LIGHT',
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600],
          },
        },
      },
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600],
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
        primary: '#007bff',
        secondary: '#6c757d',
      },
    },
  },
];

let theme = createMuiTheme(_.merge({}, baseOptions, themeOption));

export default theme;
