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

  @media (prefers-color-scheme: dark) {
    /* html {
      color-scheme: dark;
    } */
    /* body {
      color: white;
      background: black;
    } */
  }

  @font-face {
  font-family: "Pretendard";
  font-weight: 400;
  src: url("/fonts/Pretendard-Medium.woff") format("truetype");
  }
`;
