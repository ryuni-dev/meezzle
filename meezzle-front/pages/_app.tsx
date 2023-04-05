import { GlobalStyle } from "../styles/Globalstyle";
import "../public/fonts/pretendard.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GA_TRACKING_ID } from "../utils/gtag";

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
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    function kakaoInit() {
        // 페이지가 로드되면 실행
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        // console.log("kakao", window.Kakao.isInitialized());
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
                        <meta
                            property="og:url"
                            content="https://meezzle.xyz/"
                        />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:title"
                            content="약속은 편하게 모임은 즐겁게 meezzle!"
                        />
                        <meta
                            property="og:description"
                            content="meezzle에서 약속 시간을 편리하게 정해보세요!"
                        />
                        <meta
                            property="og:image"
                            content="https://www.meezzle.xyz/_next/static/media/character.820c8bb7.svg"
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
                         {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
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
