import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  border-radius: 5px;
  margin: 0.25rem 0.25rem;;
  padding: 0.5rem;
  background-color: #b0e0e6;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 0.05rem;
  font-size: 0.875rem;
`;

const Content = styled.div`
  margin-bottom: 0.05rem;
  font-size: 0.875rem;
`;

const Date = styled.div`
  color: #888;
  font-size: 0.75rem;
`;


const CommentList = ({ comments }) => {

    return (
        <div>
            {comments.map((comment, index) => (
                <CommentContainer key={index}>
                    <Author>{comment.author}</Author>
                    <Content>{comment.content}</Content>
                    <Date>{comment.date}</Date>
                </CommentContainer>
            ))}
        </div>
    );
};

export default CommentList;