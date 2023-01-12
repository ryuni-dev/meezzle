import styled from "styled-components";
import TextBlackLarge from "../../common/TextBlackLarge";

const DivH1 = styled.div`
    display: flex;

    width: 100%;
    max-width: 340px;
    height: 44px;
    align-items: center;
    margin-top: 25px;
`;
type Props = {
    text: string;
    children: React.ReactNode;
};
const Header: React.FC<Props> = ({ text }) => {
    return (
        <DivH1>
            <TextBlackLarge text={text}></TextBlackLarge>
        </DivH1>
    );
};

export default Header;
