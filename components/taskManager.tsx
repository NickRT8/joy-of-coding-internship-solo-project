"use client";
import { useState } from "react";
import Head from "next/head";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Top");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleTaskDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };

  const addTask = () => {
    if (
      taskName.trim() === "" ||
      taskDescription.trim() === "" ||
      taskDeadline === ""
    ) {
      alert("Please enter a task, description and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(taskDeadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      task: taskName,
      description: taskDescription,
      priority: taskPriority,
      deadline: taskDeadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTaskName("");
    setTaskDescription("");
    setTaskPriority("Top");
    setTaskDeadline("");
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setTaskName(taskToEdit.task);
    setTaskDescription(taskToEdit.description);
    setTaskPriority(taskToEdit.priority);
    setTaskDeadline(taskToEdit.deadline);
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const filteredTasks = tasks
    .filter((t) => !t.done)
    .filter((t) => t.task.toLowerCase().includes(searchKeyword.toLowerCase()))
    .filter((t) => (filterPriority ? t.priority === filterPriority : true));

  return (
    <div className="App">
      <Head>
        <title>Task Manager</title>
      </Head>
      <header className="taskHeader">
        <h1>Task Manager</h1>
      </header>
      <main>
        <div className="taskForm">
          <input
            type="text"
            className="taskNameInput"
            placeholder="Enter task..."
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <input
            type="text"
            className="taskNameInput"
            placeholder="Enter description..."
            value={taskDescription}
            onChange={handleTaskDescChange}
          />
          <select
            className="taskPrioritySelect"
            value={taskPriority}
            onChange={handleTaskPriorityChange}
          >
            <option value="Top">Top Priority</option>
            <option value="Middle">Middle Priority</option>
            <option value="Low">Less Priority</option>
          </select>
          <input
            type="date"
            className="taskDeadlineInput"
            value={taskDeadline}
            onChange={handleTaskDeadlineChange}
          />
          <button className="addTaskButton" onClick={addTask}>
            Add Task
          </button>
        </div>
        <div className="searchFilter">
          <input
            type="text"
            className="searchInput"
            placeholder="Search tasks"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            className="filterPrioritySelect"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Top">Top Priority</option>
            <option value="Middle">Middle Priority</option>
            <option value="Low">Less Priority</option>
          </select>
        </div>
        <h2 className="heading">Upcoming Tasks</h2>
        <div className="taskList">
          <table className="taskTable">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.description}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                  <td>
                    {!t.done && (
                      <div>
                        <button
                          className="markDoneButton"
                          onClick={() => markDone(t.id)}
                        >
                          Mark Done
                        </button>
                        <button
                          className="editTaskButton"
                          onClick={() => handleEditTask(t.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="deleteTaskButton"
                          onClick={() => handleDeleteTask(t.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="completedTaskList">
          <h2 className="completedHeading">Completed Tasks</h2>
          <table className="completedTable">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((ct) => (
                <tr key={ct.id}>
                  <td>{ct.task}</td>
                  <td>{ct.description}</td>
                  <td>{ct.priority}</td>
                  <td>{ct.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
