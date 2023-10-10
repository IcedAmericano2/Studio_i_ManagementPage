// BoardPage.js
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Table from "./Table";
import WritingPage from "../../WritingPage/WritingPage";
import ViewWritingPage from "../../WritingPage/ViewWritingPage";
import { useProject } from '../../AboutUs/Context';

const MainBody = styled.div`
  //max-width : 1184px;   
  //이거 가운데로 놓기 ~
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: gray;
  height: 100vh;
`;

const DashboardDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80%;
  height: 82vh;
  background-color: white;
`;

const BoardTitleDiv = styled.div`
  display: flex;
  text-align: center;
  min-height: 2rem;
  height: 4vh;
  background-color: gray;
  padding-bottom: 0.3rem;
`;

const DashboardBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40rem;
  height: 80vh;
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1rem;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: auto 0;
  cursor: pointer;
`;
const SubTitle = styled.div`
  font-size: 0.875rem;
  margin: auto 0;
  cursor: pointer;
`;

////////////////버튼/////////////////////
const WritingButton = styled.button`
  width: 6rem;
  height: 2rem;
  margin: 1%;
  font-size: 1rem;
`;




const BoardPage = ({ subTitle , tableData , writingButtonContent }) => {
    const navigate = useNavigate();
    const [showTable, setShowTable] = useState(true);
    const [showWritingPage, setShowWritingPage] = useState(false);
    const [showViewWritingPage, setShowViewWritingPage] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState("");
    const { projectIdData } = useProject();

    const goToHomePage = () => {
        navigate("/");
    };

    const goToProjectPage = () => {
        console.log("자 project 눌렀다? : " + projectIdData);
        navigate(`/manage/${projectIdData}`);
    };

    const goToWritingPage = () => {
        setShowTable(false);
        setShowWritingPage(true);
        setShowViewWritingPage(false);
    };
    const handleRowClick = (rowId) => {
        setSelectedRowId(rowId);
        setShowTable(false);
        setShowWritingPage(false);
        setShowViewWritingPage(true);
    };

    // WritingMainPage 컴포넌트가 마운트될 때 goToWritingMainPage 함수를 자동으로 호출
    return (
        <>
            <MainBody>
                <DashboardDiv>
                    <BoardTitleDiv>
                        <Title onClick={goToHomePage}>
                            HOME
                        </Title>
                        <SubTitle onClick={goToProjectPage}>
                            >Project
                        </SubTitle>
                        <SubTitle>
                            >{subTitle}
                        </SubTitle>
                    </BoardTitleDiv>
                    <DashboardBox>
                        {showTable ? (
                            <>
                                <Table tableData={tableData} onRowClick={handleRowClick}/>
                                <WritingButton onClick={goToWritingPage}>{writingButtonContent}</WritingButton>
                            </>
                        ) :  showWritingPage ? (
                            <WritingPage>
                            </WritingPage>
                        ) : showViewWritingPage ? (
                            <ViewWritingPage selectedRowId = {selectedRowId}>
                            </ViewWritingPage>
                        ) : null }
                        {/*{selectedItem !== null && (*/}
                        {/*    <div>*/}
                        {/*        <h2>{selectedPost.title}</h2>*/}
                        {/*        <div dangerouslySetInnerHTML={{ __html: selectedPost.content  }} />*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </DashboardBox>
                </DashboardDiv>
            </MainBody>
        </>
    );
};

export default BoardPage;