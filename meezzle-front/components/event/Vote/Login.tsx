import styled from 'styled-components';
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
    return (
        <>
        <InputExplainDiv>
                <TextBlackMedium text="이름"></TextBlackMedium>
                <TextGraySmall text="실명 사용을 권장해요."></TextGraySmall>
            </InputExplainDiv>
            <InputText></InputText>
            <InputExplainDiv>
                <TextBlackMedium text="비밀번호"></TextBlackMedium>
                <TextGraySmall text="회원님만 정보를 수정하기 위해선 비밀번호가 필요해요. (선택)"></TextGraySmall>
            </InputExplainDiv>
            <InputText type="password"></InputText>
        </>
    )
}

export default VoteLogin;