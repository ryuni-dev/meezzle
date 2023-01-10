import { GlobalStyle } from "../styles/Globalstyle";
import "../public/fonts/pretendard.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import {
    DehydratedState,
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import Script from "next/script";

declare global {
    // Kakao 함수를 전역에서 사용할 수 있도록 선언
    interface Window {
        Kakao: any;
    }
}

function MyApp({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient] = React.useState(() => new QueryClient());

    function kakaoInit() {
        // 페이지가 로드되면 실행
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log("kakao", window.Kakao.isInitialized());
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <RecoilRoot>
                    <Head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
                        />
                        <link
                            rel="shortcut icon"
                            type="image/x-icon"
                            href="/logo.ico"
                        />
                        <link
                            rel="sicon"
                            type="image/x-icon"
                            href="/logo.ico"
                        />
                        <link
                            rel="apple-touch-icon-precomposed"
                            type="image/x-icon"
                            href="/logo.ico"
                        />
                    </Head>
                    <GlobalStyle />
                    <Component {...pageProps} />
                    <Script
                        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
                        onLoad={kakaoInit}
                    ></Script>
                </RecoilRoot>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;

{
    /* <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js" integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx" crossorigin="anonymous"></script> */
}
