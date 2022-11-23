import styled from 'styled-components';

const Box = styled.div`
    width: 45px;
    height: 47px;
    background: #3278DE;

    border-radius: 5px;

    margin: 1rem;
`
type Props = {
    text: string
}

const DayBoxContainer= ({text}: Props) => {
    return (
        <Box></Box>
    )
}

export default DayBoxContainer