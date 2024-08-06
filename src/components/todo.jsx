import React, { useState, useEffect } from "react";
import "./todo.css";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import UpdateModal from "./updateModal";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { initDB, getTasks, addTask, deleteTask } from "./database"; // Import the database functions

function Todo() {
  const userId = localStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskTime: dayjs().format("HH:mm"),
    taskDate: dayjs(),
    importance: "",
    taskID: userId,
  });

  useEffect(() => {
    const initializeDB = async () => {
      await initDB();
      if (userId) {
        const tasksFromDB = getTasks(userId);
        setTasks(tasksFromDB);
        setFilteredTasks(tasksFromDB);
        setLoading(false);
      }
    };
    initializeDB();
  }, [userId]);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.taskName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tasks]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      taskDate: newValue,
    }));
  };

  const handleImportanceChange = (event) => {
    const { value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      importance: value,
    }));
  };

  const addTasks = () => {
    if (newTask.taskName.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      addTask(newTask);
      setNewTask({
        taskName: "",
        taskTime: dayjs().format("HH:mm"),
        taskDate: dayjs(),
        importance: "",
        taskID: userId,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTasks();
    toast.success("Task added successfully");
    setModal(false);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Do you want to delete this task?");
    if (confirm) {
      deleteTask(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      toast.success("Task removed");
    }
  };

  const activateModal = (tasks) => {
    setCurrentTask(tasks);
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
    setCurrentTask(null);
  };

  const activateUpdateModal = () => {
    useEffect(() => {
      const taskToUpdate = tasks.find((task) => task.id === parseInt(id));
      setCurrentTask(taskToUpdate);
    }, [id]);
    setUpdateModal(true);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <AccountCircleIcon sx={{ fontSize: 100 }} />
      <br />
      <p>Username: {username}</p>
      <br />
      <p>UserID: {userId}</p>
      <br />
      <Link to={"/"}>Sign Out</Link>
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
            <GiHamburgerMenu id="headerIcons" onClick={toggleDrawer(true)} />
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>

        <div className="tasks">
          {loading
            ? Array.from(new Array(3)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={60}
                />
              ))
            : filteredTasks.map((task, index) => (
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
                      borderLeft: `3px solid ${getBorderColor(
                        task.importance
                      )}`,
                    }}
                  >
                    <p>
                      {/* { task.taskDate.format("dddd MMM DD")} */}
                      <MdDeleteForever
                        id="delete"
                        onClick={() => handleDelete(task.id)}
                      />
                      <FaEdit id="edit" onClick={() => activateUpdateModal()} />
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

        {updateModal && (
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
