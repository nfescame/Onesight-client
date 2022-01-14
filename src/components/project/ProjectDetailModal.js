import React from "react";

export default function DetailsModal({ projectDetails }) {
  return (
    <>
      <button
        type='button'
        className='btn btn-primary w-100'
        data-toggle='modal'
        data-target='#exampleModal'
      >
        Detalhes da tarefa
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {projectDetails.name}
              </h5>
            </div>
            <div className='modal-body'>
              <p>
                <strong>Descrição do projeto: </strong>
                {projectDetails.description}
              </p>
              <p>
                <strong>Data início: </strong>
                {
                  new Date(projectDetails.startDate)
                    .toLocaleString()
                    .split(" ")[0]
                }
              </p>
              <p>
                <strong>Data fim: </strong>
                {
                  new Date(projectDetails.endDate)
                    .toLocaleString()
                    .split(" ")[0]
                }
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
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
