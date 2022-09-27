import { action, makeObservable, observable } from "mobx";
class TasksStore {
  label = "TO DO LIST";
  description= "Do more what makes you happy!";
  taskList = {
		id: Date.now().toString(),
		title: null,
		subTask: [],
	};

  constructor() {
    makeObservable(this, {
      label: observable,
      taskList: observable,
      description: observable,
      updateTasks: action
    });
  }

  updateTasks(list) {
    this.taskList = { ...list }
  }
}

export default new TasksStore();
