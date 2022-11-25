import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { btnDisable } from '../../states/eventCreate';

interface Props {
    disable: boolean;
    isColor: boolean | true;
}

const Button = styled.button`
    max-width: 340px;
    width: 85%;
    height: 59px;

    background: ${(props:Props) => {
        if(props.isColor){
            if(props.disable) {
                return "#E2E2E2";
            }
            else {
                return "#3278DE";
            }
        }
        else{
            return "#ffffff";
        }
    }};

    border-radius: 15px;
    border: 0;
    
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    /* identical to box height, or 22px */

    letter-spacing: -0.011em;

    /* white */
    color: ${(props:Props) => props.isColor ? "#FFFFFF" : "#8D8D8D;"};
    // margin: 1rem;
    // margin-right: 8%;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;  
    // }
`
interface BtnProps {
    text: string;
    useDisable?: boolean | false;
    color: boolean;
    Click?(): void;
}

const Btn = ({text, useDisable, color, Click}:BtnProps) => {
    let isDisable = false;
    if(useDisable){
        isDisable = useRecoilValue(btnDisable);
    }
    return (
            <Button type='button' disable={isDisable} disabled={isDisable} onClick={Click} isColor={color}>{text}</Button>
    )
}

export default Btn