import "../styles/Globalstyle.ts";
import "../public/fonts/pretendard.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <RecoilRoot>
                    <Head>
                        <meta name="viewport" 
                            content="width=device-width, initial-scale=1, user-scalable=no"/>
                    </Head>
                    <Component {...pageProps} />
                </RecoilRoot>
            </Hydrate>  
        </QueryClientProvider>

    );
}

export default MyApp;
