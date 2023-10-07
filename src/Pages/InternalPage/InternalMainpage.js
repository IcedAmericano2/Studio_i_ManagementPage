import React from "react";
import Header from "../../Components/common/header";
import Dashboard from "./Dashboard";
import RecentArticle from "./RecentArticle";
import RecentProject from "./RecentProject";
import styled from "styled-components";
import Body from "../../Components/common/Body";

const MainBody = styled.div`
  /* max-width : 1184px; */
  //이거 가운데로 놓기 ~
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  /* max-width: 100%; */
  flex-wrap: wrap;
`;

const InternalMainpage = () => {
  const InternalMainpageContent = () => {
    return (
      <>
        <MainBody>
          <Wrapper>
            <Dashboard></Dashboard>
          </Wrapper>
          <Wrapper>
            <RecentArticle />
            <RecentProject />
          </Wrapper>
        </MainBody>
      </>
    );
  };

  return (
    <Body>
      <InternalMainpageContent />
    </Body>
  );
};
export default InternalMainpage;
