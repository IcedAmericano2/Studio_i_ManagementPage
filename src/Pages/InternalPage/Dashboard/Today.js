import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: -50px;
`;
const Subtitle = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ListItem = styled.div``;

function Today() {
  const [todayEvents, setTodayEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const todayDate = new Date().toISOString().substr(0, 10); // YYYY-MM-DD format

    const filteredEvents = storedEvents.filter((e) => e.date === todayDate);
    setTodayEvents(filteredEvents);
  }, []);

  return (
    <Container>
      <Subtitle>Today</Subtitle>
      {todayEvents.length === 0 ? (
        <p>오늘의 일정이 없습니다.</p>
      ) : (
        todayEvents.map((event) => (
          <ListItem key={event.date}>{event.event}</ListItem>
        ))
      )}
    </Container>
  );
}

export default Today;
