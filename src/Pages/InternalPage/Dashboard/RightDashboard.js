import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const RightDashboardBox = styled.div`
  border-left: 1px dotted black;
  background-color: white;
  flex-basis: 50%;
`;

const RightboardBody = styled.div`
  width: 90%;
  height: 31%;
  margin: 0.3rem;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  flex: 1;
`;

const BoardTitleDiv = styled.div`
  display: flex;
  text-align: center;
  height: 30%;
`;

const BoardContentDiv = styled.div`
  text-align: center;
  height: 70%;
  width: 100%;
`;

const ContentDiv = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  height: 33%;
  background-color: white;
  min-width: 8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubTitle = styled.text`
  font-weight: 600;
  font-size: 1.5rem;
`;

const Text = styled.text`
  font-size: 1rem;
  text-decoration: underline;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  padding-left: 1rem;
`;
const GoButton = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: 1.5rem;
  margin-left: auto;
`;

const RightDashboard = ({projectId}) => {
    const navigate = useNavigate();
    const [planData, setPlanData] = useState([]);
    const [productionDate, setProductionDate] = useState([]);
    const [editData, setEditData] = useState([]);
    const goToPlanPage = () => {
        navigate(`/PlanMain/${projectId}`);
    };

    const goToMakingPage = () => {
        navigate(`/MakingMain/${projectId}`);
    };

    const goToEditPage = () => {
        navigate(`/EditMain/${projectId}`);
    };
    useEffect(() => {
        // 데이터를 불러오는 함수
        const fetchPosts = async () => {
            try {
                const planResponse = await axios.get(`/api/posts/recent?category=PLANNING`);
                setPlanData(planResponse.data.list);
                const productionResponse = await axios.get(`/api/posts/recent?category=PRODUCTION`);
                setProductionDate(productionResponse.data.list);
                const editResponse = await axios.get(`/api/posts/recent?category=EDITING`);
                setEditData(editResponse.data.list);
            } catch (error) {
                console.error("Error fetching recent posts:", error);
            }
        };

        fetchPosts();
    }, []);
    return (
        <RightDashboardBox>
            <RightboardBody>
                <BoardTitleDiv>
                    <SubTitle>기획</SubTitle>
                    <GoButton onClick={goToPlanPage}>+</GoButton>
                </BoardTitleDiv>
                <BoardContentDiv>
                    {planData.map((plan) => (
                        <ContentDiv key={plan.id}>
                            <Text>{plan.title}</Text>
                        </ContentDiv>
                    ))}
                </BoardContentDiv>
            </RightboardBody>
            <RightboardBody>
                <BoardTitleDiv>
                    <SubTitle>제작</SubTitle>
                    <GoButton onClick={goToMakingPage}>+</GoButton>
                </BoardTitleDiv>
                <BoardContentDiv>
                    {productionDate.map((production) => (
                        <ContentDiv key={production.id}>
                            <Text>{production.title}</Text>
                        </ContentDiv>
                    ))}
                </BoardContentDiv>
            </RightboardBody>
            <RightboardBody>
                <BoardTitleDiv>
                    <SubTitle>편집</SubTitle>
                    <GoButton onClick={goToEditPage}>+</GoButton>
                </BoardTitleDiv>
                <BoardContentDiv>
                    {editData.map((edit) => (
                        <ContentDiv key={edit.id}>
                            <Text>{edit.title}</Text>
                        </ContentDiv>
                    ))}
                </BoardContentDiv>
            </RightboardBody>
        </RightDashboardBox>
    );
};
export default RightDashboard;
