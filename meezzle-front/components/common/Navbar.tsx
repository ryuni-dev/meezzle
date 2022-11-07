import React from "react";
import styled from "styled-components";
import logo from "../../public/assets/logo1.svg";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
    children: JSX.Element | JSX.Element[];
};

const Navbar = ({ children }: NavbarProps) => {
    return (
        <Nav>
            <LogoContainer>
                <Link href={{ pathname: "/" }} passHref>
                    <Image src={logo} alt="logo" />
                </Link>
            </LogoContainer>
            <ContentContainer>{children}</ContentContainer>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    margin-top: 40px;
    height: 40px;
    margin-bottom: 2px;
    line-height: 42px;
    margin-bottom: 22px;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    & span {
        vertical-align: middle;
    }
`;

const LogoContainer = styled.div`
    float: left;
    margin-left: 21px;
    width: 119px;
    height: 48px;
    & span {
        cursor: pointer;
    }
`;

const ContentContainer = styled.div`
    float: right;
    vertical-align: middle;
    margin-right: 26px;
    position: relative;
    & > span {
        line-height: 44px;
        cursor: pointer;
    }
`;
