import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { btnDisable } from "../../states/eventCreate";

interface Props {
    disable: boolean;
    isColor: boolean | true;
}

const Button = styled.button`
    max-width: 340px;
    width: 100%;
    height: 59px;

    background: ${(props: Props) => {
        if (props.isColor) {
            if (props.disable) {
                return "#E2E2E2";
            } else {
                return "#3278DE";
            }
        } else {
            return "#ffffff";
        }
    }};

    border-radius: 15px;
    border: 0;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    /* identical to box height, or 22px */

    letter-spacing: -0.011em;
    cursor: pointer;

    /* white */
    color: ${(props: Props) => {
        if (props.isColor) {
            if (props.disable) {
                return "#8D8D8D";
            } else {
                return "#ffffff";
            }
        } else {
            return "#8D8D8D";
        }
    }};

    ${(props: Props) => (props.isColor ? "#FFFFFF" : "#8D8D8D;")};
    // margin: 1rem;
    // margin-right: 8%;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;
    // }
`;
interface BtnProps {
    text: string;
    useDisable: boolean;
    color: boolean;
    Click?(): void;
}

const Btn = ({ text, useDisable, color, Click }: BtnProps) => {
    const [isDisable, setIsDisable] = useRecoilState(btnDisable);
    if (!useDisable) {
        setIsDisable(false);
    }

    return (
        <Button
            type="button"
            disable={isDisable}
            disabled={isDisable}
            onClick={Click}
            isColor={color}
        >
            {text}
        </Button>
    );
};

export default Btn;
