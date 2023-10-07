import React, {useState, useEffect} from "react";
import Body from "../../Components/common/Body";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useNavigate} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList"; // Quill Editor의 스타일을 불러옵니다.

// WritingMainPage.js

/////////제목,내용/////////
const FormContainer = styled.div`
  max-height: 30rem; /* 댓글 컨테이너의 최대 높이 */
  max-width: 70rem;
  padding-left: 1%;
  padding-right: 1%;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;

const TitleInput = styled.input`
  border: none; /* 기본 테두리 제거 */
  width: 99%;
  height: 2rem;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ccc;
  outline: none;
`;
const CustomQuillEditor = styled(ReactQuill)`
  /* 퀼 에디터의 커스텀 스타일 */

  .ql-editor {
    min-height: 28rem; /* 최소 높이 설정 */
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


////////////버튼/////////////
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
  background-color: #FF1E1E;
  color: white;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s;

  /* 마우스를 가져다 대었을 때의 스타일 */

  &:hover {
    background-color: #FF7C7C;
    color: white;
    cursor: pointer;
  }
`;
//////////글쓰기 조회//////////
const ViewTitleInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-right: 1rem;
  padding-left: 1rem;

`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0rem;
`;

const AuthorAndDate = styled.p`
  font-size: 1rem;
  color: gray;
  display: flex;
  align-items: center;
`;

const Dot = styled.span`
  font-size: 1rem;
  color: gray;
  margin: 0 0.2rem;
`;
//////내용부분/////////////
const Content = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 0.1rem;
  margin-bottom: 0.5rem;
  min-height: 5rem;
`;
const Color = styled.div`
    background-color: #FFF0DC;
`;
const ViewWritingPage = ({selectedRowId}) => {
    const [editorHtml, setEditorHtml] = useState(""); // Quill Editor의 HTML 내용을 저장하는 상태
    const [title, setTitle] = useState(""); // 제목을 저장하는 상태
    const [savedPost, setSavedPost] = useState([]); // 저장된 게시글(post) 배열
    const [showViewWriting, setShowViewWriting] = useState(true);
    const [showPutWriting, setShowPutWriting] = useState(false);
    const [selectedPost, setSelectedPost] = useState({
        title: "",
        content: "",
        author: "",
        date: "",
    });

    const navigate = useNavigate();
    const goToPreviousPage = () => {
        setTimeout(function () {
            window.location.reload();
        }, 100);
    };

    const addComment = (newComment) => {
        //이전에 저장된 데이터와 함께 새 데이터를 저장
        setSavedComments([...comments, newComment]);
    };
    // 댓글 데이터 배열
    const [comments, setSavedComments] = useState([
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
    // // 글쓰기 등록 함수
    const putWiring = () => {
        // 입력된 데이터를 객체로 만들어 저장
        const newPutPost = {
            id: Date.now(), // 나중에 DB에서 고유한 ID 생성
            title: title,
            content: editorHtml,
            date: new Date().toLocaleDateString(),
        };
        // 이전 게시글을 유지하면서 새로운 게시글을 추가
        setSavedPost([...savedPost, newPutPost]);
        // 입력 필드 초기화
        setTitle('');
        setEditorHtml('');


    };
    const changePutView = () => {
        setShowViewWriting(false);
        setShowPutWriting(true);
    };
    // 게시글 내용을 담을 객체 나중에 DB연결하면 내용 set해주기

    // rowId를 기반으로 해당 게시글 정보 가져오기
    useEffect(() => {
        // 예시 데이터 설정 (실제 데이터 처리로 대체)
        setSelectedPost({
            title: "게시글 제목",
            content: "이건 더미데이터입니다. 그러므로 저장된 DB에서 데이터를 불러오도록 하십시오.",
            author: "홍길동",
            date: "2023-10-01",
        });
    }, [selectedRowId]);

    //조회하면 showViewWriting + 수정화면 showPutWriting
    return (
        <>
            {showViewWriting ? (
                <>
                    <FormContainer>
                        <ViewTitleInput>
                            <Title>{selectedPost.title}</Title>
                            <AuthorAndDate>
                                {selectedPost.author}
                                <Dot>·</Dot>
                                {selectedPost.date}
                            </AuthorAndDate>
                        </ViewTitleInput>
                        <Content dangerouslySetInnerHTML={{__html: selectedPost.content}}/>
                    <Color>
                        <CommentForm onAddComment={addComment}/>
                        <CommentList comments={comments}/>
                    </Color>
                    </FormContainer>
                    <PostsButtonContainer>
                        <PostsButton onClick={changePutView}>수정</PostsButton>
                        <PostsButton onClick={goToPreviousPage}>취소</PostsButton>
                    </PostsButtonContainer>

                </>
            ) : showPutWriting ? (
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
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    ['image', 'video'], // 이미지와 동영상 추가
                                    [{'font': []}], // 글꼴 선택
                                    [{'size': ['small', false, 'large', 'huge']}], // 텍스트 크기
                                    ['clean']
                                ],
                            }}
                        />

                    </FormContainer>
                    <PostsButtonContainer>
                        <PostsButton onClick={putWiring}>완료</PostsButton>
                        <PostsButton onClick={goToPreviousPage}>취소</PostsButton>
                    </PostsButtonContainer>
                </>
            ) : null
            }
        </>
    );
};

export default ViewWritingPage;