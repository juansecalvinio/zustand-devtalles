import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const openedTasks = useTaskStore((state) => state.getTaskByStatus("open"));
  const inProgressTasks = useTaskStore((state) =>
    state.getTaskByStatus("in-progress")
  );
  const doneTasks = useTaskStore((state) => state.getTaskByStatus("done"));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <JiraTasks title="Abiertas" status="open" tasks={openedTasks} />

        <JiraTasks
          title="En progreso"
          status="in-progress"
          tasks={inProgressTasks}
        />

        <JiraTasks title="Terminadas" status="done" tasks={doneTasks} />
      </div>
    </>
  );
};
