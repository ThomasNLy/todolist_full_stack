import React from "react";
import "./AddTask.css";

function AddTask({ submitFunction, settingNewTask }) {
  //const [title, setTitle] = useState("");

  function handleChange(event) {
    //setTitle(event.target.value);
    settingNewTask({ title: event.target.value });
  }

  function submittingPost() {
    submitFunction();
  }

  return (
    <form>
      <label htmlFor="title">
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          className="inputField"
        />
      </label>
      <button
        type="submit"
        onClick={submittingPost}
        className="add-task-button"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
