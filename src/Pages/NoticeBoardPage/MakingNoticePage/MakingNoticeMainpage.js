import React, {useState} from "react";
import styled from "styled-components";
import Body from "../../../Components/common/Body";
import BoardPage from "../common/BoardPage";
import {useParams} from "react-router-dom";

const EditNoticeMainpage = () => {
    const { projectId } = useParams();

    const subTitle = "제작";
    const writingButtonContent = "글쓰기";
    const [tableData, setTableData] = useState([
        //데이터만 각각에 맞게 넣으면 끝. table를 공통컴포넌트로 설정해놓음.
        {id: 122, category: '편집부분', title: 'ㅇㅇㅇㅇ', date: 30, username: '홍길동'},
        {id: 1, category: '질문', title: 'ㅁㅇㄻadfafasdㄹㅇㅁㄴㄻㄴㄹㅇㄴ', date: 30, username: '김김김'},
        {id: 2, category: '강의', title: 30, date: 30, username: '이이이'},
        {id: 3, category: '기타', title: 30, date: 30, username: '박박박'},
    ]);


    return (
        <Body>
            <BoardPage subTitle={subTitle} tableData={tableData} writingButtonContent={writingButtonContent} projectId={projectId}/>
            {/* WritingPage 컴포넌트를 사용하고, onAddPost prop으로 handleAddPost 함수를 전달 */}
        </Body>
    );
};
export default EditNoticeMainpage;
