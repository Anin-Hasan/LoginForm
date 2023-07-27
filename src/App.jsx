import Register from "./Register";
import Login from "./components/Login";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthDetails from "./components/AuthDetails";
import Protected from "./components/Protected";

// import ContextApi from "./components/ContextApi";
import userContex from "./components/ContexState";
import { useContext } from "react";

function App() {
  const { login } = useContext(userContex);
  console.log(login);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/scs"
          element={
            <Protected isSignedIn={login}>
              <AuthDetails />
            </Protected>
          }
        ></Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
