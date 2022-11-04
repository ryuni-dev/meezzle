import type { NextPage } from "next";
import { GlobalStyle } from "../styles/Globalstyle";
import Navbar from "../components/common/Navbar";
import LandingPageFooter from "../components/landingPage/beforeLogin/LandingPageFooter";
import LandingPageIntro from "../components/landingPage/beforeLogin/LandingPageIntro";

import { useRecoilState } from "recoil";
import { LoginState } from "../components/states/states";
import LandingPageSection from "../components/landingPage/afterLogin/LandingPageSection";

const Home: NextPage = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      {!isLoggedIn && <LandingPageIntro />}
      {!isLoggedIn && <LandingPageFooter />}
      <LandingPageSection />
    </>
  );
};

export default Home;
