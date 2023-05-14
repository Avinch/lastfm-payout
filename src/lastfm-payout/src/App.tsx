import "./App.css";
import { Outlet } from "react-router-dom";
import { Text } from "@nextui-org/react";

function App() {
  return (
    <>
      <Text h2>Find shame in how much you consume</Text>
      <hr />
      <Outlet />
    </>
  );
}

export default App;
