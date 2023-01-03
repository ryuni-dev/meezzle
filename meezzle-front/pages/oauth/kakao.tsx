import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLogin } from "../../states/login";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";

interface ResponseType {
    ok: boolean;
    error?: any;
}
const Kakao: NextPage = () => {
    const [loginState, setLoginState] = useLogin();
    const router = useRouter();
    const { code: authCode, error: kakaoServerError } = router.query;

    const loginHandler = useCallback(
        async (code: string | string[]) => {
            try {
                await axios
                    .get(process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT + "", {
                        params: {
                            code: code,
                            requestUrl: "http://localhost:3000/oauth/kakao",
                        },
                    })
                    .then((res) => {
                        const token = res.data.data.token
                            ? res.data.data.token
                            : "";
                        window.localStorage.setItem("token", token);
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
            // router.push('/notifications/authentication-failed');
            console.log(kakaoServerError);
        }
    }, [loginHandler, authCode, kakaoServerError, router]);

    return (
        <LoaderBox>
            <HashLoader color="#3278DE" />
        </LoaderBox>
    );
};

const LoaderBox = styled.div`
    margin-top: 60%;
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
