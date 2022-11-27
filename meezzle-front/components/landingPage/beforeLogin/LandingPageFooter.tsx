import { NextComponentType } from "next";
import styled from "styled-components";
import { Button } from "../../../styled-components/StyledButton";
import Link from "next/link";

const LandingPageFooter: NextComponentType = () => {
    return (
        <Footer>
            <Link href="/login" prefetch>
                <Button>이벤트를 생성해보세요!</Button>
            </Link>
        </Footer>
    );
};

export default LandingPageFooter;

const Footer = styled.footer`
    width: 95%;
    max-width: 340px;
    // margin-top: 20px;
    // height: 134px;
    margin-bottom: 20px;
    position: fixed;
    bottom: 0;
`;
