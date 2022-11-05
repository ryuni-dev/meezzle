import styled from 'styled-components';


const Button = styled.button`
    width: 343px;
    height: 59px;

    background: #3278DE;
    border-radius: 15px;
    
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
`
type Props = {
    text: string
}

const Btn= ({text}: Props) => {
    return (
        <Button type='button'>{text}</Button>
    )
}

export default Btn