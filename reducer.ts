import { Task } from "./class/task";

export enum TypeAction {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  INCREMENT_SBTASK = "increment_sbtask",
  DECREMENT_SBTASK = "decrement_sbtask",
  DELETE_TASK = "delete_task",
  SWITCH_STATUS = "switch_status_task",
  FINISH_TASK = "finish_task",
  UNFINISH_TASK = "unfinish_task",
  FINISH_SBTASK = "finish_sbtask",
  UNFINISH_SBTASK = "unfinish_sbtask",
}

interface IPayload {
  id?: string;
  value?: string;
}

interface TaskAction {
  type: TypeAction;
  payload: IPayload;
}

export interface TasksState {
  tasks?: Task[];
}

export type initTasksState = {
  tasks: Array<Task>;
};

export const tasksReducer = (
  state: initTasksState,
  action: TaskAction
): initTasksState => {
  const { type, payload } = action;
  const { tasks } = state;
  const index = tasks.findIndex((log) => log.id === payload.id);
  const task = tasks[index];

  switch (type) {
    case "increment":
      if (!payload.value) {
        throw new Error("Invalid increment");
      }

      return {
        ...state,
        tasks: [...tasks, new Task(payload.value)],
      };
    case "decrement":
      task?.delete();

      return {
        ...state,
        tasks,
      };
    case "increment_sbtask":
      if (!payload.value || !payload.id) {
        throw new Error("Invalid increment");
      }

      task?.addSubTask(payload.value);

      return {
        ...state,
        tasks,
      };
    case "decrement_sbtask":
      if (!payload.id || !payload.value) {
        throw new Error("Invalid decrement");
      }

      task?.deleteSubTask(payload.value);

      return {
        ...state,
        tasks,
      };
    case "finish_task":
      task?.finish();

      return {
        ...state,
        tasks,
      };
    case "unfinish_task":
      task.unfinish();

      return {
        ...state,
        tasks,
      };

    case "finish_sbtask":
      if (!payload.value || !payload.id) {
        throw new Error("Invalid Finish!");
      }

      task.finishSubTask(payload.value);

      return {
        ...state,
        tasks,
      };
    case "unfinish_sbtask":
      if (!payload.value || !payload.id) {
        throw new Error("Invalid Finish!");
      }

      task.unfinishSubTask(payload.value);

      return {
        ...state,
        tasks,
      };

    default:
      return state;
  }
};
