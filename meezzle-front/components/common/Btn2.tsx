import styled from 'styled-components';

interface Props {
    isColor: boolean | true;
}

const Button = styled.button`
    max-width: 340px;
    width: 100%;
    height: 59px;

    background: ${(props:Props) => {
        if(props.isColor){
                return "#3278DE";
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
    color: ${(props:Props) => {
        if(props.isColor){
                return "#ffffff";
        }
        else{
                return "#8D8D8D";
        }
    }};
    
    ${(props:Props) => props.isColor ? "#FFFFFF" : "#8D8D8D;"};
    // margin: 1rem;
    // margin-right: 8%;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;  
    // }
`
interface BtnProps {
    text: string;
    color: boolean;
    Click?(): void;
}

const Btn2 = ({text, color, Click}:BtnProps) => {
    return (
            <Button type='button' onClick={Click} isColor={color}>{text}</Button>
    )
}

export default Btn2;