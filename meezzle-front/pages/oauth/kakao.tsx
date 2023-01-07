import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLogin } from "../../states/login";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";

interface ResponseType {
    ok: boolean;
    error?: any;
}

type Props = { host: string | null };

const Kakao: NextPage<Props> = ({ host }) => {
    const [loginState, setLoginState] = useLogin();
    const router = useRouter();
    const { code: authCode, error: kakaoServerError } = router.query;
    let requestUrl = "http://localhost:3000/oauth/kakao";
    if (host !== "localhost:3000") {
        requestUrl = "https://meezzle.vercel.app/oauth/kakao";
    }
    const loginHandler = useCallback(
        async (code: string | string[]) => {
            try {
                await axios
                    .get(process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT + "", {
                        params: {
                            code: code,
                            requestUrl: requestUrl,
                        },
                    })
                    .then((res) => {
                        const token = res.data.data.token
                            ? res.data.data.token
                            : "";

                        const name = res.data.data.name
                        ? res.data.data.name
                        : "";

                        window.localStorage.setItem("token", token);
                        window.localStorage.setItem("name", name);

                        if (localStorage.getItem("token")) setLoginState(true);
                        router.push("/");
                    });
            } catch (e) {
                console.error(e);
            }
        },
        [router]
    );

    useEffect(() => {
        if (authCode) {
            loginHandler(authCode);
        } else if (kakaoServerError) {
            console.log(kakaoServerError);
        }
    }, [loginHandler, authCode, kakaoServerError, router]);

    return (
        <LoaderBox>
            <HashLoader color="#3278DE" />
        </LoaderBox>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
    props: {
        host: context.req.headers.host || null,
    },
});

const LoaderBox = styled.div`
    margin-top: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Body = styled.div`
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default Kakao;
