import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar";
import VoteLogin from "../../../components/event/Vote/Login";
import { useEvent } from "../../../hooks/api/events";
import Link from "next/link";
import Btn from "../../../components/common/Btn";
import { useRouter } from "next/router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { participant, timeSelected, voteNow } from "../../../states/eventVote";
import { eventDaySelected } from "../../../states/eventDayBox";
import { btnDisable } from "../../../states/eventCreate";
import Btn2 from "../../../components/common/Btn2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { useGuestLogin } from "../../../hooks/api/auth";
import { useLogin } from "../../../states/login";
import { guestLogined } from "../../../states/guest";
import { Convert4ResEventDays } from "../../../utils/converter";
import ContainerToast from "../../../components/common/ContainerToast";
import Body from "../../../styled-components/StyledBody";
import Head from "next/head";
import { useUser, useUserEnabled } from "../../../hooks/api/user";
import sitCharacter from "../../../public/assets/sit_character.svg";
import Image from "next/image";
import Voter from "../../../components/common/Voter";

const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    // width: 301px;
    // height: 29px;
`;

const Highlight = styled.div`
    display: flex;
    background: linear-gradient(to top, #e3efff 50%, transparent 50%);
    z-index: -1;
`;
const TitleLargeText = styled.text`
    margin-right: 5px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 150%;
    /* identical to box height, or 28px */

    letter-spacing: -0.011em;

    color: #000000;
`;
const TitleMediumText = styled.text`
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
    /* identical to box height, or 24px */

    letter-spacing: -0.011em;

    color: #000000;
`;

const ImageContainer = styled.div`
    position: fixed;
    /* width: 400px; */
    /* margin-right: 50%; */
    bottom: 97px;
`;

const EventExplainDiv = styled.div`
    display: inline-block;
    width: 80%;
    // height: 110px;
    margin-right: auto;
    margin-left: 5%;
    margin-top: 23px;
    margin-bottom: 40px;
    /* white-space: pre; */
    word-break: break-all;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 150%;
    /* or 21px */

    letter-spacing: -0.011em;

    /* gray900 */

    color: #333333;
`;

const SectionContainer = styled.div`
    margin-left: 2vw;
`;

const InputExplainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 7%;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    position: fixed;

    max-width: 400px;
    margin: 0 auto;

    overflow-x: hidden;
    bottom: 0;
    // margin-left: 12%;
    // margin-right: 0px;
`;
const A = styled.a`
    max-width: 340px;
    width: 80%;
    height: 59px;
`;

const DescriptionNotFound = styled.p`
    margin: 12px auto 0px auto;
    color: #8f8f8f;
    font-size: 14px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
    letter-spacing: -0.011em;
`;

const HostInfo = styled.div`
    display: block;

    margin: 0;
    & > p {
        font-family: "Pretendard";
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 150%;
        /* identical to box height, or 18px */

        letter-spacing: -0.011em;

        color: #8f8f8f;
    }
`;

const ShareContainer = styled.div`
    white-space: nowrap;
    margin-top: 8px;

    font-family: "Pretendard";
    cursor: pointer;

    & img {
        height: 24px;
        vertical-align: middle;
    }
`;

const ShareBtn = styled.div`
    white-space: nowrap;
    margin-top: 12px;
    font-family: "Pretendard";
    cursor: pointer;
`;

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {
    params: {
        eid: string;
    };
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;

    const { data, isLoading, isError } = useEvent(eid);
    const event = isLoading ? null : data.data;
    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);
    const [isLoggedIn, setIsLoggedIn] = useLogin();
    const resetBtn = useResetRecoilState(btnDisable);
    const resetUser = useResetRecoilState(participant);
    const [user, setUser] = useRecoilState(participant);
    const resetTime = useResetRecoilState(timeSelected);
    const {
        mutate,
        isSuccess,
        data: guestLoginData,
    } = useGuestLogin(eid ? eid : "", user);
    // const participants = useParticipants();
    const [isGuest, setIsGuest] = useRecoilState(guestLogined);
    const {
        data: userData,
        isLoading: userIsLoading,
        isError: userIsError,
    } = useUserEnabled(isLoggedIn);
    const [isHost, setIsHost] = useState<boolean>(false);

    // if (!participants.isLoading) {
    //     console.log(participants.data[0].code);
    // }

    // const LoginFunc = () => {
    //     if (!participants.isLoading) {
    //         return participants.data[0].code;
    //     }
    // };

    useEffect(() => {
        if (!isLoading && !userIsLoading && userData) {
            //@ts-ignore
            if (data.data.event.hostId === userData.data.id) {
                setIsHost(true);
            }
        }
    }, [isLoading, userIsLoading]);

    useEffect(() => {
        if (!isLoading) {
            console.log(
                event.eventParticipants.map((el: any) => [el.name, el.id])
            );
        }
    });

    const errorHandler = () => {
        if (data === 404) {
            router.push(`/event/${eid}/delete`);
        }
    };
    errorHandler();

    useEffect(() => {
        errorHandler();
    }, []);

    const ErrorPW = () =>
        toast.error(
            <span>
                비밀번호가 틀렸어요!
                <br /> 투표가 처음이라면 다른 이름을 사용해주세요.
            </span>,
            {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }
        );

    useEffect(() => {
        resetBtn();
        resetUser();
    }, []);

    const goVote = () => {
        const days = Convert4ResEventDays(
            data.data.selectableParticipleTimes.selectedDayOfWeeks
        );
        setSelectedDay(days);
        setNow(days[0]);
        resetTime();
        router.push({
            pathname: "/event/[eid]/vote",
            query: { eid: eid },
        });
    };

    const Click2Vote = () => {
        if (!isLoggedIn) {
            mutate();
        } else {
            goVote();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            if (guestLoginData === "error") {
                ErrorPW();
            } else {
                setIsGuest(true);
                goVote();
            }
        }
    }, [isSuccess]);

    // useEffect(() => {
    //     if (window.Kakao) {
    //         window.Kakao.Share.createDefaultButton({
    //             container: "#kakaotalk-sharing-btn",
    //             objectType: "text",
    //             text: `${event.event.title} 일정에서 가능한 시간을 입력해보세요.`,
    //             link: {
    //                 mobileWebUrl: `https://localhost:3000/event/${eid}/info`,
    //                 webUrl: `https://localhost:3000/event/${eid}/info`,
    //             },
    //         });
    //     }
    // }, []);
    const onShare = () => {
        navigator.clipboard
            .writeText(window.location.href)
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
    };

    return (
        <Body style={{ display: "block" }}>
            {data === 404 ? null : (
                <>
                    <Navbar>
                        <ShareContainer>
                            {/* <a id="kakaotalk-sharing-btn">
                        <img
                            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                            alt="카카오톡 공유 보내기 버튼"
                        />
                        <span> 공유하기</span>
                    </a> */}

                            <ShareBtn onClick={onShare}>공유하기</ShareBtn>
                        </ShareContainer>
                    </Navbar>
                    {isLoading ? (
                        <LoaderBox>
                            <HashLoader color="#3278DE" />
                        </LoaderBox>
                    ) : (
                        <>
                            <Head>
                                <title>{data.data.event.title} | meezzle</title>
                            </Head>
                            <SectionContainer>
                                <TitleBox>
                                    <Highlight>
                                        <TitleLargeText>
                                            {event.event.title}
                                        </TitleLargeText>
                                        <TitleMediumText>
                                            에 가능한 시간을 입력해주세요
                                        </TitleMediumText>
                                    </Highlight>
                                </TitleBox>
                                <EventExplainDiv>
                                    {event.event.description ? (
                                        event.event.description
                                    ) : (
                                        <DescriptionNotFound>
                                            설명이 존재하지 않습니다.
                                        </DescriptionNotFound>
                                    )}
                                </EventExplainDiv>
                                {!isLoggedIn && <VoteLogin></VoteLogin>}
                                {isHost && (
                                    <HostInfo>
                                        <Highlight style={{ width: "5.5rem" }}>
                                            <TitleLargeText
                                                style={{ marginRight: "0px" }}
                                            >
                                                투표 완료자
                                            </TitleLargeText>
                                        </Highlight>
                                        <p style={{ marginTop: "8px" }}>
                                            이벤트 생성자에게만 보이는
                                            정보입니다.
                                        </p>
                                        {event.eventParticipants.map(
                                            (el: any) => {
                                                return (
                                                    <Voter
                                                        name={el.name}
                                                        eid={eid}
                                                        id={el.id}
                                                        key={el.id}
                                                    />
                                                );
                                            }
                                        )}
                                    </HostInfo>
                                )}
                            </SectionContainer>
                            <Footer>
                                <div style={{ marginLeft: "160px" }}>
                                    <ImageContainer>
                                        <Image src={sitCharacter} />
                                    </ImageContainer>
                                </div>
                                <Btn
                                    text="가능한 시간 입력하러 가기!"
                                    color={true}
                                    useDisable={!isLoggedIn && true}
                                    Click={Click2Vote}
                                ></Btn>
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
                                <Link
                                    href={{
                                        pathname: "/event/[eid]/view",
                                        query: { eid: eid },
                                    }}
                                >
                                    <A>
                                        <Btn2
                                            text="통계 바로 보기!"
                                            color={false}
                                        ></Btn2>
                                    </A>
                                </Link>
                            </Footer>
                        </>
                    )}
                </>
            )}
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

export default ReviseEvent;
