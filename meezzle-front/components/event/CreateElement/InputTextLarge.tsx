import React from "react";
import styled from "styled-components";

const InputLarge = styled.textarea`
    width: 90vw;
    max-width: 340px;
    height: 153px;
    border-radius: 10px;
    border: 1px solid #e2e2e2;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    // line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;

    /* gray300 */

    color: #333333;
    // text-indent: 15px;
    line-height: 1.5;
    padding-top: 11px;
    padding-left: 15px;
    padding-right: 15px;

    ::placeholder {
        font-family: "Pretendard";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        // line-height: 150%;
        /* identical to box height, or 18px */

        letter-spacing: -0.011em;

        /* gray300 */

        color: #a5a5a5;
        // text-indent: 15px;
    }
    :focus {
        outline: none;
        border-color: #3278de;
        transition: 0.5s;
    }
    margin-top: 8px;
`;
type Props = {
    placeholder: string;
    input: string;
    OnChange(e: React.FormEvent<HTMLTextAreaElement>): void;
};

const InputTextLarge = ({ placeholder, input, OnChange }: Props) => {
    return (
        <InputLarge placeholder={placeholder} onChange={OnChange}>{input}</InputLarge>
    );
};

export default InputTextLarge;
