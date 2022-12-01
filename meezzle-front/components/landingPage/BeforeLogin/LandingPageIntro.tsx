import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";

const LandingPageIntro: NextComponentType = () => {
    return <IntroContainer>서비스 소개</IntroContainer>;
};

export default LandingPageIntro;

const IntroContainer = styled.article`
    width: 100%;
    height: 568px;
    text-align: center; // 임시
    line-height: 568px; // 임시
    background-color: #d9d9d9;
`;
