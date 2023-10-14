import React, { useState, useEffect } from "react";
import styled from "styled-components";
import scheduleApi from "./scheduleApi";

const Container = styled.div`
  margin-top: -50px;
`;
const Subtitle = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ListItem = styled.div``;
function Today({ projectId, events }) {
    const todayDate = new Date().toISOString().substr(0, 10); // YYYY-MM-DD format
    const todayEvents = events.filter((e) => e.startDate === todayDate);

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
