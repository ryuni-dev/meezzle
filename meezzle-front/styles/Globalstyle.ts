import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }


  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'bitbit';
    src: url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff'), url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2');
  }

  @media (prefers-color-scheme: dark) {
    /* html {
      color-scheme: dark;
    } */
    /* body {
      color: white;
      background: black;
    } */
  }
`;
