import styled from "styled-components";
import { NextComponentType } from "next";

export const EventBox: NextComponentType = () => {
  return <EventContainer></EventContainer>;
};

const EventContainer = styled.div`
  height: 121px;

  background: #ffe86d;
  border-radius: 15px;
`;
