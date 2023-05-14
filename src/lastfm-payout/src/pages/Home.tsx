import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const onUsernameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setUsername(value);
    console.log(value);
  };

  const formSubmitted = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`results/${username}`);
  };

  return (
    <>
      <form onSubmit={formSubmitted}>
        <input type="text" onChange={onUsernameChange}></input>
      </form>
    </>
  );
}
