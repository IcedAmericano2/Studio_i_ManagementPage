import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import projectApi from "../../api/projectApi";

const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f7f7f7;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  width: 120%;
  min-height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: -20px;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
function Project() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [teamLeader, setTeamLeader] = useState("a"); // Default value for dropdown
  const [teamMembers, setTeamMembers] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    const newProject = {
      date: `${startDate} ~ ${endDate}`,
      name: projectName,
      description: projectDetails,
      leader: teamLeader,
      members: teamMembers,
    };
    try {
      await projectApi.createProject(newProject);
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
      alert("프로젝트 생성에 실패했습니다."); // 에러 알림 메시지
    }
  };

  return (
    <TotalContainer>
      <h2>Create Project</h2>
      <ProjectContainer>
        <div>
          <label>시작&nbsp;&nbsp;날짜&nbsp;&nbsp;: </label>
          <StyledInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>종료&nbsp;&nbsp;날짜&nbsp;&nbsp;: </label>
          <StyledInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>프로젝트명&nbsp;: </label>
          <StyledInput
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label>팀장&nbsp;: </label>
          <select
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
          ></select>
        </div>
        <div>
          <label>팀원&nbsp;: </label>
          <StyledInput
            type="text"
            value={teamMembers}
            placeholder="팀원 입력 (comma separated)"
            onChange={(e) => setTeamMembers(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label className="details">프로젝트 세부 내용:</label>
          </div>
          <StyledTextArea
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          ></StyledTextArea>
        </div>
        <div>
          <StyledButton className="check" onClick={handleSave}>
            Save
          </StyledButton>
          <StyledButton className="check" onClick={() => navigate("/")}>
            Cancel
          </StyledButton>
        </div>
      </ProjectContainer>
    </TotalContainer>
  );
}

export default Project;
