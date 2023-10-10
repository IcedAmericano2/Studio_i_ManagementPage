// import React from "react";
// import Header from "../../../Components/common/header";
// import styled from "styled-components";
// import {useNavigate} from "react-router-dom";
// import Body from "../../../Components/common/Body";
//
// const MainBody = styled.div`
//     /* max-width : 1184px; */
//     //이거 가운데로 놓기 ~
//     display : flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     height: 100vh;
// `;
//
// const DashboardDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-width: 80%;
//     height: 82vh;
//     background-color: white;
// `;
//
// const BoardTitleDiv = styled.div`
//     display: flex;
//     text-align: center;
//     min-height: 2rem;
//     height: 4vh;
//     background-color: #E9E9E9;
//     padding-bottom: 0.3rem;
// `;
//
// const DashboardBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-height: 40rem;
//     height: 80vh;
//     padding-left: 1%;
//     paddint-right: 1%;
//     padding-top: 1rem;
// `;
// const Title = styled.div`
//     font-weight: 600;
//     font-size: 1.5rem;
//     margin: auto 0;
//     cursor: pointer;
// `;
// const SubTitle = styled.div`
//     font-size: 0.875rem;
//     margin: auto 0;
//     cursor: pointer;
// `;
//
// ////////////////////table//////////////////////
// const TableContainer = styled.div`
//   width: 98%;
//   height: 70rem;
//   border-bottom: 2px solid gray;
//   margin: 0 auto;
//   padding-bottom: 1rem;
// `;
// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;
// const TableHeader1 = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   text-align: center;
//   border-bottom: 1px solid gray;
//   border-top: 1px solid gray;
//   width: 10%;
//   min-width: 2rem;
// `;
// const TableHeader2 = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   text-align: center;
//   border-bottom: 1px solid gray;
//   border-top: 1px solid gray;
//   width: 15%;
//   min-width: 4rem;
// `;
// const TableHeader3 = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   text-align: center;
//   border-bottom: 1px solid gray;
//   border-top: 1px solid gray;
//   width: 40%;
// `;
// const TableHeader4 = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   text-align: center;
//   border-bottom: 1px solid gray;
//   border-top: 1px solid gray;
//   width: 20%;
//   min-width: 4rem;
// `;
// const TableHeader5 = styled.th`
//   padding: 8px;
//   background-color: #f2f2f2;
//   text-align: center;
//   border-bottom: 1px solid gray;
//   border-top: 1px solid gray;
//   width: 10%;
//   min-width: 4rem;
// `;
// const TableCell = styled.td`
//   padding: 8px;
//   border-bottom: 1px solid gray;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// const TableCellCenter = styled.td`
//   padding: 8px;
//   border-bottom: 1px solid gray;
//   text-align: center;
// `;
// /////////////////////////////////////
// const WriteButton = styled.button`
//     width: 6rem;
//     height: 2rem;
//     margin: 1%;
//     font-size: 1rem;
// `;
// const MakingNoticeMainpage = () => {
//     const MakingNoticeMainpageContent = () => {
//         const navigate = useNavigate();
//
//         const tableData = [
//             { id: 122, category: '질문', title: 'ㅁㅇㄻadfafasdㄹㅇㅁㄴㄻㄴㄹㅇㄴ',  date: 30,  username: '김김김' },
//             { id: 2, category: '강의', title: 30,  date: 30,  username: '이이이' },
//             { id: 3, category: '기타', title: 30,  date: 30,  username: '박박박' },
//         ];
//         const goToPreviousPage = () => {
//             navigate("/");
//         };
//
//         return (
//             <>
//                 <MainBody>
//                     <DashboardDiv>
//                         <BoardTitleDiv>
//                             <Title onClick={goToPreviousPage}>
//                                 Dashboard
//                             </Title>
//                             <SubTitle onClick={goToPreviousPage}>
//                                 >Socoa
//                             </SubTitle>
//                             <SubTitle>
//                                 >제작
//                             </SubTitle>
//                         </BoardTitleDiv>
//                         <DashboardBox>
//                             <TableContainer>
//                                 <Table>
//                                     <thead>
//                                     <tr>
//                                         <TableHeader1>번호</TableHeader1>
//                                         <TableHeader2>카테고리</TableHeader2>
//                                         <TableHeader3>제목</TableHeader3>
//                                         <TableHeader4>작성일자</TableHeader4>
//                                         <TableHeader5>닉네임</TableHeader5>
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//                                     {tableData.map((row) => (
//                                         <tr key={row.id}>
//                                             <TableCellCenter>{row.id}</TableCellCenter>
//                                             <TableCellCenter>{row.category}</TableCellCenter>
//                                             <TableCell>{row.title}</TableCell>
//                                             <TableCellCenter>{row.date}</TableCellCenter>
//                                             <TableCellCenter>{row.username}</TableCellCenter>
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </Table>
//                             </TableContainer>
//                             <WriteButton>
//                                 글쓰기
//                             </WriteButton>
//                         </DashboardBox>
//                     </DashboardDiv>
//                 </MainBody>
//             </>
//         )
//     }
//
//     return(
//         <Body>
//             <MakingNoticeMainpageContent/>
//         </Body>
//     )
// }
// export default MakingNoticeMainpage;