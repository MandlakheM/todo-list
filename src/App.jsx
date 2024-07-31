import { TodayRounded } from "@mui/icons-material";
import "./App.css";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Todo from "./components/todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
