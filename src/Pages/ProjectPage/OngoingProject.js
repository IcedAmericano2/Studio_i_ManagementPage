import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TitleSm, TextLg, TextMd } from "../../Components/common/Font";
import projectApi from "../../api/projectApi";

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
  background-color: #363636;
  border-radius: 32px;
  border: none;
  outline: none;
  color: white;
  padding: 2px 16px;
  margin: 4px;

  &:hover {
    background-color: black;
  }
`;
const CompleteButton = styled.button`
  background-color: #363636;
  border-radius: 32px;
  border: none;
  outline: none;
  color: white;
  padding: 2px 16px;
  margin: 4px;

  &:hover {
    background-color: black;
  }
`;
const StyledTable = styled.table`
  width: 100%;
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
    background-color: #ffffff;
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
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjectList();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching the projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate("/Project");
  };
  const handleRowClick = (projectId) => {
    navigate(`/Manage/${projectId}`);
  };

  const renumberProjects = (projects) => {
    return projects.map((project, index) => {
      return {
        ...project,
        id: index + 1,
      };
    });
  };

  const handleDeleteClick = async (e, projectId) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("프로젝트를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await projectApi.deleteProject(projectId);
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error deleting the project:", error);
      alert("프로젝트 삭제에 실패했습니다."); // 에러 알림 메시지 추가
    }
  };

  const handleCompleteClick = async (projectId) => {
    try {
      const updatedProject = projects.find(
        (project) => project.id === projectId
      );
      updatedProject.status = "Completed";
      await projectApi.updateProject(projectId, updatedProject);
      const updatedProjects = projects.map((project) =>
        project.id === projectId ? updatedProject : project
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error marking the project as complete:", error);
      alert("프로젝트 완료 처리에 실패했습니다."); // 에러 알림 메시지 추가
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
          {projects.map((project) => (
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
                  onClick={(e) => handleCompleteClick(e, project.id)}
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
