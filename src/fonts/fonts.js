import {createGlobalStyle} from "styled-components";
import MADE from "./MADE-Tommy-Soft-Black-PERSONAL-USE.woff";
import INTER from "./Inter-Regular.otf";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'MADE';
    src: url(${MADE}) format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: auto;
}

@font-face {
    font-family: 'INTER';
    src: url(${INTER}) format('truetype');
    font-weight: regular;
    font-style: normal;
    font-display: auto;
}`;

export default GlobalStyle;
