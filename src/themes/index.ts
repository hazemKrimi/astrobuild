import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    black: {
      main: '#000000',
      light: '',
    },
    white: {
      main: '#FFFFFF',
      light: '',
    },
    success: {
      main: '',
      light: '',
    },
    error: {
      main: '',
      light: '',
    },
    warning: {
      main: '',
      light: '',
    },
    client: {
      main: '#5F6CAD',
      light: `linear-gradient(
        rgba(255, 255, 255, .75),
        rgba(255, 255, 255, .75)
      ),
      linear-gradient(
        #5F6CAD,
        #5F6CAD
      )`,
    },
    productOwner: {
      main: '#20063B',
      light: `linear-gradient(
        rgba(255, 255, 255, .75),
        rgba(255, 255, 255, .75)
      ),
      linear-gradient(
        #20063B,
        #20063B
      )`,
    },
    developer: {
      main: '#ED7D3A',
      light: `linear-gradient(
        rgba(255, 255, 255, .75),
        rgba(255, 255, 255, .75)
      ),
      linear-gradient(
        #ED7D3A,
        #ED7D3A
      )`,
    },
    admin: {
      main: '#A30015',
      light: `linear-gradient(
        rgba(255, 255, 255, .75),
        rgba(255, 255, 255, .75)
      ),
      linear-gradient(
        #A30015,
        #A30015
      )`,
    },
  },
};
