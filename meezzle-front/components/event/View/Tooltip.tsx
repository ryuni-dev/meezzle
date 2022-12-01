import styled from "styled-components";

type Props = {
    children: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ children }: Props) => {
    return <Container>{children}</Container>;
};

export default Tooltip;

const Container = styled.div`
    width: 92%;
    height: 36px;
    margin: 0 auto;
    padding-left: 11px;
    margin-bottom: 25px;
    line-height: 36px;
    font-family: "Pretendard";
    font-weight: 300;
    font-size: 12px;
    background: #efefef;
    border-radius: 5px;
`;
