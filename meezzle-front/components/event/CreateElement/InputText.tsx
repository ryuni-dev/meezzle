import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 343px;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #E2E2E2;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;

    /* gray300 */

    color: #333333;
    text-indent: 15px;

    ::placeholder {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 150%;
        /* identical to box height, or 18px */
    
        letter-spacing: -0.011em;
    
        /* gray300 */
    
        color: #A5A5A5;
        text-indent: 15px;
    }
    :focus {
        outline: none;
        border-color: #3278DE;
        transition: 0.5s;
    }
`

type Props = {
    placeholder: string,
    input: string,
    OnChange(e:React.ChangeEvent<HTMLInputElement>): void
    OnKeyPress?(e: React.KeyboardEvent<HTMLInputElement>): void
}
const InputText= React.forwardRef<HTMLInputElement, Props>(({placeholder, input, OnChange, OnKeyPress}, ref) => {
    return (
        <Input placeholder={placeholder} value={input} onChange={OnChange} ref={ref} onKeyPress={OnKeyPress}></Input>
    )
})

export default InputText