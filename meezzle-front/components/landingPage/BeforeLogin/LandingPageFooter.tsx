import { NextComponentType } from "next";
import styled from "styled-components";
import Link from "next/link";
import OrangeBtn from "../../../components/common/OrangeBtn";

const LandingPageFooter: NextComponentType = () => {
    return (
        <Footer>
            <Link href="/login" prefetch>
                <OrangeBtn>meezzle로 편하게 시간 잡기</OrangeBtn>
            </Link>
        </Footer>
    );
};

export default LandingPageFooter;

const Footer = styled.footer`
    width: 90%;
    max-width: 375px;
    // margin-top: 20px;
    // height: 134px;
    margin-bottom: 20px;
    position: fixed;
    bottom: 0;
`;
