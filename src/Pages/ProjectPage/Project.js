import React, { useState } from "react";

function Project({ onClose }) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const handleSave = () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProject = {
      id: storedProjects.length + 1,
      date: `${startDate} ~ ${endDate}`,
      name: projectName,
      description: projectDetails,
    };
    localStorage.setItem(
      "projects",
      JSON.stringify([...storedProjects, newProject])
    );

    
    onClose();
  };

  return (
    <div className="total">
      <h2>프로젝트</h2>
      <div>
        <label>시작&nbsp;&nbsp;날짜&nbsp;&nbsp;: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>종료&nbsp;&nbsp;날짜&nbsp;&nbsp;: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>프로젝트명&nbsp;: </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <div>
          <label className="details">프로젝트 세부 내용:</label>
        </div>
        <textarea
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
        ></textarea>
      </div>
      <button className="check" onClick={handleSave}>
        Save
      </button>
      <button className="check" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default Project;
