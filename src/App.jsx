import "./App.css";
import LogIn from "./components/logIn";
import Todo from "./components/todo";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<LogIn />} />
      <Route
        path="/todo"
        element={
          <>
            <SignedIn>
              <Todo />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
