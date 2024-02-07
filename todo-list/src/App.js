import "./App.css";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    _id:"",
    taskid:"",
    title: "",
    description: "desc",
    completed: "",
  });

  async function getTasks() {
    await fetch("http://localHost:8000/todos", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .then((data) => {
        console.log("react app fetching");
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function postTask() {
    let dateTaskCreated = new Date();
    dateTaskCreated = dateTaskCreated.toISOString();
    await fetch("http://localHost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskid: `${newTask.title}${dateTaskCreated}`,
        title: newTask.title,
        description: newTask.description,
        completed: false,
        date: dateTaskCreated,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("added new task to database successfully"))
      .then((data) => setTasks([...tasks, data.json()]))
      .catch((err) => console.log(err));
  }

  /**
   * 
   * @param {object} taskItem a newTask object required to delete it's entry from the todo list and database
   * newTaskItems have the following fields, 
   * _id: database id
   * taskid: unique id for the task,
   * title: the title
   * description: desc
   * date: date it was created
   * compeleted: boolean value for task completion
   */
  async function deleteTask(taskItem) {
    await fetch("http://localHost:8000/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: taskItem._id,
        taskid: taskItem.taskid,
        title: taskItem.title,
        description: taskItem.description,
        completed: taskItem.completed,
        date: taskItem.date,
      }),
    })
      .then((response) => {
        console.log(response.json());
      })
      .then(() => updateListOfTaskAfterDeletingOne(taskItem))
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * 
   * @param {object} taskItem, a newTask object required to update the task's information such as  compeletion status
   */
  async function updateTask(taskItem) {
    const updatedTask = await JSON.stringify({
      _id: taskItem._id,
      taskid: taskItem.taskid,
      title: taskItem.title,
      description: taskItem.description,
      completed: taskItem.completed,
      date: taskItem.date,
    });

    await fetch("http://localHost:8000/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: updatedTask,
    })
      .then((response) => {
        console.log(response.json());
      })

      .catch((err) => console.log(err));
  }

  /**
   * 
   * @param {object} taskToDelete a newTask object used to filter out from current list of tasks that display on the screen 
   */
  function updateListOfTaskAfterDeletingOne(taskToDelete) {
    const newList = tasks.filter(
      (task) => task.taskid !== taskToDelete.taskid
    );
    setTasks(newList);
  }

  const listOfTask = () => {
    let theTasks = tasks.map((t) => {
      return (
        <Task
          key={t._id}
          _id={t._id}
          taskid={t.taskid}
          title={t.title}
          description={t.description}
          completed={t.completed}
          date={t.date}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      );
    });
    return theTasks;
  };
  function addNewTask() {
    postTask();
  }

  let taskList = listOfTask();

  return (
    <div className="body-container">
      <AddTask
        submitFunction={addNewTask}
        settingNewTask={setNewTask}
        taskObject={newTask}
      />
      <div className="task-list-container">{taskList}</div>
    </div>
  );
}

export default App;
