import Link from 'next/link';
import styled from 'styled-components';
interface Props {
    disable: boolean;
}

const Button = styled.button`
    max-width: 340px;
    width: 85%;
    height: 59px;

    background: #3278DE;
    border-radius: 15px;
    border: 0;
    
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    /* identical to box height, or 22px */

    letter-spacing: -0.011em;

    /* white */
    color: #FFFFFF;
    // margin: 1rem;
    margin-right: 8%;

    // &:hover {
    //     background: #97B0D6
    //     transition: color 0.3;  
    // }
`
interface BtnProps {
    text: string;
    href: string;
    Click?(): void;
}

const LinkBtn = ({text, href, Click}:BtnProps) => {
    return (
        <Link href={href} prefetch>
            <Button type='button' onClick={Click}>{text}</Button>
        </Link>
    )
}

export default LinkBtn