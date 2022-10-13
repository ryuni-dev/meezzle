import type { NextPage } from "next";
import { GlobalStyle } from "../styles/Globalstyle";

const Home: NextPage = () => {
    return (
        <>
            <GlobalStyle />
            <h1>Hello world</h1>
        </>
    );
};

export default Home;
