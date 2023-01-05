import { NextComponentType } from "next";
import styled from "styled-components";
import Link from "next/link";

const LandingPageFooter: NextComponentType = () => {
    return (
        <Footer>
            <Link href="/login" prefetch>
                <Button>meezzle로 편하게 시간 잡기</Button>
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
    text-align: center;
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
