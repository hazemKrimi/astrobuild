import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		line-height: 1.5;
		outline: none;
  }
`;

export default GlobalStyles;
