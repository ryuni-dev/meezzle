import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 85vw;
    max-width: 340px;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #E2E2E2;
    margin-top: 5px;
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
    type?: string,
    placeholder?: string,
    input?: string,
    OnChange?(e:React.ChangeEvent<HTMLInputElement>): void
    OnKeyPress?(e: React.KeyboardEvent<HTMLInputElement>): void
}
const InputText = React.forwardRef<HTMLInputElement, Props>(({type, placeholder, input, OnChange, OnKeyPress}, ref) => {
    return (
        <Input 
            type={type} 
            placeholder={placeholder} 
            value={input} 
            onChange={OnChange} 
            onKeyPress={OnKeyPress} 
            ref={ref}
        ></Input>
    )
})
InputText.displayName = "InputText";

export default InputText