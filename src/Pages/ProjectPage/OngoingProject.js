// OngoingProject.js
import React, { useState } from "react";
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
  const [isProjectVisible, setProjectVisible] = useState(false);
  const navigate = useNavigate();

  const handleAddProject = () => {
    setProjectVisible(true);
  };

  const handleProjectClose = () => {
    setProjectVisible(false);
  };

  const handleRowClick = () => {
    navigate("/Manage");
  };

  return (
    <AppContainer>
      <Container>
        <Title>진행 중</Title>
        <button type="button" onClick={handleAddProject}>
          +
        </button>
      </Container>

      {isProjectVisible && <Project onClose={handleProjectClose} />}

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
            <tr key={project.id} onClick={handleRowClick}>
              {" "}
              {/* 수정 */}
              <td>{project.id}</td>
              <td>{project.date}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AppContainer>
  );
}

export default OngoingProject;
