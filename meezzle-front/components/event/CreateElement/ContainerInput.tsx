import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 375px;
    height: auto;
    margin-top: 1.5rem;
    // margin-left: 16px;
`;
type Props = {
    children: JSX.Element | JSX.Element[];
};
const ContainerInput: React.FC<Props> = ({ children }: Props) => {
    return <Div>{children}</Div>;
};

export default ContainerInput;
