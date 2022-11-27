import type { NextPage } from "next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from 'styled-components';
import { useEffect, useState } from "react";

import LinkBtn from "../../../components/common/LinkBtn";
import Navbar from "../../../components/common/Navbar";
import InputText from "../../../components/event/CreateElement/InputText";
import TextBlackMedium from "../../../components/common/TextBlackMedium";
import TextGraySmall from "../../../components/common/TextGraySmall";

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 301px;
    height: 29px;
`

const Highlight = styled.div`
    display: flex;
    background: linear-gradient(to top, #E3EFFF 50%, transparent 50%);
    z-index:-1;
`
const TitleLargeText = styled.text`
    margin-right: 5px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 150%;
    /* identical to box height, or 28px */

    letter-spacing: -0.011em;

    color: #000000;
`
const TitleMediumText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
    /* identical to box height, or 24px */

    letter-spacing: -0.011em;

    color: #000000;
`

const EventExplainDiv = styled.div`
    display: flex;
    width: 80%;
    // height: 110px;
    margin-right: auto;
    margin-left: 10%;
    margin-top: 23px;
    margin-bottom: 40px;
    white-space:pre;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    /* or 21px */

    letter-spacing: -0.011em;

    /* gray900 */

    color: #333333;
`

const InputExplainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 7%;
    margin-top: 10px;
    margin-bottom: 5px;
`

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    // padding-left: 1%;
    width: 100%;
    overflow-x:hidden;
`

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    position : fixed;
    bottom : 0;
    // margin-left: 12%;
    // margin-right: 0px;
`

const ReviseEvent: NextPage = () => {
   
    useEffect(()=> {
        // setNow(selectedDay[0]);
    }, []);

    return (
        <>
        <Navbar>
            <></>
        </Navbar>
        <Body>
            <TitleBox>
                <Highlight>
                    <TitleLargeText>미미 긴급 회의</TitleLargeText>
                    <TitleMediumText>에 가능한 시간을 입력해주세요</TitleMediumText>
                </Highlight>
            </TitleBox>
            <EventExplainDiv>
                {"여러분 예상치 못한 변수가 생겼어요 회의를 해야합니다 \n\n<회의 안건> \r\n1. 드래그 방식 논의  \n2. 추가 기능 논의 \n3.디자인 피드백"}
            </EventExplainDiv>
            <InputExplainDiv>
                <TextBlackMedium text="이름"></TextBlackMedium>
                <TextGraySmall text="실명 사용을 권장해요."></TextGraySmall>
            </InputExplainDiv>
            <InputText></InputText>
            <InputExplainDiv>
                <TextBlackMedium text="비밀번호"></TextBlackMedium>
                <TextGraySmall text="회원님만 정보를 수정하기 위해선 비밀번호가 필요해요. (선택)"></TextGraySmall>
            </InputExplainDiv>
            <InputText type="password"></InputText>
            <Footer>
                <LinkBtn text="가능한 시간 입력하러 가기!" href="/event/eid/vote" color={true}></LinkBtn>
                <LinkBtn text="통계 바로 보기!" href="/" color={false}></LinkBtn>
            </Footer>
        </Body>
        </>
        )
};

export default ReviseEvent;
