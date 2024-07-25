import React from "react";
import "./todo.css";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBurger } from "react-icons/ci";
import { MdAdd } from "react-icons/md";
import TextField from "@mui/material/TextField";
import DateRangeCalendarCalendarsProp from "./materialUI/calender";
import ResponsiveTimePickers from "./materialUI/timePicker";
import RowRadioButtonsGroup from "./materialUI/radioGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import { ImCross } from "react-icons/im";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Todo() {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <AccountCircleIcon sx={{ fontSize: 100}} />
    </Box>
  );

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addTasks() {
    setTask((t) => [...t, newTask]);
    setNewTask("");
  }

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
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
              <p>2024-07-23</p>
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
            <div className="taskCard">
              <div className="taskIcon">
                <CiBurger id="headerIcons" />
              </div>
              <div className="time">
                <p id="taskTime">08:00am - 09:00 am</p>
                <p>Take the kids to school</p>
              </div>
              <div className="taskDate">
                <p>
                  Thursday <br />
                  25
                </p>
              </div>
            </div>


          <div className="taskCard">
            <div className="taskIcon">
              <CiBurger id="headerIcons" />
            </div>
            <div className="time">
              <p id="taskTime">08:00am - 09:00 am</p>
              <p>Take the kids to school</p>
            </div>
            <div className="taskDate">
              <p>
                Thursday <br />
                25
              </p>
            </div>
          </div>
        </div>

        <div className="addButton">
          <button onClick={() => activateModal()}>
            <MdAdd />
          </button>
        </div>

        {modal && (
          <div className="modal">
            <div className="overlay" onClick={deactivateModal}></div>
            <div className="modalContent">
              <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
                <DateRangeCalendarCalendarsProp />
                {/* <input type="datetime-local" name="" id="" /> */}
                <TextField
                  id="filled-basic"
                  label="Task name"
                  variant="filled"
                />
                <br />
                <ResponsiveTimePickers />
                <br />
                <RowRadioButtonsGroup />
                <br />
                <Button variant="outlined">ADD TASK</Button>
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
