import React from "react";
import styled from "styled-components";

import { FaRegComments } from "react-icons/fa";
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
import projectApi from "../../api/projectApi";
import Modal from "react-modal";
import ChatModal from "./ChatModal";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

const ChatButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    color: #eb3225;
  }
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
  &:hover {
    background-color: black;
  }
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

Modal.setAppElement("#root"); // 모달을 렌더링할 때 root 요소 설정

const customStyles = {
  content: {
    top: "20%",
    left: "83%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const NEWheader = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [myProjects, setMyProjects] = useState([]);

  const location = useLocation();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const { projectId } = location.state || {};

  const handleProjectClick = (projectId) => {
    navigate(`/manage/${projectId}`);
  };

  const openModal = () => {
    setIsOpen(true);
    fetchMyProjects();
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openChat = () => {
    setChatIsOpen(true);
  };
  const closeChat = () => {
    setChatIsOpen(false);
  };

  const fetchMyProjects = async () => {
    try {
      const response = await projectApi.getMyProjects();
      setMyProjects(response.data.list);
    } catch (error) {
      console.error("프로젝트를 가져오는 중 에러가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("login-token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwt_decode(token);
      setUserName(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("login-token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    setUserName("");
    alert("로그아웃 완료");
    navigate("/");
  };

  return (
    <>
      <HeaderWrapper>
        <SpaceBetweenBlock>
          <MenuBlock>
            <IconBlock>
              <CgMenu />
            </IconBlock>
          </MenuBlock>
          <SearchBlock>
            <LogoBox src={StudioILogo} onClick={() => navigate("/")} />
            <NEWSearchBar />
          </SearchBlock>
          <NameBlock>
            {isLoggedIn ? (
              <>
                <TextLg onClick={openModal}>{userName}님</TextLg>
                <StyledLink to="/LoginPage">
                  <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
                </StyledLink>
                <ChatButton onClick={openChat}>
                  <FaRegComments />
                </ChatButton>
              </>
            ) : (
              <StyledLink to="/LoginPage">
                <LoginButton>로그인</LoginButton>
              </StyledLink>
            )}
          </NameBlock>
        </SpaceBetweenBlock>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="My Projects Modal"
        >
          <h2>내 프로젝트</h2>
          {myProjects.length ? (
            myProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project.projectId)}
                style={{ cursor: "pointer" }}
              >
                {project.projectId}. {project.name}
              </div>
            ))
          ) : (
            <p>프로젝트가 없습니다.</p>
          )}
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </HeaderWrapper>
      <ChatModal isOpen={chatIsOpen} onRequestClose={closeChat} />
    </>
  );
};

export default NEWheader;
