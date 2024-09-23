import React, { useState, useEffect } from "react";
import "./todo.css";
import { LuListTodo } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import { ImCross } from "react-icons/im";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import dayjs from "dayjs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function Todo({ db, user }) {
  const userId = localStorage.getItem("userId");
  const username = sessionStorage.getItem("username");
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);

  // const [loading, setLoading] = useState(true);
  // const [newTask, setNewTask] = useState({
  //   taskName: "",
  //   taskTime: "",
  //   taskDate: "",
  //   importance: "",
  //   taskID: userId,
  // });

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   if (db) {
  //     try {
  //       const res = db.run(`SELECT * FROM tasks WHERE taskID = ${userId}`);
  //       if (res.length > 0) {
  //         setTasks(res[0].values);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   }
  // }, [db, userId]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    if (db) {
      const result = db.exec(`SELECT * FROM todos `);
      setTodos(result[0]?.values || []);
    }
  };

  const addTodo = () => {
    if (db) {
      db.run(
        `INSERT INTO todos ( description, priority) VALUES ('${newTodo}', '${newPriority}')`
      );
      setNewTodo("");
      setNewPriority("Medium");
      deactivateModal();
      loadTodos();
    }
  };

  const deleteTodo = (id) => {
    if (db) {
      db.run(`DELETE FROM todos WHERE id = ${id}`);
      loadTodos();
    }
  };

  const updateTodo = (id, newDescription, newPriority) => {
    if (db) {
      db.run(
        `UPDATE todos SET description = '${newDescription}', priority = '${newPriority}' WHERE id = ${id}`
      );
      loadTodos();
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo[2].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewTask((prevTask) => ({
  //     ...prevTask,
  //     [name]: value,
  //   }));
  // };

  // const handleDateChange = (newValue) => {
  //   setNewTask((prevTask) => ({
  //     ...prevTask,
  //     taskDate: newValue,
  //   }));
  // };

  // const handleImportanceChange = (event) => {
  //   const { value } = event.target;
  //   setNewTask((prevTask) => ({
  //     ...prevTask,
  //     importance: value,
  //   }));
  // };

  // const addTasks = () => {
  //   if (newTask.taskName.trim() !== '') {
  //     try {
  //       db.run(
  //         'INSERT INTO tasks (taskName, importance, taskID) VALUES (?, ?, ?)',
  //         [newTask.taskName, newTask.importance, newTask.taskID]
  //       );
  //       const idRes = db.exec('SELECT last_insert_rowid() AS id');
  //       const id = idRes[0].values[0][0];
  //       setTasks([...tasks, { ...newTask, id }]);
  //       setNewTask({
  //         taskName: '',
  //         taskTime: '',
  //         taskDate: '',
  //         importance: '',
  //         taskID: userId,
  //       });
  //     } catch (error) {
  //       console.error('Error adding task:', error);
  //     }
  //   }
  // };

  // const handleSubmit = () => {
  //   event.preventDefault();
  //   addTasks();
  //   toast.success("Task added successfully");
  //   setModal(false);
  // };

  // const handleDelete = (id) => {
  //   db.run(`DELETE FROM tasks WHERE id = ?`, [id]);
  //   setTasks(tasks.filter((task) => task[0] !== id));
  // };

  const activateModal = (tasks) => {
    // setCurrentTask(tasks);
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
    // setCurrentTask(null);
  };

  // const activateUpdateModal = () => {
  //   useEffect(() => {
  //     const taskToUpdate = tasks.find((task) => task.id === parseInt(id));
  //     setCurrentTask(taskToUpdate);
  //   }, [id]);
  //   setUpdateModal(true);
  // };

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

  function getPriorityColor(priority) {
    switch (priority.toLowerCase()) {
      case "high":
        return "#ffcccb";
      case "medium":
        return "#ffffcc";
      case "low":
        return "#ccffcc";
      default:
        return "white";
    }
  }

  // const getBorderColor = (importance) => {
  //   switch (importance) {
  //     case "very":
  //       return "red";
  //     case "slightly":
  //       return "yellow";
  //     default:
  //       return "green";
  //   }
  // };

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
                  onChange={(e) => setSearchTerm(e.target.value)}
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

        <Container>
          <List>
            {filteredTodos.map((todo) => (
              <ListItem
                key={todo[0]}
                style={{ backgroundColor: getPriorityColor(todo[3]) }}
              >
                <ListItemText
                  primary={todo[2]}
                  secondary={`Priority: ${todo[3]}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      const newDescription = prompt(
                        "Enter new description",
                        todo[2]
                      );
                      const newPriority = prompt("Enter new priority", todo[3]);
                      if (newDescription && newPriority) {
                        updateTodo(todo[0], newDescription, newPriority);
                      }
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(todo[0])}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Container>

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
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    disablePast
                    name="taskDate"
                    value={newTask.taskDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider> */}
                <TextField
                  fullWidth
                  label="New Todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  margin="normal"
                />
                <Select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
                <br />
                <br />
                <br />
                <Button variant="contained" color="primary" onClick={addTodo}>
                  Add Todo
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
