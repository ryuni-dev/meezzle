import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { HomeBtn } from "../components/common/HomeBtn";
import Navbar from "../components/common/Navbar";
import OrangeBtn from "../components/common/OrangeBtn";
import character from "../public/assets/sad_character.svg";
import Body from "../styled-components/StyledBody";
import Head from "next/head";

const Error500 = () => {
    const router = useRouter();
    return (
        <Body>
            <Head>
                <title>500 Server Error | meezzle</title>
            </Head>
            <Navbar></Navbar>
            <Section>
                <Image src={character} />
                <SectionLargeText>500 Error!</SectionLargeText>
                <SectionText>서버에 문제가 생겼어요.</SectionText>
            </Section>
            <Footer>
                <OrangeBtn
                    style={{ filter: "none" }}
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    홈으로 돌아갈래요!
                </OrangeBtn>
            </Footer>
        </Body>
    );
};

export default Error500;

const SectionText = styled.p`
    font-family: "bitbit";
    font-size: 30px;
    letter-spacing: -0.011em;
    color: #3278de;
    margin: 0;
    margin-top: 10px;
    padding-left: 15px;
`;
const SectionLargeText = styled.p`
    font-family: "bitbit";
    font-size: 60px;
    letter-spacing: -0.011em;
    color: #3278de;
    margin: 0;
    margin-top: 40px;
`;
const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 65vh;
    text-align: "center";
`;

const Footer = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
