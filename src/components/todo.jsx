import React from "react";
import "./todo.css";
import { useState, useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { CiBurger } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import { ImCross } from "react-icons/im";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import dayjs from "dayjs";
import { UserButton } from "@clerk/clerk-react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function Todo() {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskTime: dayjs().format("HH:mm"),
    taskDate: dayjs(),
    importance: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

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
    axios
      .post("http://localhost:3030/tasks", newTask)
      .then((res) => {
        alert("Data added successfully!");
      })
      .catch((err) => console.log(err));
    setModal(false);
  }

  function handleDelete(id) {
    const confirm = window.confirm("do you want to delete this taks");
    if (confirm) {
      axios
        .delete("http://localhost:3030/tasks/" + id)
        .then((res) => {
          alert("Tasks deleted");
        })
        .catch((err) => console.log(err));
    }
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
      default:
        return "green";
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
            <div className="wrap-input-17">
              <div className="search-box">
                <button className="btn-search">🔍</button>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="menu">
            <UserButton />

            <GiHamburgerMenu id="headerIcons" onClick={toggleDrawer(true)} />
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>

        <div className="tasks">
          {tasks
            .filter((task) => {
              return () =>
                search.toLowerCase() === ""
                  ? task
                  : task.taskName.toLowerCase().includes(search);
            })
            .map((task, index) => (
              <div className="taskCard" key={index}>
                <div className="taskIcon">
                  <CiBurger id="headerIcons" />
                </div>
                <div className="time">
                  <p id="taskTime">Task created on: {task.taskTime}</p>
                  <p>{task.taskName}</p>
                </div>

                <div
                  className="taskDate"
                  style={{
                    borderLeft: `3px solid ${getBorderColor(task.importance)}`,
                  }}
                >
                  <p>
                    {/* {task.taskDate
                      ? () => task.taskDate.format("dddd MMM DD")
                      : ""} */}
                    <MdDeleteForever
                      id="delete"
                      onClick={(e) => handleDelete(task.id)}
                    />
                    <FaEdit id="edit" />
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
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Importance
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="importance"
                    value={newTask.importance}
                    onChange={handleImportanceChange}
                  >
                    <FormControlLabel
                      value="very"
                      control={<Radio />}
                      label="Very"
                    />
                    <FormControlLabel
                      value="slightly"
                      control={<Radio />}
                      label="Slightly"
                    />
                    <FormControlLabel
                      value="average"
                      control={<Radio />}
                      label="Average"
                    />
                  </RadioGroup>
                </FormControl>
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
