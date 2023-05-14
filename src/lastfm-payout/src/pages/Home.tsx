import { FormElement, Input } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const onUsernameChange = async (event: ChangeEvent<FormElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const formSubmitted = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`results/${username}`);
  };

  return (
    <>
      <form onSubmit={formSubmitted}>
        <Input
          type="text"
          onChange={onUsernameChange}
          labelPlaceholder="Your Last.FM username"
          size="xl"
          css={{ width: "500px" }}
        ></Input>
      </form>
    </>
  );
}
