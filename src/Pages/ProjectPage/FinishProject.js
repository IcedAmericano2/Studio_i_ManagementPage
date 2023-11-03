import React, { useEffect, useState } from "react";
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
import projectApi from "../../api/projectApi";
import axios from "axios";

const AppContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Container = styled.div`
  text-align: left;
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
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const LabelArea = styled.div`
  background-color: #363636;
  border-radius: 32px;
  width: 128px;
  text-align: center;
  color: white;
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

function FinishProject() {
  const [projects, setProjects] = useState([]);

  const refresh = () => {
    // Use setTimeout for a simple refresh delay, could be replaced with state-based re-rendering if needed
    setTimeout(function () {
      window.location.reload();
    }, 100);
  };

  const handleDeleteClick = async (e, projectId) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("프로젝트를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const response = await projectApi.deleteProject(projectId);
      if (response.data && response.data.success) {
        // If deletion is successful, filter out the deleted project and update the state
        const updatedProjects = projects.filter(
          (project) => project.projectId !== projectId
        );
        setProjects(updatedProjects);
        alert("프로젝트가 삭제 처리 되었습니다.");
      } else {
        // Handle the case where the API did not return a success message
        alert("프로젝트 삭제에 실패했습니다. " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting the project:", error);
      alert("프로젝트 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getProjectList();
        if (response.data && response.data.success === false) {
          if (response.data.code === 7000) {
            //OngoingProject에서 해줌.
          } else if (response.data.code === 7001) {
            sessionStorage.removeItem("login-token");
            delete axios.defaults.headers.common["Authorization"];
          }
          return;
        }
        const checkedProjects = response.data.list.filter(
          (item) => item.isFinished === true
        );

        setProjects(checkedProjects);
      } catch (error) {
        console.error("Error fetching the projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <AppContainer>
      <Container>
        <LabelArea>
          <TitleSm>완료</TitleSm>
        </LabelArea>
      </Container>

      <StyledTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>기한</th>
            <th>프로젝트명</th>
            <th>프로젝트 소개</th>
            <th>기타 정보</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.projectId}>
              {/*<td>{index + 1}</td>*/}
              <td>{project.projectId}</td>
              <td>
                {project.startDate}~{project.finishDate}
              </td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <DeleteButton
                  onClick={(e) => handleDeleteClick(e, project.projectId)}
                >
                  삭제
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AppContainer>
  );
}
export default FinishProject;
