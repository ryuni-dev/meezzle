import { NextPage } from "next";
import Navbar from "../components/common/Navbar";
import Catchphrase from "../components/login/Catchphrase";
import kakaoLogin from "../public/assets/kakao_login_large_wide.svg";
import GoogleLogin from "../components/login/GoogleLogin";
import Image from "next/image";
import Script from "next/script";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTest } from "../hooks/api/auth";
import { useEffect } from "react";
import Link from "next/link";

const Login: NextPage = () => {
    const router = useRouter();
    const auth = useTest();
    const authFunc = () => {
        if (!auth.isLoading) {
            return auth.data.data.authorizationUrl;
        }
    };

    const href = authFunc();

    const KakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:3000/oauth/kakao",
        });
    };

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></Script>
            <Navbar />
            <Catchphrase />
            <LoginContainer>
                {/* <a href={authFunc()}> */}
                <Image
                    src={kakaoLogin}
                    onClick={() => {
                        window.open(
                            authFunc(),
                            "_blank",
                            "height=400,width=377,top=100,left=200,scrollbars=yes,resizable=yes"
                        );
                    }}
                />
                {/* </a> */}
                {/* <GoogleLogin /> */}
            </LoginContainer>
        </>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 96px;
`;
