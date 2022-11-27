import styled from "styled-components";
import Toggle from "./Toggle";

type Props = {
    time: {
        times: {
            time: number;
            attendee: string[];
        }[];
        max: number;
    };
};

const MaximumTime: React.FC<Props> = ({ time }: Props) => {
    return (
        <>
            <P>
                최대 {time.max}명이 같이 모일 수 있어요!
                <span style={{ lineHeight: "170%" }}>
                    <br />
                </span>
                {time.max}명이 가능한 시간은 다음과 같아요.
            </P>
            <ToggleContainer>
                <Toggle></Toggle>
                <Toggle></Toggle>
                <Toggle></Toggle>
            </ToggleContainer>
        </>
    );
};

export default MaximumTime;

const P = styled.p`
    margin-left: 20px;
    font-size: 14px;
    font-family: "Pretendard";
`;

const ToggleContainer = styled.div`
    margin-left: 20px;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 500;
`;
