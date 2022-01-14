import TextInput from "../TextInput";
import SelectInput from "../SelectInput";

function TaskForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextInput
        label="Descrição"
        id="taskFormDescription"
        name="description"
        onChange={props.handleChange}
        value={props.state.description}
      />

      <SelectInput
        label="Status"
        id="taskFormStatus"
        name="status"
        onChange={props.handleChange}
        value={props.state.status}
        items={["A fazer", "Fazendo", "Feito"]}
      />

      <TextInput
        label="Data Início"
        type="date"
        id="taskFormStartDate"
        name="startDate"
        onChange={props.handleChange}
        value={new Date(props.state.startDate).toISOString().split("T")[0]}
      />

      <div className="mb-3">
        <button className="btn btn-primary">{props.buttonText}</button>
      </div>
    </form>
  );
}

export default TaskForm;
