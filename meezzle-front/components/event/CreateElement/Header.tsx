import styled from 'styled-components';
import TextBlackLarge from '../../common/TextBlackLarge';

const DivH1 = styled.div`
    display: flex;

    width: 100%;
    height: 44px;
    align-items: center;
    margin-top: 44px;
    // padding-left: 0%;

`
type Props = {
    text: string
    children: React.ReactNode;
}
const Header: React.FC<Props>= ({text}) => {
    return (
        <DivH1>
            <TextBlackLarge text={text}></TextBlackLarge>
        </DivH1>
    )
}

export default Header