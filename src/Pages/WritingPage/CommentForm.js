// CommentForm.js
import React, {useState} from "react";
import styled from "styled-components";
import CommentIMG from './CommentButton.png';
import CommentHoverIMG from './CommentButtonHover.png';

const FormContainer = styled.div`
  align-items: center; /* 요소를 세로 가운데 정렬 */
  border-top: 1px solid darkgray; /* 위쪽 선 스타일 */
  padding: 1% 5%; /* 위아래 여백 추가 */
  /* 왼쪽 흐림 효과 */
`;


const CommentTextarea = styled.textarea`
  width: 80%; /* 넓이를 80%로 조정 */
  padding: 0.1rem;
  margin-right: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #999; /* 텍스트 색상을 회색으로 설정 */
  max-height: 2rem;
  min-height: 2rem;
  resize: none;
  font-size: 1.2rem;
  vertical-align: middle;

  &:focus {
    outline: 1px solid gray;
  }
  
`;

const SubmitButton = styled.button`
  background-image: url(${CommentIMG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 40px; // 이미지의 원본 크기에 맞게 조절
  height: 30px;
  background-color: #FFF0DC;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  vertical-align: middle;
  border-radius: 4px;
  &:hover {
    background-color: #D79278;
    background-image: url(${CommentHoverIMG});
  }
`;

const CommentForm = ({onAddComment}) => {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        // 새로운 댓글 객체 생성
        const newComment = {
            author,
            content,
            date: new Date().toLocaleDateString(),
        };

        // 댓글 추가 콜백 호출
        onAddComment(newComment);

        // 입력 필드 초기화
        setAuthor("");
        setContent("");
    };

    return (

        <FormContainer>
            <>
                <CommentTextarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="댓글 추가..."
                />
                <SubmitButton onClick={handleSubmit}></SubmitButton>
            </>
        </FormContainer>
    );
};

export default CommentForm;