import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import TextInput from "../TextInput";
import { authContext } from "../../contexts/authContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({ email: "", password: "" });
  // Equivalente ao props.history
  const history = useHistory();

  // authContext é o Context definido no arquivo authContext.js e ao ser passado pro Hook useContext, ele retorna o conteúdo da prop 'value' do Provider
  const { loggedInUser, setLoggedInUser } = useContext(authContext);

  useEffect(() => {
    // Caso o usuário já esteja logado, redirecione para página principal
    if (loggedInUser.token) {
      history.push("/projetos");
    }
  }, [loggedInUser, history]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", state);

      setLoading(false);
      setLoggedInUser({ ...response.data });
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      // No sucesso do Login, redireciona o usuário pra rota da lista de projetos
      history.push("/projetos");
    } catch (err) {
      // Response é um objeto do Axios que contém o objeto de erro com as informações enviadas pelo servidor
      console.error(err.response);
      setLoading(false);
      if (!err.response.data) {
        return setError("Erro desconhecido");
      }

      if (err.response.data.err) {
        return setError(err.response.data.err.message);
      }
      return setError(err.response.data.msg);
    }
  }

  return (
    <div>
      <h1>Entre na sua conta</h1>

      <form onSubmit={handleSubmit}>
        <TextInput
          label='E-mail'
          name='email'
          id='signupFormEmail'
          type='email'
          required
          onChange={handleChange}
          value={state.email}
        />

        <TextInput
          label='Senha'
          name='password'
          id='signupFormPassword'
          type='password'
          required
          onChange={handleChange}
          value={state.password}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className='mb-3'>
            <button type='submit' className='btn btn-primary'>
              Entrar
            </button>
          </div>
        )}

        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      </form>
      <div className='d-flex'>
        <a href='/cadastro-usuario'>Criar uma Conta</a>
      </div>
    </div>
  );
}

export default Login;
