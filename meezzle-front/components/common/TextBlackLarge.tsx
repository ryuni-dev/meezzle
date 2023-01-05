import styled from 'styled-components';

const H1 = styled.h1`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    letter-spacing: -0.011em;
    color: #414141;

    position: absolute;
`
type Props = {
    text: string
}

const TextBlackLarge= ({text}: Props) => {
    return (
        <H1>{text}</H1>
    )
}

export default TextBlackLarge