import React, { useState, useEffect } from "react";
import styled from "styled-components";
import scheduleApi from "../../../api/scheduleApi";

const Container = styled.div`
  margin-top: -50px;
`;
const Subtitle = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ListItem = styled.div``;
function Today({ projectId }) {
  const [todayEvents, setTodayEvents] = useState([]);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      try {
        const kstToday = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Seoul",
        });
        const todayTimestamp = new Date(kstToday).getTime();

        const response = await scheduleApi.getScheduleList(projectId);

        const filteredEvents = response.data.list.filter((e) => {
          const eventStartDateTimestamp = new Date(e.startDate).getTime();
          const eventEndDateTimestamp = new Date(e.endDate).getTime();

          // startDate가 오늘이거나, 오늘이 startDate와 endDate 사이에 있거나, endDate가 오늘인 경우를 모두 고려
          return (
            todayTimestamp >= eventStartDateTimestamp &&
            todayTimestamp <= eventEndDateTimestamp
          );
        });

        setTodayEvents(filteredEvents);
      } catch (error) {
        console.error("오늘의 일정을 가져오는 중 오류 발생", error);
      }
    };

    fetchTodayEvents();
  }, [projectId]);

  return (
    <Container>
      <Subtitle>Today</Subtitle>
      {todayEvents.length === 0 ? (
        <p>오늘의 일정이 없습니다.</p>
      ) : (
        todayEvents.map((event) => (
          <ListItem key={event.startDate}>{event.content}</ListItem>
        ))
      )}
    </Container>
  );
}

export default Today;
