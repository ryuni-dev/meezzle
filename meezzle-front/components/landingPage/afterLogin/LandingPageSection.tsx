import React from "react";
import styled from "styled-components";
import { NextComponentType } from "next";
import { Button } from "../../../styled-components/StyledButton";
import plus from "../../../public/assets/plus.svg";
import Image from "next/image";
import { EventBox } from "./EventBox";

const LandingPageSection: NextComponentType = () => {
  return (
    <>
      <ButtonContainer>
        <Button>
          <Image src={plus} alt="plus" />
          <p>이벤트 생성하기</p>
        </Button>
      </ButtonContainer>
      <ScheduleContainer>
        <h3>Schedule</h3>
        <EventBox></EventBox>
      </ScheduleContainer>
    </>
  );
};

export default LandingPageSection;

const ButtonContainer = styled.div`
  height: 80px;
  display: table;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  & > button span {
    display: table-cell;
    vertical-align: middle;
  }
  & > button > p {
    margin: 0;
    vertical-align: middle;
    display: inline;
    padding-left: 15px;
  }
`;

const ScheduleContainer = styled.section`
  margin-left: auto;
  margin-right: auto;
  width: 92%;

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  & > h3 {
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 15px;
    margin-left: 10px;
  }
`;
