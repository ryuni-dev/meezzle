import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLogin } from "../../states/login";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";

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
        <Body>
            <SpinContainer>
                <Oval
                    height={80}
                    width={80}
                    color="#3278DE"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#97B0D6"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </SpinContainer>
        </Body>
    );
};

const SpinContainer = styled.div`
    margin-top: 45vh;
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
