import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #f7f7f7;
`;

const ManageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  width: 120%;
  min-height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: -20px;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
function Manage() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [eventText, setEventText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert("시작 날짜는 종료 날짜보다 이전이어야 합니다.");
      return;
    }

    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const newEvents = [];

    while (start <= end) {
      newEvents.push({
        date: start.toISOString().substr(0, 10),
        event: eventText,
      });
      start.setDate(start.getDate() + 1);
    }

    localStorage.setItem(
      "events",
      JSON.stringify([...storedEvents, ...newEvents])
    );
    navigate(`/Manage/${id}`); // 경로 수정.
  };

  return (
    <TotalContainer>
      <h2>Manage Events</h2>
      <ManageContainer>
        <div>
          <label>시작 : </label>
          <StyledInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>종료 : </label>
          <StyledInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <StyledTextArea
            placeholder="일정을 입력하세요."
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
          />
        </div>
        <div>
          <StyledButton onClick={handleSave}>Save</StyledButton>
          <StyledButton onClick={() => navigate(`/Manage/${id}`)}>
            Cancel
          </StyledButton>
        </div>
      </ManageContainer>
    </TotalContainer>
  );
}

export default Manage;
