import React, { useState } from "react";
import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function Task({
  _id,
  taskid,
  title,
  description,
  completed,
  date,
  deleteTask,
  updateTask,
}) {
  

  let taskItem = {
    _id: _id,
    taskid: taskid,
    title: title,
    description: description,
    completed: completed,
    date: date
  };



  const [taskCompleted, setTaskCompleted] = useState(completed);

  async function handleOnclick(event) {
    deleteTask(taskItem);
  }

  async function handleOnChangeEvent(event) {
    console.log(event.target.checked);
    setTaskCompleted(event.target.checked);
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
        <h2 className={taskCompleted ? "task-completed" : "task-not-completed"}>
          {title}
        </h2>
        <p className={taskCompleted ? "task-completed" : "task-not-completed"}>
          {description}
        </p>
        <p>{date.split('T')[0]}</p>
        <p>{taskid}</p>
      </div>
      <button type="button" onClick={handleOnclick} className="delete-button">
        <FontAwesomeIcon icon={faX} inverse />
      </button>
    </div>
  );
}

export default Task;
