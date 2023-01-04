import { NextPage } from "next";
import Navbar from "../components/common/Navbar";
import Catchphrase from "../components/login/Catchphrase";
import kakaoLogin from "../public/assets/kakao_login_large_wide.png";
import GoogleLogin from "../components/login/GoogleLogin";
import Image from "next/image";
import Script from "next/script";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTest } from "../hooks/api/auth";
import Link from "next/link";
import { getAuth } from "../api/auth";
import { useState, useEffect } from "react";

const Login: NextPage = () => {
    const router = useRouter();
    // const auth = useTest();
    // const authFunc = () => {
    //     if (!auth.isLoading) {
    //         return auth.data.data.authorizationUrl;
    //     }
    // };
    // const href = authFunc();
    const KakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:3000/oauth/kakao",
        });
    };

    return (
        <Body>
            <Script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></Script>
            <Navbar />
            <Catchphrase />
            <LoginContainer>
                <Image
                    src={kakaoLogin}
                    onClick={KakaoLogin}
                    style={{ cursor: "pointer" }}
                />
                {/* <GoogleLogin /> */}
            </LoginContainer>
        </Body>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 96px;
    width: 80%;
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
