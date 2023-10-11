import React from "react";
import styled from "styled-components";
import {
  media,
  TitleLg,
  TitleMd,
  TitleSm,
  TextLg,
  TextMd,
  TextSm,
} from "../../Components/common/Font";

const AppContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Container = styled.div`
  text-align: left;
`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 16px;

  th,
  td {
    padding: 15px;
    text-align: center;
  }

  th:last-child {
    display: flex;
  }

  tbody tr {
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const LabelArea = styled.div`
  background-color: #363636;
  border-radius: 32px;
  width: 128px;
  text-align: center;
  color: white;
`;
const storedCompletedProjects = JSON.parse(
  localStorage.getItem("completedProjects") || "[]"
);

function FinishProject() {
  return (
    <AppContainer>
      <Container>
        <LabelArea>
          <TitleSm>완료</TitleSm>
        </LabelArea>
      </Container>

      <StyledTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>기한</th>
            <th>프로젝트명</th>
            <th>프로젝트 소개</th>
            <th>기타 정보</th>
          </tr>
        </thead>
        <tbody>
          {projectData.concat(storedCompletedProjects).map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.date}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.etc}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AppContainer>
  );
}
const projectData = [
  {
    id: 1,
    date: "2020",
    name: "벨리곰",
    description: "롯데홈쇼핑메라 콘텐츠",
    etc: "youtube link",
  },
  {
    id: 2,
    date: "2021",
    name: "아작아작:아이돌 작사 아이돌 작곡",
    description: "케이(Kei)로 본격적인 ‘봄 시즌 송’ 제작기.",
    etc: "youtube link",
  },
  {
    id: 3,
    date: "2021",
    name: "김용명의 쏠쏠한 이중생활",
    description: "나만의 활 즐기기에 나선다!",
    etc: "youtube link",
  },
  {
    id: 4,
    date: "2021",
    name: "주크박스2",
    description:
      "K-CM송을 차린 KCM이 광고주를 위한 최고의 CM송을  만들어주는 콘텐츠",
    etc: "youtube link",
  },
  {
    id: 5,
    date: "2022",
    name: "국힘겜탑",
    description: "롯데홈쇼핑메라 콘텐츠",
    etc: "youtube link",
  },
  {
    id: 6,
    date: "2022",
    name: "쓰봉크럽",
    description: "케이(Kei)로 본격적인 ‘봄 시즌 송’ 제작기.",
    etc: "youtube link",
  },
  {
    id: 7,
    date: "2022",
    name: "스테이지업",
    description: "나만의 즐기기에 나선다!",
    etc: "youtube link",
  },
  {
    id: 8,
    date: "2022",
    name: "하이스코어",
    description:
      "K-CM송을 차린 KCM이 광고주를 위한 최고의 CM송을  만들어주는 콘텐츠",
    etc: "youtube link",
  },
  {
    id: 9,
    date: "2022",
    name: "서머너즈 워",
    description:
      "K-CM송을 차린 KCM이 광고주를 위한 최고의 CM송을  만들어주는 콘텐츠",
    etc: "youtube link",
  },
  {
    id: 10,
    date: "2022",
    name: "다시 만난 세계 : 쩌미문",
    description:
      "K-CM송을 차린 KCM이 광고주를 위한 최고의 CM송을  만들어주는 콘텐츠",
    etc: "youtube link",
  },
];

export default FinishProject;
