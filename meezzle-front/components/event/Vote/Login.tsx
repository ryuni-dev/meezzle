import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useParticipants } from '../../../hooks/api/participants';
import { btnDisable } from '../../../states/eventCreate';
import { participant } from '../../../states/eventVote';
import Btn from '../../common/Btn';
import Btn2 from '../../common/Btn2';
import TextBlackMedium from '../../common/TextBlackMedium';
import TextGraySmall from '../../common/TextGraySmall';
import InputText from '../CreateElement/InputText';

const InputExplainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 7%;
    margin-top: 10px;
    margin-bottom: 5px;
`

const VoteLogin = () => {
    const [user, setUser] = useRecoilState(participant);
    const [disable, setDisable] = useRecoilState(btnDisable);
    // const {data, isLoading} = useParticipants();

    // const LoginFunc = () => {
    //     if(!isLoading){
    //         return data[0].code;
    //     }
    // }

    // const Click2Vote = () => {
    //     const loginInfo = LoginFunc();
    //     if (loginInfo === 'SUCCESS'){
    //         setNow(event.days[0]);
    //         setSelectedDay(event.days);
    //         resetTime();
    //         console.log("click!!")
    //     }
    // }

    const IsDisableBtn = () => {
        if(user.name === ''){
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }

    const NameChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            name: e.target.value,
        })
    }

    const PasswordChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            password: e.target.value,
        })
    }

    

    useEffect(()=> {
        IsDisableBtn();
    },[user.name]);

    return (
        <>
            <InputExplainDiv>
                <TextBlackMedium text="이름"></TextBlackMedium>
                <TextGraySmall text="실명 사용을 권장해요."></TextGraySmall>
            </InputExplainDiv>
            <InputText input={user.name} OnChange={NameChange}></InputText>
            <InputExplainDiv>
                <TextBlackMedium text="비밀번호"></TextBlackMedium>
                <TextGraySmall text="회원님만 정보를 수정하기 위해선 비밀번호가 필요해요. (선택)"></TextGraySmall>
            </InputExplainDiv>
            <InputText type="password" input={user.password} OnChange={PasswordChange}></InputText>
        </>
    )
}

export default VoteLogin;