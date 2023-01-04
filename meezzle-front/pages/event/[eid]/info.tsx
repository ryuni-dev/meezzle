import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { useEffect } from "react";

import Navbar from "../../../components/common/Navbar";
import VoteLogin from "../../../components/event/Vote/Login";
import { useEvent, useEventCreate_test } from "../../../hooks/api/events";
import Link from "next/link";
import Btn from "../../../components/common/Btn";
import { useRouter } from "next/router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { participant, timeSelected, voteNow } from "../../../states/eventVote";
import { eventDaySelected } from "../../../states/eventDayBox";
import { btnDisable } from "../../../states/eventCreate";
import Btn2 from "../../../components/common/Btn2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { useParticipants } from "../../../hooks/api/participants";
import { useGuestLogin, useTest } from "../../../hooks/api/auth";
import { useLogin } from "../../../states/login";
import { guestToken } from "../../../states/guest";

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

const EventExplainDiv = styled.div`
    display: flex;
    width: 80%;
    // height: 110px;
    margin-right: auto;
    margin-left: 10%;
    margin-top: 23px;
    margin-bottom: 40px;
    white-space: pre;

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

const InputExplainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 7%;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    // padding-left: 1%;
    width: 100%;
    overflow-x: hidden;
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 120px;
    position: fixed;
    bottom: 0;
    // margin-left: 12%;
    // margin-right: 0px;
`;
const A = styled.a`
    max-width: 340px;
    width: 80%;
    height: 59px;
`;

const LoaderBox = styled.div`
    margin-top: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {
    params: {
        eid: string
    }
}

const ReviseEvent: NextPage<Props> = ({ params }) => {
    const router = useRouter();
    const { eid } = params;

    const { data, isLoading } = useEvent(eid);
    const event = isLoading ? null : data.data;
    console.log('data', event)
    const [now, setNow] = useRecoilState(voteNow);
    const [selectedDay, setSelectedDay] = useRecoilState(eventDaySelected);
    const [isLoggedIn, setIsLoggedIn] = useLogin();
    const resetBtn = useResetRecoilState(btnDisable);
    const resetUser = useResetRecoilState(participant);
    const [user, setUser] = useRecoilState(participant);
    const resetTime = useResetRecoilState(timeSelected);
    const guestLogin = useGuestLogin(eid ? eid : "", user);
    const participants = useParticipants();
    const [token, setToken] = useRecoilState(guestToken);

    if (!participants.isLoading) {
        console.log(participants.data[0].code);
    }

    const LoginFunc = () => {
        if (!participants.isLoading) {
            return participants.data[0].code;
        }
    };

    const ErrorPW = () =>
        toast.error("비밀번호가 틀렸어요! 다시 입력해주세요.", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    useEffect(() => {
        resetBtn();
        resetUser();
    }, []);

    const Click2Vote = () => {
        if (!isLoggedIn) {
            guestLogin.mutate();
        }
        setNow(event.days[0]);
        setSelectedDay(event.days);
        resetTime();
        console.log("SUCCESS");
        router.push({
            pathname: "/event/[eid]/vote",
            query: { eid: eid },
        });
        // ErrorPW();
        // const loginResult = LoginFunc();
        // console.log(loginResult);
        // if (loginResult === "SUCCESS") {
        //     setNow(event.days[0]);
        //     setSelectedDay(event.days);
        //     resetTime();
        //     console.log("SUCCESS");
        //     router.push({
        //         pathname: "/event/[eid]/vote",
        //         query: { eid: eid },
        //     });
        // } else {
        //     ErrorPW();
        // }
        // console.log("click!!");
    };

    return (
        <Body>
            <Navbar>
                <></>
            </Navbar>
            {isLoading ? (
                <LoaderBox>
                    <HashLoader color="#3278DE" />
                </LoaderBox>
            ) : (
                <>
                    <TitleBox>
                        <Highlight>
                            <TitleLargeText>{event.event.title}</TitleLargeText>
                            <TitleMediumText>
                                에 가능한 시간을 입력해주세요
                            </TitleMediumText>
                        </Highlight>
                    </TitleBox>
                    <EventExplainDiv>{event.event.description}</EventExplainDiv>
                    {!isLoggedIn && <VoteLogin></VoteLogin>}
                    <Footer>
                        <Btn
                            text="가능한 시간 입력하러 가기!"
                            color={true}
                            useDisable={!isLoggedIn && true}
                            Click={Click2Vote}
                        ></Btn>
                        <ToastContainer
                            position="bottom-center"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                            theme="colored"
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
        </Body>
    );
};


export const getServerSideProps: GetServerSideProps = async(context) => {
    try {
        return {
            props: {
                params: context.params
            }
        }
    }
    catch(e){
        console.log(e);
        return {props: {}}
    }
}

export default ReviseEvent;
