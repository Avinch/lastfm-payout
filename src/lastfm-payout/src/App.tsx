import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Find shame in how much you consume</h1>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
