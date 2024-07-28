import React from "react";
import "./todo.css";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBurger } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ImCross } from "react-icons/im";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import RowRadioButtonsGroup from "./materialUI/radioGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import dayjs from "dayjs";


function Todo() {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskTime: dayjs().format("HH:mm"),
    taskDate: dayjs(),
    importance: "",
  });
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  function handleDateChange(newValue) {
    setNewTask((prevTask) => ({
      ...prevTask,
      taskDate: newValue,
    }));
  }

  function handleImportanceChange(event) {
    const { value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      importance: value,
    }));
  }

  function addTasks() {
    if (newTask.taskName.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask({
        taskName: "",
        taskTime: dayjs().format("HH:mm"),
        taskDate: dayjs(),
        importance: "",
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTasks();
    setModal(false);
  }

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <AccountCircleIcon sx={{ fontSize: 100 }} />
    </Box>
  );

  const getBorderColor = (importance) => {
    switch (importance) {
      case "very":
        return "red";
      case "slightly":
        return "yellow";
      case "average":
        return "green";
      default:
        return "transparent";
    }
  };

  return (
    <div className="wrapper">
      <div className="todoContainer">
        <div className="header">
          <div>
            <LuListTodo id="headerIcons" />
          </div>
          <div className="name">
            <p>i-List</p>
          </div>
          <div className="dateContainer">
            <div className="date">
              <p>{dayjs().format("YYYY-MM-DD")}</p>
            </div>
            <div className="search">
              <input type="text" />
            </div>
          </div>
          <div className="menu">
            <GiHamburgerMenu id="headerIcons" onClick={toggleDrawer(true)} />
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          <div id="myLinks">
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>

        <div className="tasks">
          {tasks.map((task, index) => (
            <div className="taskCard" key={index}
            style={{ border: `2px solid ${getBorderColor(task.importance)}` }}
            >
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">Task created on: {task.taskTime}</p>
                <p>{task.taskName}</p>
              </div>
              <div className="taskDate">
              <p>
                  {task.taskDate ? task.taskDate.format("dddd MMM DD") : ""} 
                  {task.importance}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="addButton">
          <button onClick={activateModal}>
            <MdAdd />
          </button>
        </div>

        {modal && (
          <div className="modal">
            <div className="overlay" onClick={deactivateModal}></div>
            <div className="modalContent">
              <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    disablePast
                    name="taskDate"
                    value={newTask.taskDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
                <TextField
                  id="filled-basic"
                  label="Task name"
                  variant="filled"
                  name="taskName"
                  value={newTask.taskName}
                  onChange={handleChange}
                />
                <br />
                <br />
                <RowRadioButtonsGroup
                  name="importance"
                  value={newTask.importance}
                  onChange={handleImportanceChange}
                />
                <br />
                <Button variant="outlined" onClick={handleSubmit}>
                  ADD TASK
                </Button>
              </Box>
              <div className="closeModal">
                <ImCross onClick={deactivateModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
