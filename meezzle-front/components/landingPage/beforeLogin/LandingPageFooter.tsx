import { NextComponentType } from "next";
import styled from "styled-components";
import { Button } from "../../../styled-components/StyledButton";

const LandingPageFooter: NextComponentType = () => {
    return (
        <Footer>
            <Button>이벤트를 생성해보세요!</Button>
        </Footer>
    );
};

export default LandingPageFooter;

const Footer = styled.footer`
    margin-top: 20px;
    height: 134px;
`;
