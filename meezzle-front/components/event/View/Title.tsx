import styled from "styled-components";

type Props = {
    children: React.ReactNode;
};

const Title: React.FC<Props> = ({ children }: Props) => {
    return <H1>{children}</H1>;
};

export default Title;

const H1 = styled.h1`
    font-size: 18px;
    margin-left: 21px;
    color: #3278de;
    font-family: "Pretendard";
`;
