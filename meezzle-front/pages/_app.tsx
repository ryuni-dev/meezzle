import "../styles/Globalstyle.ts";
import "../public/fonts/pretendard.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Head>
                <meta name="viewport" 
                    content="width=device-width, initial-scale=1, user-scalable=no"/>
            </Head>
            <Component {...pageProps} />
        </RecoilRoot>

    );
}

export default MyApp;
