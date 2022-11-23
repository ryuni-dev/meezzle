import Link from 'next/link';
import styled from 'styled-components';
interface Props {
    isColor?: boolean;
}

const Button = styled.button`
    max-width: 340px;
    width: 85%;
    height: 59px;

    background: ${(props:Props) => props.isColor ? "#3278DE" : "#ffffff"};
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
    color: ${(props:Props) => props.isColor ? "#FFFFFF" : "#8D8D8D;"};
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
    color: boolean;
    Click?(): void;
}

const LinkBtn = ({text, href, color, Click}:BtnProps) => {
    return (
        <Link href={href} prefetch>
            <Button type='button' onClick={Click} isColor={color}>{text}</Button>
        </Link>
    )
}

export default LinkBtn