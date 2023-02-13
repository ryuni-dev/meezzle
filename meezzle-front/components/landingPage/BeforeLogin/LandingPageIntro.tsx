import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import character from "../../../public/assets/character.svg";
import landingHeaderText from "../../../public/assets/landing_header_text.svg";
import Image from "next/image";
import Link from "next/link";
import polygon from "../../../public/assets/polygon2.svg";
import landing from "../../../public/assets/landingpage_section.svg";
import { IntroProps } from "../../../pages/index";

const LandingPageIntro = (data: IntroProps["data"]) => {
    return (
        <IntroContainer>
            <HeaderContainer>
                <Image src={character} />
                <HeaderTextBox>
                    <Image src={landingHeaderText} />
                </HeaderTextBox>
                <UseBox>
                    지금까지 {data.data.eventCount}개의 이벤트가 생성되었어요.
                </UseBox>
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

const UseBox = styled.div`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    width: 88%;
    height: 45px;
    text-align: center;
    border: 1px solid rgba(50, 120, 222, 0.55);
    border-radius: 17px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 45px;
    letter-spacing: -0.011em;
    margin-bottom: 18px;

    color: rgba(50, 120, 222, 0.74);
`;

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
