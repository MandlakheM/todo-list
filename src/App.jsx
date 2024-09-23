import React, { useState, useEffect } from "react";
import "./App.css";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Todo from "./components/todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initSqlJs from "sql.js";

function App() {
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const SQL = await initSqlJs();
      const database = new SQL.Database();
      database.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        );
        CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          description TEXT,
          priority TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `);
      setDb(database);
    };
    initDb();
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn db={db} setUser={setUser} />}></Route>
          <Route path="/signUp" element={<SignUp db={db} />}></Route>
          <Route path="/todo" element={<Todo db={db} user={user} />}></Route>
          {/* <Route path="/updateModal" element={<UpdateModal />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
