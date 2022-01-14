import axios from "axios";

const apis = {
  development: "http://localhost:1234/api/v1",
  production: "https://ih-project-management-app.herokuapp.com/api/v1",
};

const api = axios.create({ baseURL: apis[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  // Primeiro verifica se já existe um usuário logado no localStorage
  const storedUserJson = localStorage.getItem("loggedInUser");

  // Converte o JSON armazenado de volta para objeto. Verifica se JSON não está vazio, caso esteja vazio, passa um JSON contendo somente uma string vazia para o parse
  const storedUser = JSON.parse(storedUserJson || '""');

  if (storedUser.token) {
    config.headers = {
      Authorization: `Bearer ${storedUser.token}`, // token foi preenchido no component Login linha 28 OU pelo localStorage no componente AuthContextComponent linha 17
    };
  }

  return config;
});

export default api;
