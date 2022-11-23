import styled from 'styled-components';

const GrayText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;

    color: #B0B4B8;
`

type Props = {
    text: string
}
const TextGraySmall= ({text}: Props) => {
    return (
        <GrayText>{text}</GrayText>
    )
}

export default TextGraySmall