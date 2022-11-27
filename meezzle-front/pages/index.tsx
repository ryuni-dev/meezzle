import type { GetServerSideProps, NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/common/Navbar";
import LandingPageIntro from "../components/landingPage/beforeLogin/LandingPageIntro";
import LandingPageFooter from "../components/landingPage/beforeLogin/LandingPageFooter";
import LandingPageSection from "../components/landingPage/afterLogin/LandingPageSection";
import profile from "../public/assets/profile.png";
import { useLogin } from "../states/login";
import { LoginBox } from "../styled-components/StyledLoginBox";
import { GlobalStyle } from "../styles/Globalstyle";
import Head from "next/head";
import styled from "styled-components";
import { useEvent } from "../hooks/api/events";

const Body = styled.div`
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

interface Props {
    data: JSON
}

const Home: NextPage<Props> = ({}) => {
    const [visible, setVisible] = useState<Boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useLogin();
    const {data} = useEvent();
    console.log("aa", data);
    // 프로필 클릭 시 메뉴 나오기
    const handleCilck = () => {
        setVisible(visible ? false : true);
    };

    // 임시 로그인 / 로그아웃 상태 변경
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <>
            <Head>
                <title>Home | meezzle</title>
            </Head>
            <GlobalStyle />
            <Body>
                <Navbar>
                    <Image src={profile} alt="profile" onClick={handleCilck} />
                    {visible && (
                        <LoginBox ref={menuRef} onClick={handleLogin}>
                            {!isLoggedIn ? "로그인" : "로그아웃"}
                        </LoginBox>
                    )}
                </Navbar>
                {!isLoggedIn && <LandingPageIntro />}
                {!isLoggedIn && <LandingPageFooter />}
                {isLoggedIn && <LandingPageSection />}
            </Body>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = async(context) => {
//     try {
//         const res = await fetch(`http://localhost:3000/api/event`);
//         if(res.status === 200) {
//             const data = await res.json();
//             return {props: {data: data}}
//         }
//         return {props: {}};
//     }
//     catch(e){
//         console.log(e);
//         return {props: {}}
//     }
// }

export default Home;
