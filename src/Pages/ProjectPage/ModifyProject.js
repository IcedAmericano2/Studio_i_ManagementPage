import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import projectApi from "../../api/projectApi";
import axios from "axios";

// Styled components 정의
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
  padding: 30px;
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
  width: 100%;
  min-height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 20px;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

function ModifyProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // 프로젝트 정보와 팀원 이메일 상태를 선언합니다.
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [teamMemberEmails, setTeamMemberEmails] = useState([]);
  const [emailsRegisteredCheck, setEmailsRegisteredCheck] = useState([]);

  // 프로젝트 상세 정보를 가져오는 함수
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectApi.getProjectDetails(projectId);
        const project = response.data;
        setStartDate(project.startDate);
        setEndDate(project.finishDate);
        setProjectName(project.name);
        setProjectDetails(project.description);
        // TODO: 프로젝트의 팀원 ID를 이용하여 이메일을 가져오는 로직 구현 필요
      } catch (error) {
        console.error(
          "프로젝트 정보를 불러오는 중 오류가 발생했습니다:",
          error
        );
      }
    };

    fetchProject();
  }, [projectId]);
  const handleEmailRegistration = async (index, email) => {
    if (!validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      // 서버에 이메일 인증 요청을 보내고, 응답을 처리합니다.
      const response = await axios.get(
        `/user-service/response_userByEmail/${email}`
      );
      if (response.data) {
        const updatedRegistered = [...emailsRegisteredCheck];
        updatedRegistered[index] = true;
        setEmailsRegisteredCheck(updatedRegistered);
        alert("이메일이 인증되었습니다.");
      } else {
        alert("이메일 인증에 실패했습니다.");
      }
    } catch (error) {
      alert("이메일 인증 중 오류가 발생했습니다.");
    }
  };

  // 프로젝트 정보를 저장하는 함수
  const handleSaveChanges = async () => {
    try {
      // 여기서는 예시로 teamMemberEmails 자체를 memberIdList로 사용합니다.
      // 실제로는 이메일을 통해 사용자 ID를 조회하는 로직이 필요합니다.
      const updatedProject = {
        name: projectName,
        description: projectDetails,
        startDate: startDate,
        finishDate: endDate,
        memberIdList: teamMemberEmails,
      };

      const response = await projectApi.updateProject(
        projectId,
        updatedProject
      );
      if (response.data.success) {
        alert("프로젝트가 성공적으로 수정되었습니다.");
        navigate("/"); // 변경사항을 보기 위해 메인 페이지로 이동
      } else {
        throw new Error(response.data.message || "프로젝트 수정 실패");
      }
    } catch (error) {
      console.error("프로젝트 수정 중 오류가 발생했습니다:", error);
      alert(error.message || "프로젝트 수정 중 오류가 발생했습니다.");
    }
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // 팀원 이메일 변경 핸들러
  const handleTeamMemberChange = (index, email) => {
    const updatedEmails = [...teamMemberEmails];
    updatedEmails[index] = email;
    setTeamMemberEmails(updatedEmails);

    // 이메일을 변경할 때마다 인증 상태를 초기화합니다.
    const updatedRegistered = [...emailsRegisteredCheck];
    updatedRegistered[index] = false;
    setEmailsRegisteredCheck(updatedRegistered);
  };

  return (
    <TotalContainer>
      <h2>프로젝트 수정</h2>
      <ProjectContainer>
        <div>
          <label>시작 날짜 : </label>
          <StyledInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>종료 날짜 : </label>
          <StyledInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>프로젝트명 : </label>
          <StyledInput
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label>프로젝트 세부 내용:</label>
          <StyledTextArea
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </div>
        {teamMemberEmails.map((email, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <label>팀원 {index + 1} 이메일: </label>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
            />
            {emailsRegisteredCheck[index] ? (
              <span style={{ color: "green", marginLeft: "10px" }}>
                인증 완료
              </span>
            ) : (
              <StyledButton
                onClick={() => handleEmailRegistration(index, email)}
              >
                인증
              </StyledButton>
            )}
          </div>
        ))}
        <div>
          <StyledButton onClick={handleSaveChanges}>
            변경 사항 저장
          </StyledButton>
          <StyledButton onClick={() => navigate("/")}>취소</StyledButton>
        </div>
      </ProjectContainer>
    </TotalContainer>
  );
}

export default ModifyProject;
