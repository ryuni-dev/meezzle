import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useKakaoToken } from "../../hooks/api/auth";
import { useLogin } from "../../states/login";

interface ResponseType {
    ok: boolean;
    error?: any;
}
const Kakao: NextPage = () => {
    const [loginState, setLoginState] = useLogin();
    const router = useRouter();
    const { code: authCode, error: kakaoServerError } = router.query;
    // const auth = useKakaoToken();

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
                        setLoginState(true);
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
            console.log(authCode);
            loginHandler(authCode);

            // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
        } else if (kakaoServerError) {
            // router.push('/notifications/authentication-failed');
            console.log(kakaoServerError);
        }
    }, [loginHandler, authCode, kakaoServerError, router]);

    return (
        <>
            <h2>로그인 중입니다..</h2>
        </>
    );
};

export default Kakao;
