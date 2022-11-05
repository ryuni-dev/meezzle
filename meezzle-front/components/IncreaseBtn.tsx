import type { NextComponentType } from "next"
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { createPageState } from "../states/eventCreate";

const BtnDiv = styled.button`
    weight: 50px;
    height: 25px;
`
export default function IncreaseBtn() {
    const [pageState, setPageState] = useRecoilState(createPageState);
    const IncreasePage = () => {
        if(pageState < 5) {
            setPageState(pageState + 1);
        }
    }
    return (
        <BtnDiv onClick={IncreasePage}>다음</BtnDiv>
    )
}