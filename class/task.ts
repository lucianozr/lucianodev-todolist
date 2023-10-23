import { idGenerator } from "@/util/randomId";

export class Task {
  id: string;
  title: string;
  isDeleted: boolean;
  isFinished: boolean;
  subTasks: Task[];

  constructor(title: string) {
    this.title = title;
    this.id = idGenerator();
    this.isDeleted = false;
    this.isFinished = false;
    this.subTasks = Array<Task>();
  }

  addSubTask(title: string): void {
    this.subTasks.push(new Task(title));
  }

  deleteSubTask(id: string): void {
    const subTask = this.subTasks.find((t) => t.id === id);
    subTask?.delete();
  }

  delete(): void {
    this.isDeleted = true;
  }

  finish(): void {
    this.isFinished = true;
  }

  unfinish(): void {
    this.isFinished = false;
  }

  finishSubTask(id: string): void {
    const subtask = this.subTasks.find((t) => t.id === id);
    subtask?.finish();
  }

  unfinishSubTask(id: string): void {
    const subtask = this.subTasks.find((t) => t.id === id);
    subtask?.unfinish();
  }

  getTitle(): string {
    return this.title;
  }

  getSubTasks() {
    return this.subTasks.filter((s) => !s.isDeleted);
  }

  getCompletionPercentage(): string {
    const completedSbTasks: number = this.getSubTasks().length
      ? this.getSubTasks()?.reduce((total, subTask: Task) => {
          if (subTask.isFinished) {
            total += 1;
          }

          return total;
        }, 0)
      : 0;

    const totalTasks: number = this.getSubTasks().length + 1;
    let totalFinishedTasks: number = completedSbTasks;

    if (this.isFinished) {
      totalFinishedTasks++;
    }

    return ((totalFinishedTasks / totalTasks) * 100).toFixed(2);
  }

  getIrregularPercentage(): string {
    const completedSbTasks: number = this.getSubTasks().length
      ? this.getSubTasks()?.reduce((total, subTask: Task) => {
          if (subTask.isFinished) {
            total += 1;
          }

          return total;
        }, 0)
      : 0;

    const totalTasks: number = this.getSubTasks().length + 1;
    let totalFinishedTasks: number = completedSbTasks;

    if (this.isFinished) {
      totalFinishedTasks++;
    }

    const number = (totalFinishedTasks / totalTasks) * 100 + 3;

    return number.toFixed(2);
  }
}
