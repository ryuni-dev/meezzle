import styled from 'styled-components';

const Button = styled.button`
    width: 343px;
    height: 59px;

    background: #3278DE;
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
    margin: 1rem;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;  
    // }
`
type BtnProps = {
    text: string
    click(): void
}

const Btn= ({text, click}: BtnProps) => {
    return (
        <Button onClick={click} type='button'>{text}</Button>
    )
}

export default Btn