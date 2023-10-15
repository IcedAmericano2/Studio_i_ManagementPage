import React, { useState } from "react";
import styled from "styled-components";
import {TextLg, TextMd} from "../../../Components/common/Font";

const TableContainer = styled.div`
  width: 100%;
  height: 28rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  overflow-y: auto;
`;




const Table = ({  tableData, onRowClick }) => {

    // Table의 열을 클릭했을 때 호출될 함수
    const sendDataBoard = (rowId) => {
        onRowClick(rowId);
    };
    return (
        <TableContainer>
            <table>
                <thead>
                <tr>
                    <th><TextMd>번호</TextMd></th>
                    <th><TextMd>제목</TextMd></th>
                    <th><TextMd>작성일자</TextMd></th>
                    <th><TextMd>닉네임</TextMd></th>
                </tr>
                </thead>
                <tbody>
                {tableData.length === 0 ? (
                    <tr>
                        <td>1</td>
                        <td>test용</td>
                        <td>2023-01-01</td>
                        <td>유저네임</td>
                    </tr>

                ) : (

                    tableData.map((row) => (
                        <tr
                            key={row.id}
                            onClick={() => sendDataBoard(row.id)}
                        >
                            <td>{row.id}</td>
                            <td>{row.title}</td>
                            <td>{row.startDate}</td>
                            <td>{row.userName}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </TableContainer>
    );
};

export default Table;