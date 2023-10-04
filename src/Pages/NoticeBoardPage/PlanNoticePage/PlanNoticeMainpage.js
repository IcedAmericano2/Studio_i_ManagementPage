import React from "react";
import {useNavigate} from "react-router-dom";
import Body from "../../../Components/common/Body";
import BoardPage from "../../../Components/common/BoardPage";

// PlanNoticeMainpage.js

const PlanNoticeMainpage = () => {
    const subTitle = "기획";
    const buttonContent ="글쓰기";
    const tableData = [
        { id: 122, category: '질문', title: 'ㅁㅇㄻadfafasdㄹㅇㅁㄴㄻㄴㄹㅇㄴ',  date: 30,  username: '김김김' },
        { id: 2, category: '강의', title: 30,  date: 30,  username: '이이이' },
        { id: 3, category: '기타', title: 30,  date: 30,  username: '박박박' },
    ];

    return (
        <Body>
            <BoardPage subTitle={subTitle} tableData={tableData} buttonContent = {buttonContent} showTable={true}/>
        </Body>
    );
};

export default PlanNoticeMainpage;