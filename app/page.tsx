"use client";
import { useState, useReducer } from "react";
import { InputText, TodoItem, Button } from "@/components";

import { TypeAction, tasksReducer } from "@/reducer";
import { Task } from "@/class/task";
import Swal from "sweetalert2";

import { IoChevronBackCircleOutline } from "react-icons/io5";

interface IPayload {
  id: string;
  value?: string;
}

export default function Home() {
  const [{ tasks }, dispach] = useReducer(tasksReducer, {
    tasks: Array<Task>(),
  });
  const [currentItem, setCurrentItem] = useState<Task>();
  const [value, setValue] = useState<string>("");
  const [showResultMessage, setShowResultMessage] = useState<boolean>(true);

  const validateValue = (value: string): boolean => {
    if (!value || typeof value !== "string") {
      return false;
    }

    return true;
  };

  const handleDeleteTask = async (id: string) => {
    const payload: IPayload = {
      id,
    };

    if (currentItem) {
      payload.id = currentItem.id;
      payload.value = id;
    }

    return Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isto posteriormente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispach({
          type: currentItem
            ? TypeAction.DECREMENT_SBTASK
            : TypeAction.DECREMENT,
          payload,
        });

        if (showResultMessage) {
          const { value: accept } = await Swal.fire({
            title: "Deletado",
            text: "Sua task foi deletada com sucesso.",
            icon: "success",
            input: "checkbox",
            inputValue: 1,
            inputPlaceholder: "Sempre mostrar está mensagem.",
            confirmButtonText: "Ok",
            confirmButtonColor: "#000000",
          });

          if (!accept) {
            setShowResultMessage(false);
          }
        }
      }
    });
  };

  const handleSwitchStatusTask = (isChecked: boolean, id: string): void => {
    const finishType = !!currentItem
      ? TypeAction.FINISH_SBTASK
      : TypeAction.FINISH_TASK;

    const unfinishType = !!currentItem
      ? TypeAction.UNFINISH_SBTASK
      : TypeAction.UNFINISH_TASK;

    const payload: IPayload = {
      id,
    };

    if (currentItem) {
      payload.id = currentItem.id;
      payload.value = id;
    }

    isChecked
      ? dispach({
          type: finishType,
          payload,
        })
      : dispach({
          type: unfinishType,
          payload,
        });
  };

  const handleAddTask = (): void => {
    if (!validateValue(value)) return;

    dispach({
      type: TypeAction.INCREMENT,
      payload: { value },
    });
  };

  const handleAddSubTask = (): void => {
    if (!validateValue(value)) return;

    dispach({
      type: TypeAction.INCREMENT_SBTASK,
      payload: { value, id: currentItem?.id },
    });
  };

  const data = currentItem ? currentItem.subTasks : tasks;

  return (
    <main className="flex w-full h-full flex-col sm:p-8 pt-8">
      <div className="flex flex-col gap-8">
        <div className="w-full h-full  flex justify-center items-center">
          {currentItem && (
            <div className="sm:mr-10">
              <IoChevronBackCircleOutline
                className="sm:h-16 sm:w-16 h-10 w-10"
                onClick={() => setCurrentItem(undefined)}
              />
            </div>
          )}
          <div className=" flex flex-col justify-center items-center">
            <h1 className="sm:text-4xl text-xl font-bold text-gray-900 max-w-[300px] truncate">
              {currentItem ? currentItem.getTitle() : "To-do List"}
            </h1>
            <p className="text-gray-700">Project by Lucianozr</p>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <InputText value={value} setValue={setValue} />

            {!!currentItem ? (
              <Button onClick={() => handleAddSubTask()}>Nova Subtarefa</Button>
            ) : (
              <Button onClick={() => handleAddTask()}>Nova Tarefa</Button>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-5 w-full items-center">
            {data
              .filter((t) => !t.isDeleted)
              .map((task) => {
                return (
                  <TodoItem
                    key={task.id}
                    isSubtask={!!currentItem}
                    setCurrentItem={setCurrentItem}
                    handleDeleteTask={handleDeleteTask}
                    handleSwitchStatusTask={handleSwitchStatusTask}
                    task={task}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
