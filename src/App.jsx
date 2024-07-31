import "./App.css";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import Todo from "./components/todo";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {

  return (
    <>
      {/* <LogIn />
      <SignUp/> */}
      <Todo />
    </>
  );
}

export default App;
