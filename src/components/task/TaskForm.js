import React, { useState } from "react";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import FormModal from "./TaskFormModal";

function TaskForm(props) {
  const [descView, setDescView] = useState(false);
  const [statusView, setStatusView] = useState(false);
  const [dataInicioView, setDataInicioView] = useState(false);
  return (
    <>
      <FormModal
        setDescView={setDescView}
        descView={descView}
        statusView={statusView}
        setStatusView={setStatusView}
        dataInicioView={dataInicioView}
        setDataInicioView={setDataInicioView}
      />
      <form onSubmit={props.handleSubmit}>
        <TextInput
          label='Title'
          id='taskFormDescription'
          required
          name='title'
          onChange={props.handleChange}
          value={props.state.title}
        />
        {descView && (
          <TextInput
            label='Descrição'
            id='taskFormDescription'
            name='description'
            onChange={props.handleChange}
            value={props.state.description}
          />
        )}

        {statusView && (
          <SelectInput
            label='Status'
            id='taskFormStatus'
            name='status'
            onChange={props.handleChange}
            value={props.state.status}
            items={["A fazer", "Fazendo", "Feito"]}
          />
        )}

        {dataInicioView && (
          <TextInput
            label='Data Início'
            type='date'
            id='taskFormStartDate'
            name='startDate'
            onChange={props.handleChange}
            value={new Date(props.state.startDate).toISOString().split("T")[0]}
          />
        )}

        <div className='mb-3'>
          <button className='btn btn-primary'>{props.buttonText}</button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
