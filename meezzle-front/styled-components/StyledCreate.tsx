import styled from 'styled-components';

export const H2 = styled.h2`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;

    letter-spacing: -0.011em;

    /* gray900 */
    color: #333333;
    margin: 0px;
`
export const GrayText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    letter-spacing: -0.011em;

    color: #B0B4B8;
`

export const Input = styled.input`
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
export const InputLarge = styled.textarea`
    width: 343px;
    height: 153px;
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
        line-height: 40px;
    }
    :focus {
        outline: none;
    }
    margin-top: 8px;
`

export const InputDate = styled.input`
    width: 160px;
    height: 48px;
    left: 16px;
    top: 161px;

    background: #FFFFFF;
    /* gray100 */

    border: 1px solid #E2E2E2;
    border-radius: 10px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    /* identical to box height, or 20px */

    letter-spacing: -0.011em;
    text-indent: 15px;


    /* gray900 */
    ::-webkit-datetime-edit-text,
    ::-webkit-datetime-edit-year-field,
    ::-webkit-datetime-edit-month-field,
    ::-webkit-datetime-edit-day-field {
        color: #333333;
    }
    :focus {
        outline: none;
    }
    ::-webkit-calendar-picker-indicator,
    ::-webkit-inner-spin-button {
        // display: none;
        // appearance: none;
        // color: #FFFFFF
        

    }
`
export const DateSelectText = styled.text`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    letter-spacing: -0.011em;

    /* gray600 */

    color: #626262;
    margin-left: 6px;
    align-items: center;
    text-align: center;
    padding: 16px;
    margin-right: 6px;
`

export const DateContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 343px;
    height: 48px;
    margin-top: 9px;
`
