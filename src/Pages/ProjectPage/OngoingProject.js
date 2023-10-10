import React, { useState } from "react";
import styled from "styled-components";
import Project from "./Project";
import { useNavigate } from "react-router-dom";
import {
  media,
  TitleLg,
  TitleMd,
  TitleSm,
  TextLg,
  TextMd,
  TextSm,
} from "../../Components/common/Font";

const AppContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Container = styled.div`
  text-align: left;
`;

const DeleteButton = styled.button`
  background-color: white;
  border: 1px solid white;
  color: red;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
const CompleteButton = styled.button`
  background-color: white;
  border: 1px solid white;
  color: green;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
const StyledTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 16px;

  th,
  td {
    padding: 15px;
    text-align: center;
  }

  th:last-child {
    display: flex;
  }

  tbody tr {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const LabelArea = styled.div`
  width: 128px;
  background: #eb3225;
  border-radius: 32px;
  text-align: center;
  color: white;
`;

const CreateButton = styled.button`
  background-color: #eb3225;
  border-radius: 32px;
  border: none;
  outline: none;
  color: white;
  padding: 2px 16px;
  margin: 4px;

  &:hover {
    background-color: #363636;
  }
`;

function OngoingProject() {
  const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  const navigate = useNavigate();

  const handleAddProject = () => {
    navigate("/Project"); // 새로운 프로젝트 추가 페이지로 이동
  };

  const handleRowClick = (projectId) => {
    navigate(`/Manage/${projectId}`);
  };

  const handleDeleteClick = (event, projectId) => {
    event.stopPropagation();
    const confirmation = window.confirm("정말 삭제하겠습니까?");
    if (confirmation) {
      const updatedProjects = storedProjects.filter(
        (project) => project.id !== projectId
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };
  const handleCompleteClick = (event, project) => {
    event.stopPropagation();
    const confirmation = window.confirm("이 프로젝트를 완료하였습니까?");
    if (confirmation) {
      const updatedProjects = storedProjects.filter((p) => p.id !== project.id);
      const completedProjects = JSON.parse(
        localStorage.getItem("completedProjects") || "[]"
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      localStorage.setItem(
        "completedProjects",
        JSON.stringify([...completedProjects, project])
      );
    }
  };

  return (
    <AppContainer>
      <Container>
        <LabelArea>
          <TitleSm>진행 중</TitleSm>
        </LabelArea>
      </Container>

      <StyledTable>
        <thead>
          <tr>
            <th>
              <TextMd>번호</TextMd>
            </th>
            <th>
              <TextMd>기한</TextMd>
            </th>
            <th>
              <TextMd>프로젝트명</TextMd>
            </th>
            <th>
              <TextMd>프로젝트 소개</TextMd>
            </th>
            <th>
              <CreateButton type="button" onClick={handleAddProject}>
                <TextLg>생성</TextLg>
              </CreateButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {storedProjects.map((project) => (
            <tr key={project.id} onClick={() => handleRowClick(project.id)}>
              <td>{project.id}</td>
              <td>{project.date}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <DeleteButton onClick={(e) => handleDeleteClick(e, project.id)}>
                  삭제
                </DeleteButton>
                <CompleteButton
                  onClick={(e) => handleCompleteClick(e, project)}
                >
                  완료
                </CompleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AppContainer>
  );
}

export default OngoingProject;
