import TextInput from "../TextInput";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

function ProjectForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextInput
        label="Nome"
        id="projectFormName"
        name="name"
        onChange={props.handleChange}
        value={props.state.name}
      />

      <TextInput
        label="Descrição"
        id="projectFormDescription"
        name="description"
        onChange={props.handleChange}
        value={props.state.description}
      />

      <div className="row">
        <div className="col-auto">
          <TextInput
            type="date"
            label="Data Início"
            id="projectFormStartDate"
            name="startDate"
            onChange={props.handleChange}
            value={new Date(props.state.startDate).toISOString().split("T")[0]}
          />
        </div>

        <div className="col-auto">
          <TextInput
            type="date"
            label="Data Fim"
            id="projectFormEndDate"
            name="endDate"
            onChange={props.handleChange}
            value={new Date(props.state.endDate).toISOString().split("T")[0]}
          />
        </div>

        <div className="col-auto">
          <TextInput
            type="number"
            label="Orçamento"
            id="projectFormBudget"
            name="budget"
            onChange={props.handleChange}
            value={props.state.budget}
          />
        </div>
      </div>

      {props.loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-100 text-end">
          <button className="btn btn-primary">Salvar</button>
        </div>
      )}

      {props.error ? <ErrorMessage /> : null}
    </form>
  );
}

export default ProjectForm;
