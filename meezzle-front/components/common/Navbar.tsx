import React from "react";
import styled from "styled-components";
import logo from "../../public/assets/logo1.svg";
import profile from "../../public/assets/profile.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NextComponentType } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../states/states";

const Navbar: NextComponentType = () => {
    const [visible, setVisible] = useState<Boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

    const handleCilck = () => {
        setVisible(visible ? false : true);
    };

    const handleScroll = () => {
        setVisible(false);
    };

    // 스크롤 시 로그인 팝업 제거
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    return (
        <Nav>
            <LogoWrapper>
                <Link href={{ pathname: "/" }} passHref>
                    <Image src={logo} alt="logo" />
                </Link>
            </LogoWrapper>
            <ContentWrapper>
                <Image src={profile} alt="profile" onClick={handleCilck} />
                {visible && (
                    <LoginBox>{!isLoggedIn ? "로그인" : "로그아웃"}</LoginBox>
                )}
            </ContentWrapper>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    margin-top: 40px;
    height: 40px;
    margin-bottom: 2px;
    line-height: 42px;
    margin-bottom: 22px;
    & span {
        vertical-align: middle;
    }
`;

const LogoWrapper = styled.div`
    float: left;
    margin-left: 21px;
    width: 119px;
    height: 48px;
    & span {
        cursor: pointer;
    }
`;

const ContentWrapper = styled.div`
    float: right;
    vertical-align: middle;
    margin-right: 26px;
    position: relative;
    & > span {
        line-height: 44px;
        cursor: pointer;
    }
`;

const LoginBox = styled.div`
    display: inline-block;
    position: absolute;
    margin-top: 45px;
    margin-left: -120px;
    width: 122px;
    height: 42px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;

    text-align: center;
    font-family: "Pretendard";
    background-color: white;
    cursor: pointer;
`;
