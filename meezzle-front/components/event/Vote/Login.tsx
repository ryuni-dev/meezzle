import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { btnDisable } from "../../../states/eventCreate";
import { participant } from "../../../states/eventVote";
import TextBlackMedium from "../../common/TextBlackMedium";
import TextGraySmall from "../../common/TextGraySmall";
import InputText from "../CreateElement/InputText";

const InputExplainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: 7%;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const VoteLogin = () => {
    const [user, setUser] = useRecoilState(participant);
    const [disable, setDisable] = useRecoilState(btnDisable);

    const IsDisableBtn = () => {
        if (user.name === "") {
            setDisable(true);
        } else {
            setDisable(false);
        }
    };

    const NameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            name: e.target.value,
        });
    };

    const PasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            password: e.target.value,
        });
    };

    useEffect(() => {
        IsDisableBtn();
    }, [user.name]);

    return (
        <div style={{ marginBottom: "180px" }}>
            <InputExplainDiv>
                <TextBlackMedium text="이름"></TextBlackMedium>
                <TextGraySmall text="실명 사용을 권장해요."></TextGraySmall>
            </InputExplainDiv>
            <InputText input={user.name} OnChange={NameChange}></InputText>
            <InputExplainDiv>
                <TextBlackMedium text="비밀번호"></TextBlackMedium>
                <TextGraySmall text="회원님만 정보를 수정하기 위해선 비밀번호가 필요해요. (선택)"></TextGraySmall>
            </InputExplainDiv>
            <InputText
                type="password"
                input={user.password}
                OnChange={PasswordChange}
            ></InputText>
        </div>
    );
};

export default VoteLogin;
