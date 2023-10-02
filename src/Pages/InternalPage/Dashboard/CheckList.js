import React, { useState, useEffect } from "react";
import styled from "styled-components";

function CheckList() {
  const [items, setItems] = useState([
    { id: 1, text: "첫 번째 일정", urgent: false, completed: false },
  ]);

  useEffect(() => {
    const savedItems = localStorage.getItem("checklistItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checklistItems", JSON.stringify(items));
  }, [items]);

  const handleCheck = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
  };
  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleAdd = () => {
    const newId = items.length
      ? Math.max(...items.map((item) => item.id)) + 1
      : 1;
    const finalText = isUrgent ? `${inputText}` : inputText;
    const newItem = {
      id: newId,
      text: finalText,
      urgent: isUrgent,
      completed: false,
    };

    if (isUrgent) {
      setItems([newItem, ...items]);
    } else {
      setItems([...items, newItem]);
    }

    setInputText("");
    setIsUrgent(false);
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <Container>
      <List>
        <Title>CheckList</Title>
        <AddButton type="button" onClick={() => setShowModal(true)}>
          +
        </AddButton>
      </List>
      <ItemsList>
        {sortedItems.map((item) => (
          <Item key={item.id} urgent={item.urgent} completed={item.completed}>
            <Checkbox
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheck(item.id)}
            />
            {item.urgent ? <UrgencyLabel>[긴급]</UrgencyLabel> : null}
            {item.text}
            <DeleteButton onClick={() => handleDelete(item.id)}>x</DeleteButton>
          </Item>
        ))}
      </ItemsList>
      {showModal && (
        <Modal>
          <h2>Add Item</h2>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              긴급
            </label>
          </div>
          <ModalButton onClick={handleAdd}>Add</ModalButton>
          <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  max-height: 300px; // 최대 높이 설정
  overflow-y: auto; // 스크롤 기능 활성화
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: -30px;
  margin-left: -15px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -20px;
`;

const Title = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;

const AddButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  font-size: 24px;
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: whitesmoke;
  }
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.urgent ? "#aaa" : "inherit")};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const UrgencyLabel = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: white;
  color: #ff5722;
  border-color: #ff5722;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 16px;
  margin-left: auto;

  &:hover {
    background-color: #e64a19;
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
  text-align: center;

  h2 {
    margin-top: 0;
  }
`;

const ModalButton = styled.button`
  background-color: white;
  color: #ff5722;
  border-color: #ff5722;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 16px;

  &:hover {
    background-color: #e64a19;
    color: white;
  }
`;

export default CheckList;
