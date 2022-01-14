import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import api from "../../apis/api"; // Instância do Axios pré-configurada

import LoadingSpinner from "../LoadingSpinner";
import ConfirmationModal from "../ConfirmationModal";
import TaskCard from "../task/TaskCard";
import TaskCreate from "../task/TaskCreate";
import TaskEdit from "../task/TaskEdit";

function ProjectDetail() {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    budget: 0,
    projectOwner: { name: "" },
    tasks: [],
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({
    description: "",
    status: "A fazer",
    startDate: new Date().toISOString().split("T")[0],
  });

  // Equivalente ao props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/project/${id}`);

        setProjectDetails({ ...response.data });
        setLoading(false);

        if (taskCreated) {
          setTaskCreated(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, taskCreated]);

  function handleModalClose() {
    setShowModal(false);
  }

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalConfirmation() {
    history.push(`/projeto/deletar/${id}`);
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        // O <> é um Fragment, um componente do React especial que não renderiza nada na tela
        <>
          <h3>{projectDetails.name}</h3>
          <div className='w-100 my-3 d-flex justify-content-end'>
            <Link
              className='btn btn-sm btn-warning me-2'
              to={`/projeto/editar/${id}`}
            >
              Editar
            </Link>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => handleModalOpen()} // Ao clicar no botão deletar, perguntamos ao usuário se ele tem certeza
            >
              Deletar
            </button>
          </div>
          <p>
            <strong>Descrição do projeto: </strong>
            {projectDetails.description}
          </p>
          <p>
            <strong>Data início: </strong>
            {new Date(projectDetails.startDate).toLocaleString().split(",")[0]}
          </p>
          <p>
            <strong>Data fim: </strong>
            {new Date(projectDetails.endDate).toLocaleString().split(",")[0]}
          </p>
          <p>
            <strong>Orçamento: </strong>
            {projectDetails.budget.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <strong>Responsável: </strong>
            {projectDetails.projectOwner.name}
          </p>
        </>
      )}

      <ConfirmationModal
        show={showModal}
        handleClose={handleModalClose}
        handleConfirmation={handleModalConfirmation}
      />

      <div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            // Limpa a tarefa a ser atualizada quando o usuário clicar em nova tarefa
            setTaskToUpdate({
              description: "",
              status: "A fazer",
              startDate: new Date().toISOString().split("T")[0],
            });
          }}
          className='btn btn-primary'
        >
          Nova tarefa
        </button>
      </div>

      {showForm ? (
        <div className='col-5'>
          {taskToUpdate._id ? (
            <TaskEdit
              state={taskToUpdate}
              projectId={id}
              handleClose={setShowForm}
              setTaskCreated={setTaskCreated}
            />
          ) : (
            <TaskCreate
              projectId={id}
              handleClose={setShowForm}
              setTaskCreated={setTaskCreated}
            />
          )}
        </div>
      ) : null}

      <div className='row'>
        <div className='col-4'>
          <h3>A fazer</h3>

          <div className='d-flex flex-column'>
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "A fazer")
              .map((taskObj) => (
                <TaskCard
                  key={taskObj._id}
                  taskObj={taskObj}
                  setTaskToUpdate={setTaskToUpdate}
                  setShowForm={setShowForm}
                  setTaskCreated={setTaskCreated}
                />
              ))}
          </div>
        </div>
        <div className='col-4'>
          <h3>Fazendo</h3>
          <div className='d-flex flex-column'>
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "Fazendo")
              .map((taskObj) => (
                <TaskCard
                  key={taskObj._id}
                  taskObj={taskObj}
                  setTaskToUpdate={setTaskToUpdate}
                  setShowForm={setShowForm}
                  setTaskCreated={setTaskCreated}
                />
              ))}
          </div>
        </div>
        <div className='col-4'>
          <h3>Feito</h3>
          <div className='d-flex flex-column'>
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "Feito")
              .map((taskObj) => (
                <TaskCard
                  key={taskObj._id}
                  taskObj={taskObj}
                  setTaskToUpdate={setTaskToUpdate}
                  setShowForm={setShowForm}
                  setTaskCreated={setTaskCreated}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
