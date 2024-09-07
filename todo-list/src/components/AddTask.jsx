import React, { useState } from "react";
import "./AddTask.css";
/**
 *
 * @settingNewTask {*} react setStateHook from parent component that will control the task to be created
 *  {title: string,
 *  description: string,
 *  completed: boolean,
 * }
 * @returns
 */
function AddTask({ submitFunction, settingNewTask, taskObject }) {
  const [fieldsFilled, setFieldsFilled] = useState({
    titleInput: "",
    descInput: "",
  });

  function handleTitleInputFieldChange(event) {
    //setTitle(event.target.value);
    settingNewTask({ ...taskObject, title: event.target.value });
    setFieldsFilled({ ...fieldsFilled, titleInput: event.target.value });
    console.log(fieldsFilled.titleInput.length > 0);
  }
  function handleDescriptionInputFieldChange(event) {
    settingNewTask({ ...taskObject, description: event.target.value });
    setFieldsFilled({ ...fieldsFilled, descInput: event.target.value });
  }

  function submittingPost() {
    submitFunction();
  }

  return (
    <form>
      <div className="task-input-fields-container">
        <label htmlFor="title">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="New Task"
            onChange={handleTitleInputFieldChange}
            className="inputField"
          />
        </label>
        <label htmlFor="description">
          <textarea
            type="text"
            name="description"
            className="inputField"
            id="description"
            placeholder="description"
            onChange={handleDescriptionInputFieldChange}
          />
        </label>
      </div>
      <button
        type="submit"
        onClick={submittingPost}
        className="add-task-button"
        disabled={
          fieldsFilled.titleInput.length > 0 &&
          fieldsFilled.descInput.length > 0
            ? ""
            : "disabled"
        }
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
