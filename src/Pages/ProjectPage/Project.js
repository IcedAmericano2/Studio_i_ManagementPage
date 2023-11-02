import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import projectApi from "../../api/projectApi";
import axios from "axios";

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
  width: 120%;
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
function Project() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [teamMemberCount, setTeamMemberCount] = useState("");
  const [teamMemberEmails, setTeamMemberEmails] = useState([]);
  const [emailsRegisteredCheck, setEmailsRegisteredCheck] = useState([]);

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const notRegistered = emailsRegisteredCheck.filter(check => !check);
      if (notRegistered.length > 0) {
        alert("인증되지 않은 팀원이 있습니다.\n모든 팀원의 이메일을 인증해주세요.");
        return;
      }
      // 유효성 검사
      if (!projectName.trim()) {
        alert("프로젝트명을 입력해주세요.");
        return;
      }

      if (!projectDetails.trim()) {
        alert("프로젝트 세부 내용을 입력해주세요.");
        return;
      }

      const emptyEmails = teamMemberEmails.filter(email => !email.trim());
      if (emptyEmails.length > 0) {
        alert("모든 팀원의 이메일을 입력해주세요.");
        return;
      }
      // 1. 각 이메일 주소에 해당하는 유저 ID를 가져옵니다.
      const userIdsPromises = teamMemberEmails.map(async (email) => {
        const response = await axios.get(`/user-service/response_userByEmail/${email}`);
        return response.data.id; // UserResponse 객체에서 id를 가져옵니다.
      });

      const memberIdList = await Promise.all(userIdsPromises);
      const newProject = {
        name: projectName,
        description: projectDetails,
        startDate: `${startDate}`,
        finishDate: `${endDate}`,
        memberIdList: memberIdList,
      };
      const response = await projectApi.createProject(newProject);
      // 서버에서 실패 응답을 보냈는지 확인
      if (response.data && response.data.success === false) {
        if(response.data.code === 7000){
          alert("로그인을 먼저 진행시켜 주시길 바랍니다.");
          navigate("/LoginPage");
        }else if(response.data.code === 7001){
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          sessionStorage.removeItem("login-token");
          delete axios.defaults.headers.common['Authorization'];
          navigate("/LoginPage");
        }
        return;
      }
      alert("프로젝트를 생성하였습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
      alert("프로젝트 생성에 실패했습니다."); // 에러 알림 메시지
    }
  };
  const handleTeamMemberChange = (index, email) => {
    const updatedEmails = [...teamMemberEmails];
    updatedEmails[index] = email;
    setTeamMemberEmails(updatedEmails);
  };
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };
  const handleEmailRegistration  = async(index, email) => {
    if (!validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await axios.get(`/user-service/response_userByEmail/${email}`);
      console.log(response);
      console.log(response.data);
      //이 api 지금 아무것도 안뱉어내서 에러처리 못함. 등록되지않은 email도 잘 등록되었습니다. 라는 문구가 뜰수밖에없음.
      alert("잘 등록되었습니다.");
      const updatedRegistered = [...emailsRegisteredCheck];
      updatedRegistered[index] = true;
      setEmailsRegisteredCheck(updatedRegistered);
    } catch (error) {
      console.error("Error during email registration: ", error);
      if (error.response && error.response.status === 500) {
        alert("존재하지 않는 이메일입니다.");
      } else {
        // 다른 종류의 오류가 발생한 경우
        alert("이메일 인증에 실패했습니다.");
      }
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
          <label>팀원 수&nbsp;: </label>
          <select
            value={teamMemberCount}
            onChange={(e) => {
              setTeamMemberCount(Number(e.target.value));
              setTeamMemberEmails(new Array(Number(e.target.value)).fill(""));
              setEmailsRegisteredCheck(new Array(Number(e.target.value)).fill(false));
            }}
          >
            <option value="" disabled>선택</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        {Array.from({ length: teamMemberCount }).map((_, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <label>팀원 {index + 1} : &nbsp;</label>
            <StyledInput
              type="email"
              value={teamMemberEmails[index] || ""}
              placeholder="팀원 이메일"
              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
            />
            {emailsRegisteredCheck[index] ? (
                <span style={{ color: "red", marginLeft: '10px', fontWeight: 'bold' }}>인증 완료</span>
            ) : (
                <StyledButton
                    onClick={() => handleEmailRegistration(index, teamMemberEmails[index])}
                >
                  인증
                </StyledButton>
            )}
          </div>
        ))}
        <div>
          <label>프로젝트명&nbsp;: </label>
          <StyledInput
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
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
