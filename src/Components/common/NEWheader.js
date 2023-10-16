import React from "react";
import styled from "styled-components";
import {
  media,
  TitleLg,
  TitleMd,
  TitleSm,
  TextLg,
  TextMd,
  TextSm,
} from "../../Components/common/Font";
import { CgMenu } from "react-icons/cg";
import NEWSearchBar from "../NEWSearchBar";
import { useEffect, useState } from "react";
import StudioILogo from "../../assets/logo/studioi.png";
import Button from "./Button";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  position: fixed;
  height: 4rem;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const SpaceBetweenBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const MenuBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const SearchBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const NameBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const IconBlock = styled.div`
  height: 100%;
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const LoginButton = styled.button`
  border: none;
  outline: none;
  background: #eb3225;
  color: white;
  border-radius: 16px;
  width: 88px;
  padding: 4px;
  margin: 4px;
`;

const LogoBox = styled.img`
  margin-left: 16px;
  margin-right: 16px;
  max-width: 100%;
  width: 128px;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
  cursor: pointer; /* 포인터 커서 표시 */
  display: inline-block; /* 또는 block로 설정 */
`;

const NEWheader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const navigateToHome = () => {
    navigate("/"); // 메인 페이지로 이동합니다.
  };

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("login-token");

    if (token) {
      // 토큰이 존재하면 로그인 상태로 설정
      setIsLoggedIn(true);
      const accessToken = localStorage.getItem("login-token");
      setUserName(jwt_decode(accessToken).username);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("login-token");
    setIsLoggedIn(false);
    setUserName("");
    alert("로그아웃 완료");
  }

  return (
    <HeaderWrapper>
      <SpaceBetweenBlock>
        <MenuBlock>
          <IconBlock>
            <CgMenu />
          </IconBlock>
        </MenuBlock>
        <SearchBlock>
          <LogoBox src={StudioILogo} onClick={navigateToHome} />
          <NEWSearchBar></NEWSearchBar>
        </SearchBlock>
        <NameBlock>
          {isLoggedIn ? <TextLg> {userName} 님</TextLg> : null}
          {isLoggedIn ? (
            <StyledLink to="/">
              <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            </StyledLink>
          ) : (
            <StyledLink to="/LoginPage">
              <LoginButton>로그인</LoginButton>
            </StyledLink>
          )}
        </NameBlock>
      </SpaceBetweenBlock>
    </HeaderWrapper>
  );
};

export default NEWheader;
