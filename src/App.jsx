import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dash from "./Components/Dash";



function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Dashboard" element={<Dash/>} />
      </Routes>
    </>
  );
}

export default App;
