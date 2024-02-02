import React from "react";
import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function Task({ id, title, description, completed, deleteTask, updateTask }) {
  let taskItem = {
    id: id,
    title: title,
    description: description,
    completed: completed,
  };
  async function handleOnclick(event) {
    deleteTask(taskItem);
  }

  async function handleOnChangeEvent(event) {
    console.log(event.target.checked);
    taskItem.completed = event.target.checked;
    updateTask(taskItem);
  }

  return (
    <div className="task-container">
      <div>
        <label htmlFor="taskcompleted"></label>
        <input
          className="checkbox"
          type="checkbox"
          name="taskcompleted"
          id="taskcompleted"
          onChange={handleOnChangeEvent}
          defaultChecked={completed}
        />
      </div>
      <div className="task">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button type="button" onClick={handleOnclick} className="delete-button">
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
}

export default Task;
