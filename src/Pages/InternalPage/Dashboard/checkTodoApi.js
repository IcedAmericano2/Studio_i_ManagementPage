import axios from "axios";

const BASEURL = "http://3.35.179.234:8080";

// 체크리스트 crud api
const checkTodoApi = {
  // 할일 선택 조회
  getCheckTodo: async (todoIndex) => {
    const response = await axios.get(`${BASEURL}/api/todo/${todoIndex}`);
    return response;
  },
  // 할일 업데이트
  // data안에는 객체로 todoContent, todoEmergency가들어있어야 함.
  updateCheckTodo: async (todoIndex, data) => {
    const response = await axios.put(`${BASEURL}/api/todo/${todoIndex}`, data);
    return response;
  },
  // 할일 삭제
  deleteCheckTodo: async (todoIndex) => {
    const response = await axios.delete(`${BASEURL}/api/todo/${todoIndex}`);
    return response;
  },
  // 할일 조회
  getProjectTodo: async (projectId) => {
    const response = await axios.get(
      `${BASEURL}/api/projects/${projectId}/todo`
    );
    return response;
  },
  // 할일 등록
  // data안에는 객체로 todoContent, todoEmergency가들어있어야 함.
  createCheckTodo: async (projectId, data) => {
    const response = await axios.post(
      `${BASEURL}/api/projects/${projectId}/todo`,
      data
    );
    return response;
  },
  // ping test (이건 안해도 괜춘)
  pingTest: async () => {
    const response = await axios.get(`${BASEURL}/api/todo/ping`);
    return response;
  },
  // 할일 완료 표시
  completeCheckTodo: async (todoIndex) => {
    const response = await axios.get(`${BASEURL}/api/todo/finish${todoIndex}`);
    return response;
  },
};

export default checkTodoApi;
