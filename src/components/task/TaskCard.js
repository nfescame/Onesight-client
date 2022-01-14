import { useState } from "react";

import ConfirmationModal from "../ConfirmationModal";
import taskDelete from "./taskDelete";

function TaskCard(props) {
  const [showModal, setShowModal] = useState(false);

  function handleModalClose() {
    setShowModal(false);
  }

  async function handleModalConfirmation(taskId) {
    try {
      await taskDelete(taskId, props.setTaskCreated);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="border rounded p-2 shadow-sm bg-light m-2">
      <p className="mb-0">{props.taskObj.description}</p>
      <small style={{ fontSize: "10px" }} className="text-muted fst-italic">
        {new Date(props.taskObj.startDate).toLocaleString()}
      </small>
      <div className="w-100 text-end">
        <i
          title="Editar"
          className="fas fa-edit text-secondary me-2"
          // QUando o usuário clicar no botão de atualizar, atualizamos o state do componente acima para mostrar os dados da tarefa atual no formulário de edição
          onClick={() => {
            props.setTaskToUpdate({ ...props.taskObj });
            props.setShowForm(true);
          }}
        ></i>
        <i
          title="Deletar"
          className="fas fa-trash-alt text-danger"
          onClick={() => setShowModal(true)}
        ></i>
      </div>

      <ConfirmationModal
        show={showModal}
        handleClose={handleModalClose}
        handleConfirmation={() => handleModalConfirmation(props.taskObj._id)}
      />
    </div>
  );
}

export default TaskCard;
