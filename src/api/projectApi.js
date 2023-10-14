import axios from "axios";

const projectApi = {
  // 프로젝트 완료 표시
  getProject: async (projectIndex) => {
    const response = await axios.get(`/api/project/${projectIndex}`);
    return response;
  },
  // 프로젝트 수정
  // data안에는 수정할 내용에 관한 정보가 들어있어야 함.
  updateProject: async (projectIndex, data) => {
    const response = await axios.put(`/api/project/${projectIndex}`, data);
    return response;
  },
  // 프로젝트 삭제
  deleteProject: async (projectIndex) => {
    const response = await axios.delete(`/api/project/${projectIndex}`);
    return response;
  },
  // 프로젝트 전체목록 조회
  getProjectList: async () => {
    const response = await axios.get(`/api/project`);
    return response;
  },
  // 프로젝트 생성
  // data안에는 프로젝트 생성 관련 정보가 들어있어야 함.
  createProject: async (data) => {
    const response = await axios.post(`/api/project`, data);
    return response;
  },
  // 핑 테스트
  pingTest: async () => {
    const response = await axios.get(`/api/project/ping`);
    return response;
  },
};

export default projectApi;
