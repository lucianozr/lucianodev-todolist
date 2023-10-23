import { Task } from "@/class/task";
import { AiOutlineClose } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";

type TodoItemProps = {
  task: Task;
  isSubtask: boolean;
  handleDeleteTask: (id: string) => void;
  handleSwitchStatusTask: (isChecked: boolean, id: string) => void;
  setCurrentItem: (task: Task) => void;
};

const TodoItem = ({
  task,
  setCurrentItem,
  handleSwitchStatusTask,
  handleDeleteTask,
  isSubtask,
}: TodoItemProps) => {
  const handleAcessSubtask = (task: Task) => {
    if (!isSubtask) {
      setCurrentItem(task);
    }
  };

  return (
    <div
      key={task.id}
      className={
        "ease-in-out duration-300 todo-item flex justify-between items-center border rounded w-[300px] sm:w-[400px] gap-2 p-6 hover:border-gray-500"
      }
      style={{
        backgroundImage: `-webkit-linear-gradient(left, #a5dc86 ${task.getCompletionPercentage()}%, transparent ${task.getIrregularPercentage()}%, transparent 100%)`,
      }}
    >
      <h1
        className="truncate cursor-pointer"
        onClick={() => handleAcessSubtask(task)}
      >
        {task.getTitle()}
      </h1>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-4 h-4 cursor-pointer"
          onChange={({ target }) =>
            handleSwitchStatusTask(target.checked, task.id)
          }
          checked={task.isFinished}
        />
        <div className="flex items-center gap-1">
          {!isSubtask && (
            <>
              <FaTasks />
              <span>{task.getSubTasks().length}</span> <span>-</span>
            </>
          )}

          <span>{task.getCompletionPercentage()}%</span>
        </div>
        <AiOutlineClose
          className="delete-icon hidden cursor-pointer"
          onClick={() => handleDeleteTask(task.id)}
        />
      </div>
    </div>
  );
};

export { TodoItem };
