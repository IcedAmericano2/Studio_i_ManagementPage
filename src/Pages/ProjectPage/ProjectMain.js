import  React from "react";
import Body from "../../Components/common/Body";
import FinishProject from "./FinishProject";
import OngoingProject from "./OngoingProject";
import styled from "styled-components";

const MainBody = styled.div`
  /* max-width : 1184px; */
  //이거 가운데로 놓기 ~
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.text`
  font-size: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  /* max-width: 100%; */
  flex-wrap: wrap; /* 화면 크기가 작아지면 아래로 내려갈 수 있도록 설정 */
`;

const Container = styled.div`
  background-color: white;
`;

const ProjectMain = () => {
  const ProjectMainContent = () => {
    return (
      <>
        <MainBody>
          <Container>
            <OngoingProject />
            <FinishProject />
          </Container>
        </MainBody>
      </>
    );
  };

  return (
    <Body>
      <Title>DashBoard</Title>
      <ProjectMainContent />
    </Body>
  );
};
export default ProjectMain;
