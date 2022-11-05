import styled from 'styled-components';

const Input = styled.input`
    width: 343px;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #E2E2E2;

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
    }
`

type Props = {
    text: string
}
const InputText= ({text}: Props) => {
    return (
        <Input placeholder={text}></Input>
    )
}

export default InputText