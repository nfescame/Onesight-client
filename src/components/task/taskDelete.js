import api from "../../apis/api";

async function taskDelete(taskId, setTaskCreated) {
  const result = await api.delete(`/task/${taskId}`);

  setTaskCreated(true);

  return result;
}

export default taskDelete;
