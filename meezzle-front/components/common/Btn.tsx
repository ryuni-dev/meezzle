import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { btnDisable } from '../../states/eventCreate';

interface Props {
    disable: boolean;
}

const Button = styled.button`
    max-width: 340px;
    width: 85%;
    height: 59px;

    background: ${(props:Props) => (props.disable) ?  "#E2E2E2": "#3278DE"};
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
    color: #FFFFFF;
    // margin: 1rem;
    margin-right: 8%;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;  
    // }
`
type BtnProps = {
    text: string
    Click(): void
}

const Btn= ({text, Click}: BtnProps) => {
    const isDisable = useRecoilValue(btnDisable);
    return (
        <Button type='button' disable={isDisable} disabled={isDisable} onClick={Click} >{text}</Button>
    )
}

export default Btn