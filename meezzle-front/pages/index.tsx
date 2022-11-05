import type { NextPage } from "next";
import { GlobalStyle } from "../styles/Globalstyle";
import Navbar from "../components/common/Navbar";
import LandingPageFooter from "../components/landingPage/beforeLogin/LandingPageFooter";
import LandingPageIntro from "../components/landingPage/beforeLogin/LandingPageIntro";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { LoginState, useLogin } from "../components/states/states";
import LandingPageSection from "../components/landingPage/afterLogin/LandingPageSection";
import { useState, useRef, useEffect } from "react";
import profile from "../public/assets/profile.png";
import { LoginBox } from "../styled-components/StyledLoginBox";

const Home: NextPage = ({}) => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useLogin();

  // 프로필 클릭 시 메뉴 나오기
  const handleCilck = () => {
    setVisible(visible ? false : true);
  };

  // 임시 로그인 / 로그아웃 상태 변경
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <Image src={profile} alt="profile" onClick={handleCilck} />
        {visible && (
          <LoginBox ref={menuRef} onClick={handleLogin}>
            {!isLoggedIn ? "로그인" : "로그아웃"}
          </LoginBox>
        )}
      </Navbar>
      {!isLoggedIn && <LandingPageIntro />}
      {!isLoggedIn && <LandingPageFooter />}
      {isLoggedIn && <LandingPageSection />}
    </>
  );
};

export default Home;
