import styled from 'styled-components';


const H2 = styled.h2`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;

    letter-spacing: -0.011em;

    /* gray900 */
    color: #333333;
    margin: 0px;
`
type Props = {
    text: string
}

const TextBlackMedium= ({text}: Props) => {
    return (
        <H2>{text}</H2>
    )
}

export default TextBlackMedium