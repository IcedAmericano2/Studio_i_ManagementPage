import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  border-radius: 5px;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  //background-color: #FC9EBD ;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 0.05rem;
  font-size: 0.875rem;
  background-color: #D79278;
  border-radius: 999px; /* 큰 값으로 설정하여 타원 모양 생성 */
  padding: 0.1rem 0.3rem; /* 내용 주변에 좀 더 공간을 주기 위한 패딩 설정 */
  display: inline-block; /* 인라인 요소로 표시하여 내용과 함께 가로 정렬 */
  color: white; /* 텍스트 색상을 흰색으로 설정 */
`;

const Content = styled.div`
  margin-bottom: 0.05rem;
  font-size: 0.875rem;
`;

const Date = styled.div`
  color: #888;
  font-size: 0.75rem;
`;
const CommentTitle = styled.h3`
  font-size: 1rem;
  color: #282c34;
`;

const CommentList = ({ comments }) => {

    return (
        <>
            <CommentTitle>댓글</CommentTitle>
            {comments.map((comment, index) => (
                <FormContainer key={index}>
                    <Author>{comment.author}</Author>
                    <Content>{comment.content}</Content>
                    <Date>{comment.date}</Date>
                </FormContainer>
            ))}
        </>
    );
};

export default CommentList;