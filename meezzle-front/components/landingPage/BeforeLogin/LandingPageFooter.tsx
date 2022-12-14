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

const Button = styled.button`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 53px;
    font-size: 15px;
    text-align: center;
    font-weight: 600;
    font-family: "Pretendard";
    background-color: #ff9a3e;
    color: white;
    border-radius: 15px;
    border: none;
    filter: drop-shadow(0px 0px 15px #ffb36f);
    cursor: pointer;
`;

const Footer = styled.footer`
    width: 90%;
    max-width: 375px;
    // margin-top: 20px;
    // height: 134px;
    margin-bottom: 20px;
    position: fixed;
    bottom: 0;
`;
