import React from "react";

export default function FormModal({
  setDescView,
  descView,
  statusView,
  setStatusView,
  dataInicioView,
  setDataInicioView,
}) {
  return (
    <div className='d-flex mb-5 '>
      <button
        type='button'
        className='btn btn-danger'
        data-toggle='modal'
        data-target='#exampleModal1'
      >
        Adicionar novo campo
      </button>

      <div
        className='modal fade bg-blue'
        id='exampleModal1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Selecione campo adicional
              </h5>
            </div>
            <div className='modal-body'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='flexCheckDefault'
                  checked={descView}
                  onChange={() => {
                    setDescView(!descView);
                  }}
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Descrição
                </label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='flexCheckDefault1'
                  checked={statusView}
                  onChange={() => {
                    setStatusView(!statusView);
                  }}
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Status
                </label>
              </div>

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='flexCheckDefault'
                  checked={dataInicioView}
                  onChange={() => {
                    setDataInicioView(!dataInicioView);
                  }}
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Data Início
                </label>
              </div>
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
    </div>
  );
}
