import "./App.css";
import { Outlet } from "react-router-dom";
import { Container, Spacer, Text } from "@nextui-org/react";

function App() {
  return (
    <Container>
      <Spacer y={3} />
      <Text h2>How much have you paid to artists?</Text>

      <Spacer y={3} />

      <Outlet />
    </Container>
  );
}

export default App;
