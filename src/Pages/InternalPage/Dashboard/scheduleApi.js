import axios from "axios";


const scheduleApi = {
  // 일정 가져오기
  getSchedule: async (scheduleId) => {
    const response = await axios.get(`/api/schedules/${scheduleId}`);
    return response;
  },
  // 일정 수정하기
  // data안에는 객체로 content, startDate, endDate가 들어있어야 함.
  updateSchedule: async (scheduleId, data) => {
    const response = await axios.put(
      `/api/schedules/${scheduleId}`,
      data
    );
    return response;
  },
  // 일정 삭제하기
  deleteSchedule: async (scheduleId) => {
    const response = await axios.delete(
      `/api/schedules/${scheduleId}`
    );
    return response;
  },
  // 일정 목록 가져오기
  getScheduleList: async (projectId) => {
    const response = await axios.get(
      `/api/projects/${projectId}/schedules`
    );
    return response;
  },
  // 일정 목록 등록하기
  // data안에는 객체로 content, startDate, endDate가 들어있어야 함.
  createSchedule: async (projectId, data) => {
    const response = await axios.post(
      `/api/projects/${projectId}/schedules`,
      data
    );
    return response;
  },
};

export default scheduleApi;
