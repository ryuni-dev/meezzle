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
        <Body>
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
        </Body>
    );
};

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 96px;
`;
const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    // padding-left: 1%;
    width: 100%;
    overflow-x: hidden;
`;
