import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 48px;
    margin-top: 1.5rem;
`
type Props = {
    children: JSX.Element | JSX.Element[]
}
const DivRow: React.FC<Props>= ({children}: Props) => {
    return (
        <Div>{children}</Div>
    )
}

export default DivRow