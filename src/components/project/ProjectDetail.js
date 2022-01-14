import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import api from "../../apis/api"; // Instância do Axios pré-configurada

import LoadingSpinner from "../LoadingSpinner";
import ConfirmationModal from "../ConfirmationModal";
import TaskCard from "../task/TaskCard";
import TaskCreate from "../task/TaskCreate";
import TaskEdit from "../task/TaskEdit";
import DetailsModal from "./ProjectDetailModal";

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
          <h3>
            Título da Tarefa:{" "}
            <b style={{ fontSize: "2.5rem", color: "#c71464" }}>
              {projectDetails.name}
            </b>
          </h3>
          <DetailsModal projectDetails={projectDetails} />
          <div className='w-100 my-3 d-flex justify-content-start'>
            <Link
              className='btn btn-sm btn-warning me-2 w-50 p-2'
              to={`/projeto/editar/${id}`}
            >
              Editar
            </Link>
            <button
              className='btn btn-sm btn-danger w-50 p-2'
              onClick={() => handleModalOpen()} // Ao clicar no botão deletar, perguntamos ao usuário se ele tem certeza
            >
              Deletar
            </button>
          </div>
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
          className='btn btn-primary mb-5 w-100'
        >
          Nova Nota
        </button>
      </div>

      {showForm ? (
        <div
          className='col-5 w-100 p-5'
          style={{
            background: "#1cd2b92f",
            borderRadius: "20px",
            border: "2px solid #07b1ff",
          }}
        >
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

      <div className='row m-1'>
        <div
          className='col-4 '
          style={{
            border: "1px solid #07b1ff ",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#c71464" }}>A fazer</h3>

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
        <div
          className='col-4'
          style={{
            border: "1px solid #07b1ff ",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#c71464" }}>Fazendo</h3>
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
        <div
          className='col-4'
          style={{
            border: "1px solid #07b1ff ",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#c71464" }}>Feito</h3>
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
