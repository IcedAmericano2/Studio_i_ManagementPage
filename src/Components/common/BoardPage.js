// BoardPage.js
import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Table from "./Table";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill Editor의 스타일을 불러옵니다.
import CommentList from "../../Pages/WritingPage/CommentList";
import CommentForm from "../../Pages/WritingPage/CommentForm"; // 댓글 작성 폼을 불러옵니다.


const MainBody = styled.div`
  /* max-width : 1184px; */
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
const PostsButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;;
`;
const PostsButton = styled.button`
  width: 6rem;
  height: 2rem;
  margin: 1%;
  font-size: 1rem;
  border-radius: 1rem; 
  background-color: #87cefa;
  color: #333333;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s; 

  /* 마우스를 가져다 대었을 때의 스타일 */
  &:hover {
    background-color: #0056b3;
    color: white;
    cursor: pointer; 
  }

\` ;
`;

/////////////게시글/////////////////
const FormContainer = styled.div`
  max-height: 34rem; /* 댓글 컨테이너의 최대 높이 */
  max-width: 70rem;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;

const CustomQuillEditor = styled(ReactQuill)`
  /* 퀼 에디터의 커스텀 스타일 */
  .ql-editor {
    //min-height: 28rem; /* 최소 높이 설정 */
    min-height: 15rem;
  }
  .ql-container {
    border: 1px solid #ccc; 
    border-radius: 5px; 
  }
  .ql-toolbar {
    /* 툴바 스타일 설정 */
    background-color: #ccc; /* 툴바 배경색을 파란색으로 변경 */
    border-radius: 5px; /* 툴바 테두리 모서리 둥글게 설정 */
  }

`;

const TitleInput = styled.input`
  border-radius: 1px;
  border: none; /* 기본 테두리 제거 */
  width: 99%;
  height: 2rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  outline: none;
`;


const BoardPage = ({subTitle, tableData, showTable, buttonContent, writingMainPage}) => {
    const navigate = useNavigate();
    const [editorHtml, setEditorHtml] = useState(""); // Quill Editor의 HTML 내용을 저장하는 상태
    const [title, setTitle] = useState(""); // 제목을 저장하는 상태
// 댓글 작성 함수
    const addComment = (newComment) => {
        setComments([...comments, newComment]);
    };
    const goToHomePage = () => {
        navigate("/");
    };

    const goToWritingPage = () => {
        navigate("/WritingMain");
    };
    const goToPreviousPage = () => {
        navigate(-1);
    };
    // 댓글 데이터 배열
    const [comments, setComments] = useState([
        {
            author: "작성자1",
            content: "댓글 내용1",
            date: "2023-9-15",
        },
        {
            author: "작성자2",
            content: "댓글 내용2",
            date: "2023-8-04",
        },
        {
            author: "작성자3",
            content: "댓글 내용2",
            date: "2013-12-21",
        },
        // 다른 댓글 데이터도 추가할 수 있습니다.
    ]);

    return (
        <>
            <MainBody>
                <DashboardDiv>
                    <BoardTitleDiv>
                        <Title onClick={goToHomePage}>
                            Dashboard
                        </Title>
                        <SubTitle onClick={goToHomePage}>
                            >Socoa
                        </SubTitle>
                        <SubTitle>
                            >{subTitle}
                        </SubTitle>
                    </BoardTitleDiv>
                    <DashboardBox>
                        {showTable ? (
                            <>
                                <Table tableData={tableData}/>
                                <WritingButton onClick={goToWritingPage}>{buttonContent}</WritingButton>
                            </>
                        ) : writingMainPage ? (
                            <>
                                <FormContainer>
                                    <TitleInput
                                        type="text"
                                        placeholder="제목을 입력하세요"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} // 입력 값이 변경될 때마다 title 상태 업데이트
                                    />
                                    <CustomQuillEditor
                                        value={editorHtml}
                                        onChange={setEditorHtml}
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                ['image', 'video'], // 이미지와 동영상 추가
                                                [{ 'font': [] }], // 글꼴 선택
                                                [{ 'size': ['small', false, 'large', 'huge'] }], // 텍스트 크기
                                                ['clean']
                                            ],
                                        }}
                                    />
                                    {/* 이곳에 적당한 글쓰기 양식을 추가 */}

                                    <h3>댓글</h3>
                                    {/*<CommentForm onAddComment={addComment} />*/}
                                    <CommentList comments={comments} />
                                </FormContainer>
                                <PostsButtonContainer>
                                    <PostsButton onClick={goToPreviousPage}>등록</PostsButton>
                                    <PostsButton onClick={goToPreviousPage}>취소</PostsButton>
                                </PostsButtonContainer>
                            </>
                        ): null}
                    </DashboardBox>
                </DashboardDiv>
            </MainBody>
        </>
    );
};

export default BoardPage;