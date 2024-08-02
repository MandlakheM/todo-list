import { TodayRounded } from "@mui/icons-material";
import "./App.css";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Todo from "./components/todo";
import UpdateModal from "./components/updateModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/updateModal" element={<UpdateModal />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
