import type { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/common/Navbar";
import LandingPageIntro from "../components/landingPage/BeforeLogin/LandingPageIntro";
import LandingPageFooter from "../components/landingPage/BeforeLogin/LandingPageFooter";
import LandingPageSection from "../components/landingPage/AfterLogin/LandingPageSection";
import profile from "../public/assets/profile.png";
import { useLogin } from "../states/login";
import { LoginBox } from "../styled-components/StyledLoginBox";
import Head from "next/head";
import styled from "styled-components";
import { useUserLogout } from "../hooks/api/user";
import Body from "../styled-components/StyledBody";
import { useTotalUse } from "../hooks/api/landing";

export interface IntroProps {
    data: {
        code: string;
        message: string;
        data: {
            eventCount: number;
        };
    };
}

const Home: NextPage = () => {
    const [visible, setVisible] = useState<Boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useLogin();
    const logout = useUserLogout();
    const [csr, setCsr] = useState(false);

    const { data, isLoading, isError } = useTotalUse();

    // 프로필 클릭 시 메뉴 나오기
    const handleCilck = () => {
        setVisible(visible ? false : true);
    };

    const handleLogin = () => {
        if (!isLoggedIn) {
            location.href = "/login";
        } else {
            logout.mutate();
            setIsLoggedIn(false);
            window.localStorage.clear();
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) setIsLoggedIn(true);
        setCsr(true);
    }, []);

    const menuRef = useRef<HTMLDivElement>(null);

    // 로그인 메뉴 이외의 곳을 클릭하면 로그인 메뉴가 사라짐
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
            <Body>
                {isLoggedIn && (
                    <Navbar>
                        <Image
                            src={profile}
                            alt="profile"
                            onClick={handleCilck}
                            priority
                        />
                        {visible && (
                            <LoginBox ref={menuRef} onClick={handleLogin}>
                                {!isLoggedIn ? "로그인" : "로그아웃"}
                            </LoginBox>
                        )}
                    </Navbar>
                )}
                {csr && !isLoading && !isLoggedIn && (
                    <LandingPageIntro {...data} />
                )}
                {csr && !isLoading && !isLoggedIn && <LandingPageFooter />}
                {csr && isLoggedIn && <LandingPageSection />}
            </Body>
        </>
    );
};

export default Home;
