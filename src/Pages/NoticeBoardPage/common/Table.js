import React, { useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 98%;
  height: 25rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  overflow-y: auto;
`;
const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TableHeader1 = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 2px solid gray;
  width: 10%;
  min-width: 2rem;
`;
const TableHeader2 = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 2px solid gray;
  width: 15%;
  min-width: 4rem;
`;
const TableHeader3 = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 2px solid gray;
  width: 40%;
`;
const TableHeader4 = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 2px solid gray;
  width: 20%;
  min-width: 4rem;
`;
const TableHeader5 = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 2px solid gray;
  width: 10%;
  min-width: 4rem;
`;
const TableCell = styled.td`
  border-bottom: 1px solid gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const TableCellCenter = styled.td`
  padding: 8px;
  border-bottom: 1px solid gray;
  text-align: center;
`;

const Table = ({  tableData, onRowClick }) => {

    // Table의 열을 클릭했을 때 호출될 함수
    const sendDataBoard = (rowId) => {
        onRowClick(rowId);
    };
    return (
        <TableContainer>
            <TableStyled>
                <thead>
                <tr>
                    <TableHeader1>번호</TableHeader1>
                    <TableHeader3>제목</TableHeader3>
                    <TableHeader4>작성일자</TableHeader4>
                    <TableHeader5>닉네임</TableHeader5>
                </tr>
                </thead>
                <tbody>
                {tableData.length === 0 ? (
                    <TableRow>
                        <TableCellCenter colSpan="5">게시글이 존재하지 않습니다</TableCellCenter>
                    </TableRow>
                ) : (

                    tableData.map((row) => (
                        <TableRow
                            key={row.id}
                            onClick={() => sendDataBoard(row.id)}
                        >
                            <TableCellCenter>{row.id}</TableCellCenter>
                            <TableCell>{row.title}</TableCell>
                            <TableCellCenter>{row.startDate}</TableCellCenter>
                            <TableCellCenter>{row.userName}</TableCellCenter>
                        </TableRow>
                    ))
                )}
                </tbody>
            </TableStyled>
        </TableContainer>
    );
};

export default Table;