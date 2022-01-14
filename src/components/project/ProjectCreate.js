import { useState } from "react";
import { useHistory } from "react-router-dom";

import ProjectForm from "./ProjectForm";

import api from "../../apis/api";

function ProjectCreate() {
  const [state, setState] = useState({
    name: "",
    description: "",
    // Formato ISO de data: yyyy-mm-ddThh:mm:ss:ms
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    budget: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Equivalente ao props.history
  const history = useHistory();

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    // Previne a página de ser recarregada
    event.preventDefault();

    // Enviar os dados para o backend
    setLoading(true);
    api
      .post("/project", state)
      .then(() => {
        setLoading(false);
        // Redirecionar o usuário de volta para a página de projetos
        history.push("/projetos");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (!err.response.data) {
          return setError("Erro desconhecido");
        }

        if (err.response.data.err) {
          return setError(err.response.data.err.message);
        }
        return setError(err.response.data.msg);
      });
  }

  return (
    <div>
      <h1>Criar novo projeto</h1>
      <ProjectForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default ProjectCreate;
