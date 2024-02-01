import React from "react";
import "./Task.css";
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
      <h2>{title}</h2>

      <div className="task">
        <p>{description}</p>
        <input
          type="checkbox"
          name="taskcompleted"
          id="taskcompleted"
          onChange={handleOnChangeEvent}
          defaultChecked={completed}
        />
        <label htmlFor="taskcompleted">completed</label>
      </div>
      <button type="button" onClick={handleOnclick}>
        Delete
      </button>
    </div>
  );
}

export default Task;
