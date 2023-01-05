import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../../../components/common/Navbar";
import styled from "styled-components";
import character from "../../../public/assets/character.svg";
import Image from "next/image";
import OrangeBtn from "../../../components/common/OrangeBtn";

interface Props {
    params: {
        eid: string;
    };
}

const Congratulations: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;

    const onShare = () => {
        navigator.clipboard
            .writeText(window.location.href.replace("congratulations", "info"))
            .then(() => {
                // 토스트 메세지 복사되었습니다 띄우기
                console.log("Text copied to clipboard...");
            })
            .catch((err) => {
                console.log("Something went wrong", err);
            });
    };

    const goHome = () => {
        router.push("/");
    };

    return (
        <Body>
            <Navbar>
                <></>
            </Navbar>
            <Section>
                <Image src={character} />
                <SectionText>이벤트가 생성되었어요!</SectionText>
            </Section>
            <Footer>
                <FooterText>다른 친구들에게 공유해봐요!</FooterText>
                <OrangeBtn style={{ filter: "none" }} onClick={onShare}>
                    공유하기
                </OrangeBtn>
                <HomeBtn onClick={goHome}>홈으로 돌아갈래요</HomeBtn>
            </Footer>
        </Body>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        return {
            props: {
                params: context.params,
            },
        };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
};

const Body = styled.div`
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 65vh;
`;

const Footer = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SectionText = styled.p`
    font-family: "bitbit";
    font-size: 28px;
    line-height: 150%;
    letter-spacing: -0.011em;
    color: #3278de;
`;

const FooterText = styled.p`
    font-family: "Pretendard";
    letter-spacing: -0.011em;
    color: #ff9a3e;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    margin-bottom: 8px;
`;

const HomeBtn = styled.p`
    margin-top: 20px;
    cursor: pointer;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 13px;
    line-height: 150%;

    letter-spacing: -0.011em;
    text-decoration-line: underline;

    color: #656565;
`;

export default Congratulations;
