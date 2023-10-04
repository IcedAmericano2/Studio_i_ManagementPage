// CommentForm.js
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-top: 1rem;
`;


const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const CommentForm = ({ onAddComment }) => {
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
            <div>
                <label>내용:</label>
                <CommentTextarea
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <SubmitButton onClick={handleSubmit}>댓글 작성</SubmitButton>
        </FormContainer>
    );
};

export default CommentForm;