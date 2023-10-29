import axios from "axios";
const storedToken = sessionStorage.getItem('login-token');
if (storedToken) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + storedToken;
}
// 댓글 crud api
const commentApi = {
  // 댓글 작성
  postComment: async (data) => {
    const response = await axios.post('/api/posts', data);
    return response;
  },
  // 댓글 수정
  putComment: async (data) => {
    const response = await axios.put('/api/posts', data);
    return response;
  },
  // 댓글 삭제
  deleteComment: async (data) => {
    const response = await axios.delete('/api/posts', data);
    return response;
  },
  // 댓글 상세보기
  getBoard: async (data) => {
    const response = await axios.get(`/api/posts?projectId=${data.projectId}&postId=${data.postId}`);
    return response;
  },
  // 댓글 리스트 가져오기
  getCommentList: async (data) => {
    const response = await axios.get(`/api/posts/${data.postId}/comments`);
    return response;
  },
};

export default commentApi;
