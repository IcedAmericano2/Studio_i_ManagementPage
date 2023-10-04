import React from "react";
import {useNavigate} from "react-router-dom";
import Body from "../../Components/common/Body";
import BoardPage from "../../Components/common/BoardPage";
import styled from "styled-components";

// WritingMainPage.js
const PostsButton = styled.button`
  width: 6rem;
  height: 2rem;
  margin: 1%;
  font-size: 1rem;
  top: 500rem; /* 원하는 높이로 조절 */
  right: 100rem; /* 원하는 위치로 조절 */
`;
const WritingMainPage = () => {
    const subTitle = "기획";
    const buttonContent = "등록";
    const navigate = useNavigate();
    const goToPreviousPage = () => {
        navigate(-1);
    };
    return (
        <Body>
            <BoardPage subTitle={subTitle} showTable={false} buttonContent={buttonContent} writingMainPage={true}/>
        </Body>
    );
};

export default WritingMainPage;