import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Status, Task } from "../../interfaces";
import { customSessionStorage } from "../storages/session.storage";

const TASK_STORAGE_ID = "tasks-storage";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; // {[key: string]: Task}
  addTask: (title: string, status: Status) => void;
  changeStatus: (taskId: string, status: Status) => void;
  getTaskByStatus: (status: Status) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  onTaskDrop: (status: Status) => void;
}

const storeApi: StateCreator<
  TaskState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "712d66c4-bf9b-4b47-aa08-1ce0d12dca91": {
      id: "712d66c4-bf9b-4b47-aa08-1ce0d12dca91",
      title: "Task #1",
      status: "open",
    },
    "55d416c2-4217-421b-a07e-0b3f04c7dd6a": {
      id: "55d416c2-4217-421b-a07e-0b3f04c7dd6a",
      title: "Task #2",
      status: "in-progress",
    },
    "ece2164f-c5a9-4034-be17-2a995d8da75b": {
      id: "ece2164f-c5a9-4034-be17-2a995d8da75b",
      title: "Task #3",
      status: "open",
    },
  },
  addTask: (title: string, status: Status) => {
    // title: `Task #${Object.values(get().tasks).length + 1}`,
    const newTask: Task = { id: uuid(), title, status };

    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
  },
  changeStatus: (taskId: string, status: Status) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
  getTaskByStatus: (status: Status) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, "setDragging");
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, "removeDragging");
  },
  onTaskDrop: (status: Status) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(storeApi, {
      name: TASK_STORAGE_ID,
      storage: customSessionStorage,
    }),
    {
      name: TASK_STORAGE_ID,
    }
  )
);
