import { useState, useContext } from "react";

import TaskForm from "./TaskForm";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

function TaskCreate(props) {
  const [state, setState] = useState({
    title: "",
    description: "",
    status: "A fazer",
    startDate: new Date().toISOString().split("T")[0],
  });

  const { loggedInUser } = useContext(authContext);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(state);
    try {
      const response = await api.post(`/task`, {
        ...state,
        taskOwner: loggedInUser.user._id,
        projectId: props.projectId,
      });

      console.log(response.data);

      // Limpando o formulário após a criação
      setState({
        description: "",
        status: "A fazer",
        startDate: new Date(),
      });

      props.handleClose(false);
      props.setTaskCreated(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TaskForm
      state={state}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      buttonText='Criar Nota'
    />
  );
}

export default TaskCreate;
