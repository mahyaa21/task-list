import { action, makeObservable, observable } from "mobx";
class TasksStore {
  label = "دیجی اکسپرس‌";
  taskList = {
		id: Date.now().toString(),
		title: null,
		subTask: [],
	};

  constructor() {
    makeObservable(this, {
      label: observable,
      taskList: observable,
      updateTasks: action
    });
  }

  // TODO - add needed methods to manipulate 'tasks'
  updateTasks(list) {
    this.taskList = { ...list }
  }
}

export default new TasksStore();
