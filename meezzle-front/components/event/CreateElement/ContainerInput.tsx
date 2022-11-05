import styled from 'styled-components';

const DivInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 375px;
    height: auto;
    margin-top: 20px;
    margin-left: 16px;
`
type Props = {
    children: JSX.Element | JSX.Element[]
}
const ContainerInput: React.FC<Props>= ({children}: Props) => {
    return (
        <DivInput>{children}</DivInput>
    )
}

export default ContainerInput