import React, { useState, createContext } from "react";
import styled from "styled-components";
import Project from "./Project";
import { useNavigate } from "react-router-dom";

const AppContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Container = styled.div`
  text-align: left;
`;

const Title = styled.text`
  font-size: 1.5rem;
  background-color: #b47e7e;
  padding: 5px;
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  tr:hover {
    background-color: #f5f5f5;
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

  // const handleEditClick = (event, project) => {
  //   event.stopPropagation();
  // };
  // const handleSaveChanges = (updatedProject) => {
  //   const projectIndex = storedProjects.findIndex(
  //     (p) => p.id === updatedProject.id
  //   );
  //   storedProjects[projectIndex] = updatedProject;
  //   localStorage.setItem("projects", JSON.stringify(storedProjects));
  // };
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

  return (
    <AppContainer>
      <Container>
        <Title>진행 중</Title>
        <button type="button" onClick={handleAddProject}>
          +
        </button>
      </Container>

      <StyledTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>기한</th>
            <th>프로젝트명</th>
            <th>프로젝트 소개</th>
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
                  X
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AppContainer>
  );
}

export default OngoingProject;
