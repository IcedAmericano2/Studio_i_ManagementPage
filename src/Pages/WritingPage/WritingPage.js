import React, {useState, useEffect} from "react";
import Body from "../../Components/common/Body";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useNavigate} from "react-router-dom"; // Quill Editor의 스타일을 불러옵니다.

// WritingMainPage.js

const FormContainer = styled.div`
  max-height: 30rem; /* 댓글 컨테이너의 최대 높이 */
  max-width: 70rem;
  padding-left: 1%;
  padding-right: 1%;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
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
    background-color: #ccc; 
    border-radius: 5px; 
  }

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

const PostsButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const WritingPage = () => {
    const [editorHtml, setEditorHtml] = useState(""); // Quill Editor의 HTML 내용을 저장하는 상태
    const [title, setTitle] = useState(""); // 제목을 저장하는 상태
    const [savedPost, setSavedPost] = useState([]); // 저장된 게시글(post) 배열
    const userNickname = "뉴트로지나"; // 더미 닉네임으로 초기화

    const navigate = useNavigate();
    const goToPreviousPage = () => {
        setTimeout(function () {
            window.location.reload();
        }, 100);
    };
    // useEffect(() => {
    //     console.log(showWritingMainPage)
    //     if (showWritingMainPage) {
    //         // showWritingMainPage가 true일 때 실행하고자 하는 작업 수행
    //         setShowBoardPage(false);
    //     }
    // }, [showWritingMainPage]);

    // 글쓰기 등록 함수
    const addPost = () => {
        // 입력된 데이터를 객체로 만들어 저장
        const newPost = {
            id: Date.now(), // 고유한 ID 생성
            title: title,
            content: editorHtml,
            date: new Date().toLocaleDateString(),
            author: userNickname,
        };

        // 이전 게시글을 유지하면서 새로운 게시글을 추가
        setSavedPost([...savedPost, newPost]);

        // 부모 컴포넌트로 게시글 데이터 전달
        // 입력 필드 초기화
        setTitle('');
        setEditorHtml('');


    };

    return (
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
                    <PostsButton onClick={addPost}>등록</PostsButton>
                    <PostsButton onClick={goToPreviousPage}>취소</PostsButton>
                </PostsButtonContainer>
        </>
    );
};

export default WritingPage;