import { NextPage } from "next";
import Navbar from "../components/common/Navbar";
import Catchphrase from "../components/login/Catchphrase";
import kakaoLogin from "../public/assets/kakao_login_large_wide.svg";
import GoogleLogin from "../components/login/GoogleLogin";
import Image from "next/image";
import Script from "next/script";
import styled from "styled-components";

const Login: NextPage = () => {
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
                <Image src={kakaoLogin} />
                <GoogleLogin />
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
