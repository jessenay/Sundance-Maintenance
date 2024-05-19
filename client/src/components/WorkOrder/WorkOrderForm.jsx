import React, { useState } from "react";

const WorkOrderForm = () => {
  const [jobs, setJobs] = useState([""]);
  const [personnel, setPersonnel] = useState([""]);
  const [tools, setTools] = useState([""]);
  const [parts, setParts] = useState([{ name: "", cost: "" }]);
  const [timesWorked, setTimesWorked] = useState([""]);

  const handleAddField = (setter, type) => {
    setter((prev) => {
      if (type === "parts") {
        return [...prev, { name: "", cost: "" }];
      } else {
        return [...prev, ""];
      }
    });
  };

  const handleChange = (setter, index, event, field = null) => {
    const { name, value } = event.target;
    setter((prev) => {
      const newState = [...prev];
      if (field) {
        newState[index][field] = value;
      } else {
        newState[index] = value;
      }
      return newState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='form-container'>
    <h2>Work Order Form</h2>
    <form className="annualForm" onSubmit={handleSubmit}>
        {jobs.map((job, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Job"
              value={job}
              onChange={(e) => handleChange(setJobs, index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setJobs)}>
          Add Job
        </button>

        {personnel.map((person, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Personnel"
              value={person}
              onChange={(e) => handleChange(setPersonnel, index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setPersonnel)}>
          Add Personnel
        </button>

        {tools.map((tool, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Tools Required"
              value={tool}
              onChange={(e) => handleChange(setTools, index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setTools)}>
          Add Tool
        </button>

        {parts.map((part, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Part Used"
              value={part.name}
              onChange={(e) => handleChange(setParts, index, e, "name")}
            />
            <input
              type="text"
              placeholder="Cost"
              value={part.cost}
              onChange={(e) => handleChange(setParts, index, e, "cost")}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setParts, "parts")}>
          Add Part
        </button>

        {timesWorked.map((time, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Time Worked"
              value={time}
              onChange={(e) => handleChange(setTimesWorked, index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setTimesWorked)}>
          Add Time Worked
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkOrderForm;