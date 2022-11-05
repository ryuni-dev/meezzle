
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { createPageState } from "../states/eventCreate";

const BtnDiv = styled.button`
    weight: 50px;
    height: 25px;
`
export default function DecreaseBtn() {
    const [pageState, setPageState] = useRecoilState(createPageState);
    const DecreasePage = () => {
        if (pageState > 1){
            setPageState(pageState - 1);
        }
    }
    return (
        <BtnDiv onClick={DecreasePage}>이전</BtnDiv>
    )
}