import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: {
        main: string;
        light: string;
      };
      white: {
        main: string;
        light: string;
      };
      success: {
        main: string;
        light: string;
      };
      error: {
        main: string;
        light: string;
      };
      warning: {
        main: string;
        light: string;
      };
      client: {
        main: string;
        light: string;
        dark: string;
      };
      productOwner: {
        main: string;
        light: string;
        dark: string;
      };
      developer: {
        main: string;
        light: string;
        dark: string;
      };
      admin: {
        main: string;
        light: string;
        dark: string;
      };
    };
  }
}
