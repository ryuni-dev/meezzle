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
import { useEffect, useState } from "react";

interface Props {
    params: {
        eid: string;
    };
}

const Congratulations: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;
    const [isGuest, setIsGuest] = useState(false);

    const onClickBtn = () => {
        if(isGuest){
            router.push('/login');
        }
        else{
            router.push('/create')
        }
    };

    const goHome = () => {
        router.push("/");
    };

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setIsGuest(true);
        }
    }, [])
    

    return (
        <Body>
            <Navbar>
                <></>
            </Navbar>
            <Section>
                <Image src={character} />
                <SectionText>
                    삭제된 이벤트예요!
                </SectionText>
            </Section>
            <Footer>
                <FooterText>
                    {isGuest ? 'meezzle에 가입해서 이벤트를 만들어보세요!' : null}
                </FooterText>
                <OrangeBtn style={{ filter: "none" }} onClick={onClickBtn}>
                    {isGuest ? '가입하러 가기!' : '새로운 이벤트 만들기!' }
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
