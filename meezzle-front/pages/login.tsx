import { GetServerSideProps, NextPage } from "next";
import Navbar from "../components/common/Navbar";
import kakaoLogin from "../public/assets/kakao_login_large_wide.png";
import GoogleLogin from "../components/login/GoogleLogin";
import Image from "next/image";
import Script from "next/script";
import styled from "styled-components";
import character from "../public/assets/character.svg";


type Props = { host: string | null };

const Login: NextPage<Props> = ({ host }) => {
    const KakaoLogin = () => {
        if (host === "localhost:3000"){
            window.Kakao.Auth.authorize({
                redirectUri: "http://localhost:3000/oauth/kakao",
            });
        }
        else {
            window.Kakao.Auth.authorize({
                redirectUri: "https://meezzle.vercel.app/oauth/kakao",
            });
        }
    };

    return (
        <Body>
            <Script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            ></Script>
            <NavContainer>
                <Catchphrase>약속은 편하게 모임은 즐겁게</Catchphrase>
                <Navbar />
            </NavContainer>
            <LoginContainer>
                <CharacterContainer>
                    <Image src={character} priority></Image>
                </CharacterContainer>
                <Image
                    src={kakaoLogin}
                    onClick={KakaoLogin}
                    style={{ cursor: "pointer" }}
                    priority
                />
                {/* <GoogleLogin /> */}
            </LoginContainer>
        </Body>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => (
    { 
        props: { 
            host: context.req.headers.host || null 
        } 
    }
);

export default Login;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 96px;
    width: 80%;
`;

const CharacterContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 60px;
`;

const NavContainer = styled.div`
    width: 100%;
    margin-left: 17px;
    margin-top: 24px;
`;

const Catchphrase = styled.div`
    margin-left: 8px;
    margin-bottom: 32px;
    position: relative;
    font-family: "bitbit";
    font-style: normal;
    font-weight: 400;
    font-size: 27px;
    line-height: 150%;

    top: 40px;
    letter-spacing: -0.011em;

    color: #bfc8e8;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    // for Galaxy fold
    @media (max-width: 300px) {
        font-size: 22px;
    }
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
