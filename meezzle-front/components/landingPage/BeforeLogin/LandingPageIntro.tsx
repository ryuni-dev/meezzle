import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import character from "../../../public/assets/character.svg";
import landingHeaderText from "../../../public/assets/landing_header_text.svg";
import Image from "next/image";
import Link from "next/link";
import polygon from "../../../public/assets/polygon2.svg";
import landing from "../../../public/assets/landingpage_section.svg";

const LandingPageIntro: NextComponentType = () => {
    return (
        <IntroContainer>
            <HeaderContainer>
                <Image src={character} />
                <HeaderTextBox>
                    <Image src={landingHeaderText} />
                </HeaderTextBox>
                <Link href="/login" prefetch>
                    <Button>모임 시간을 잡아보세요!</Button>
                </Link>
                <P>스크롤을 내려 미쯜의 이야기를 확인해보세요</P>
                <Image src={polygon} />
                <LandingBox>
                    <Image src={landing} />
                </LandingBox>
            </HeaderContainer>
        </IntroContainer>
    );
};

export default LandingPageIntro;

const P = styled.p`
    margin: 7px 0px 20px 0px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.011em;

    color: #a6a5a5;
`;

const LandingBox = styled.div`
    margin-top: 30px;
`;

const Button = styled.button`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 53px;
    text-align: center;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    color: white;
    background-color: #ff9a3e;
    border: none;
    border-radius: 15px;
    cursor: pointer;
`;

const IntroContainer = styled.article`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 1450px;
`;

const HeaderContainer = styled.div`
    margin-top: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const HeaderTextBox = styled.div`
    margin-top: 24px;
    margin-bottom: 15px;
`;
