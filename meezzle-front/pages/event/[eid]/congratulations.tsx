import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../../../components/common/Navbar";
import styled from "styled-components";
import character from "../../../public/assets/character.svg";
import Image from "next/image";
import OrangeBtn from "../../../components/common/OrangeBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeBtn } from "../../../components/common/HomeBtn";
import ContainerToast from "../../../components/common/ContainerToast";
import Body from "../../../styled-components/StyledBody";
import Head from "next/head";

interface Props {
    params: {
        eid: string;
    };
}

const Congratulations: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;

    const isVoter = router.query.voter === "true";

    const onShare = () => {
        let URL = "";
        if (isVoter) {
            URL = window.location.href.replace(
                "congratulations?voter=true",
                "view"
            );
            router.push(URL);
        } else {
            URL = window.location.href.replace("congratulations", "info");
            navigator.clipboard
                .writeText(URL)
                .then(() => {
                    toast("링크가 복사되었습니다.", {
                        position: "top-center",
                        autoClose: 1300,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch((err) => {
                    console.log("Something went wrong", err);
                });
        }
    };

    const goHome = () => {
        router.push("/");
    };

    return (
        <Body>
            <Head>
                <title>
                    {isVoter ? "투표 완료!" : "이벤트 생성 완료!"} | meezzle
                </title>
            </Head>
            <Navbar>
                <></>
            </Navbar>
            <ContainerToast
                position="top-center"
                autoClose={1300}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Section>
                <Image src={character} />
                <SectionText>
                    {isVoter
                        ? "투표가 완료되었어요!"
                        : "이벤트가 생성되었어요!"}
                </SectionText>
            </Section>
            <Footer>
                <FooterText>
                    {isVoter
                        ? "다른 사람들은 어디에 투표했을까?"
                        : "다른 친구들에게 공유해봐요!"}
                </FooterText>
                <OrangeBtn style={{ filter: "none" }} onClick={onShare}>
                    {isVoter ? "통계보기" : "공유하기"}
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

export default Congratulations;
