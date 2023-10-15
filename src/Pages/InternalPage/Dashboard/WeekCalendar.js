import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import scheduleApi from "../../../api/scheduleApi";

const List = styled.div`
  margin-top: -20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Title = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  border: 1px solid #e0e0e0;
  max-width: 100%;
  background-color: #f7f7f7;
  margin-left: auto;
  margin-right: auto;
`;

const ManageButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  font-size: 24px;
  margin-right: 24px;
`;

const Modal = styled.div`
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 30px;
  font-size: 14px;
  color: black;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 60px;
  font-size: 14px;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ScheduleItem = styled.p`
  margin-top: 4px;
  color: grey;
  background-color: red;
  padding: 0px 8px;
  border-radius: 8px;
`;

function WeekCalendar({ projectId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await scheduleApi.getScheduleList(projectId);
        setEvents(response.data.list);
      } catch (error) {
        console.error("Error fetching the schedules", error);
      }
    };

    fetchEvents();
  }, [projectId]); // projectId가 변경될 때마다 다시 fetch
  useEffect(() => {
    console.log(events);
  }, [events]);
  const getDayColor = (dayIndex) => {
    switch (dayIndex) {
      case 0:
        return "#ffb3b3";
      case 1:
        return "#ffdab3";
      case 2:
        return "#ffffb3";
      case 3:
        return "#d1ffb3";
      case 4:
        return "#b3e0ff";
      case 5:
        return "#dab3ff";
      case 6:
        return "#ffb3e1";
      default:
        return "#ffffff";
    }
  };

  const getWeekDates = (date) => {
    const weekDates = [];
    let startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekDates.push(currentDate);
    }

    return weekDates;
  };

  const findStartOfContinuousEvents = (date) => {
    const currentDateIndex = events.findIndex(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );

    if (currentDateIndex === -1) return null;

    let startIndex = currentDateIndex;
    while (
      startIndex > 0 &&
      new Date(events[startIndex].date) -
        new Date(events[startIndex - 1].date) ===
        86400000
    ) {
      startIndex--;
    }

    return events[startIndex];
  };

  const currentWeekDates = getWeekDates(currentDate);
  const findEventsForDate = (date) => {
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();

    return events.filter((e) => {
      const eventStartDate = new Date(
        new Date(e.startDate).getFullYear(),
        new Date(e.startDate).getMonth(),
        new Date(e.startDate).getDate()
      ).getTime();
      const eventEndDate = new Date(
        new Date(e.endDate).getFullYear(),
        new Date(e.endDate).getMonth(),
        new Date(e.endDate).getDate(),
        23,
        59,
        59,
        999
      ).getTime(); // 23시 59분 59초 999밀리초로 설정

      return targetDate >= eventStartDate && targetDate <= eventEndDate;
    });
  };
  const handleDeleteEvent = async (date) => {
    const targetDateString = date.toDateString();
    const eventToDelete = events.find((e) => {
      const eventStartDateString = new Date(e.startDate).toDateString();
      return eventStartDateString === targetDateString;
    });

    if (eventToDelete && eventToDelete.scheduleId) {
      try {
        await scheduleApi.deleteSchedule(eventToDelete.scheduleId);
        setEvents((prevEvents) =>
          prevEvents.filter((e) => e.scheduleId !== eventToDelete.scheduleId)
        );
        setShowModal(false);
      } catch (error) {
        console.error("스케줄 삭제 중 오류 발생", error);
      }
    }
  };

  const handleEditEventSave = async (date, newText) => {
    const targetDateString = date.toDateString();
    const eventToUpdate = events.find((e) => {
      const eventStartDateString = new Date(e.startDate).toDateString();
      return eventStartDateString === targetDateString;
    });

    if (eventToUpdate && eventToUpdate.scheduleId) {
      try {
        const updatedData = { ...eventToUpdate, content: newText };
        await scheduleApi.updateSchedule(eventToUpdate.scheduleId, updatedData);
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e.scheduleId === eventToUpdate.scheduleId ? updatedData : e
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("스케줄 업데이트 중 오류 발생", error);
      }
    }
  };
  // const findEventsForDate = (date) => {
  //   return events.filter(
  //       (e) => new Date(e.startDate).toDateString() === date.toDateString()
  //   );
  // };
  //
  // const handleDeleteEvent = async (startDate) => {
  //   const eventToDelete = events.find(
  //       (e) => new Date(e.startDate).toDateString() === startDate.toDateString()
  //   );
  //
  //   if (eventToDelete && eventToDelete.scheduleId) {
  //     try {
  //       await scheduleApi.deleteSchedule(eventToDelete.scheduleId);
  //       setEvents(events.filter((e) => e.scheduleId !== eventToDelete.scheduleId));
  //       setShowModal(false);
  //     } catch (error) {
  //       console.error("스케줄 삭제 중 오류 발생", error);
  //     }
  //   }
  // };
  //
  // const handleEditEventSave = async (startDate, newText) => {
  //   const eventDate = new Date(startDate).toDateString();
  //   const eventToUpdate = events.find(
  //       (e) => new Date(e.startDate).toDateString() === eventDate
  //   );
  //
  //   if (eventToUpdate && eventToUpdate.scheduleId) {
  //     try {
  //       const updatedData = { ...eventToUpdate, content: newText };
  //       await scheduleApi.updateSchedule(eventToUpdate.scheduleId, updatedData);
  //       setEvents(
  //           events.map((e) => (e.scheduleId === eventToUpdate.scheduleId ? updatedData : e))
  //       );
  //       setShowModal(false);
  //     } catch (error) {
  //       console.error("스케줄 업데이트 중 오류 발생", error);
  //     }
  //   }
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 100);
  // };

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="App">
      <List>
        <Title>Schedule</Title>
        <ManageButton
          type="button"
          onClick={() =>
            navigate("/manage", { state: { projectId: projectId } })
          }
        >
          +
        </ManageButton>
      </List>
      <Calendar>
        {days.map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {currentWeekDates.map((date) => {
          const eventsForDate = findEventsForDate(date);
          return (
            <Day
              key={date}
              onClick={() => {
                const startDateEvents = eventsForDate.filter(
                  (e) =>
                    new Date(e.startDate).toDateString() === date.toDateString()
                );
                if (startDateEvents.length) {
                  setEditingEvent({
                    startDate: date,
                    content: startDateEvents.map((e) => e.content).join("\n"),
                  });
                  setShowModal(true);
                }
              }}
            >
              <div>{date.getDate()}</div>
              {eventsForDate.map((event, index) => (
                <ScheduleItem
                  key={index}
                  style={{ backgroundColor: getDayColor(date.getDay()) }}
                >
                  {event.content}
                  {/*{eventsForDate.length > 1 && " 더보기"}*/}
                </ScheduleItem>
              ))}
            </Day>
          );
        })}

        {showModal && (
          <Modal>
            {editingEvent && (
              <>
                <textarea
                  value={editingEvent.content}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      content: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() =>
                    handleEditEventSave(
                      new Date(editingEvent.startDate),
                      editingEvent.content
                    )
                  }
                >
                  수정 저장
                </button>
                <button
                  onClick={() =>
                    handleDeleteEvent(new Date(editingEvent.startDate))
                  }
                >
                  삭제
                </button>
              </>
            )}
            <button onClick={() => setShowModal(false)}>닫기</button>
          </Modal>
        )}
      </Calendar>
    </div>
  );
}

export default WeekCalendar;
