import styled from 'styled-components';

const InputLarge = styled.textarea`
    width: 343px;
    height: 153px;
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
    line-height: 40px;

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
        line-height: 40px;
    }
    :focus {
        outline: none;
    }
    margin-top: 8px;
`
type Props = {
    placeholder: string,
    input: string,
    OnChange(e:React.FormEvent<HTMLTextAreaElement>): void
}
const InputTextLarge= ({placeholder, input, OnChange}: Props) => {
    return (
        <InputLarge placeholder={placeholder} value={input} onChange={OnChange}></InputLarge>
    )
}

export default InputTextLarge