import { useState, useContext, useEffect } from "react";

import TaskForm from "./TaskForm";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

function TaskEdit(props) {
  const [state, setState] = useState({
    description: "",
    status: "A fazer",
    startDate: new Date().toISOString().split("T")[0],
  });

  const { loggedInUser } = useContext(authContext);

  useEffect(() => {
    // Atualiza os dados dos inputs do formulário toda vez que a tarefa selecionada mudar
    setState({ ...props.state });
  }, [props.state]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.patch(`/task/${props.state._id}`, {
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
      buttonText="Editar Tarefa"
    />
  );
}

export default TaskEdit;
