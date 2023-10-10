import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const RightDashboardBox = styled.div`
  border-left: 1px dotted black;
  background-color: white;
  flex-basis: 50%;
`;

const RightboardBody = styled.div`
  width: 90%;
  height: 31%;
  margin: 0.3rem;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  flex: 1;
`;

const BoardTitleDiv = styled.div`
  display: flex;
  text-align: center;
  height: 30%;
`;

const BoardContentDiv = styled.div`
  text-align: center;
  height: 70%;
  width: 100%;
`;

const ContentDiv = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  height: 33%;
  background-color: white;
  min-width: 8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubTitle = styled.text`
  font-weight: 600;
  font-size: 1.5rem;
`;

const Text = styled.text`
  font-size: 1rem;
  text-decoration: underline;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  padding-left: 1rem;
`;
const GoButton = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: auto;
`;

const RightDashboard = ({projectId}) => {


  const navigate = useNavigate();

  const goToPlanPage = () => {
    navigate(`/PlanMain/${projectId}`);
  };

  const goToMakingPage = () => {
    navigate(`/MakingMain/${projectId}`);
  };

  const goToEditPage = () => {
    navigate(`/EditMain/${projectId}`);
  };

  return (
    <RightDashboardBox>
      <RightboardBody>
        <BoardTitleDiv>
          <SubTitle>기획</SubTitle>
          <GoButton onClick={goToPlanPage}>+</GoButton>
        </BoardTitleDiv>
        <BoardContentDiv>
          <ContentDiv>
            <Text>aadfaadfafasdfasdfasdfasd</Text>
          </ContentDiv>
          <ContentDiv>
            <Text>aadfa</Text>
          </ContentDiv>
          <ContentDiv>
            <Text>aadfa</Text>
          </ContentDiv>
        </BoardContentDiv>
      </RightboardBody>
      <RightboardBody>
        <BoardTitleDiv>
          <SubTitle>제작</SubTitle>
          <GoButton onClick={goToMakingPage}>+</GoButton>
        </BoardTitleDiv>
      </RightboardBody>
      <RightboardBody>
        <BoardTitleDiv>
          <SubTitle>편집</SubTitle>
          <GoButton onClick={goToEditPage}>+</GoButton>
        </BoardTitleDiv>
      </RightboardBody>
    </RightDashboardBox>
  );
};
export default RightDashboard;
