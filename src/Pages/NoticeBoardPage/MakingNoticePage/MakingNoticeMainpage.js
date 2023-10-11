import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Body from "../../../Components/common/Body";
import BoardPage from "../common/BoardPage";
import {useParams} from "react-router-dom";
import axios from "axios";

const MakingNoticeMainpage = () => {
    const { projectId } = useParams();
    const getPostsByCategory = async (category) => {
        try {
            const response = await axios.get(`/api/posts/all?category=${category}`);
            return response.data; // 게시글 목록을 반환
        } catch (error) {
            console.error('게시글을 불러오는 중 오류가 발생했습니다.', error);
            throw error;
        }
    };
    const subTitle = "제작";
    const writingButtonContent = "글쓰기";
    const category = "PRODUCTION";

    const [tableData, setTableData] = useState([]);
    const fetchData = async () => {
        try {
            const posts = await getPostsByCategory(category);
            setTableData(posts.list);
        } catch (error) {
            console.error('게시글을 불러오는 중 오류가 발생했습니다.', error);
            // 오류 처리
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Body>
            <BoardPage subTitle={subTitle} tableData={tableData} writingButtonContent={writingButtonContent} projectId={projectId} category={category}/>
        </Body>
    );
};
export default MakingNoticeMainpage;
