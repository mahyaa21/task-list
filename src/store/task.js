import { action, makeObservable, observable } from "mobx";
class TasksStore {
  label = "دیجی اکسپرس‌";

  // TODO - design the data model
  tasks = {
    id: null,
    title: null,
    subTask: []
  };

  constructor() {
    makeObservable(this, {
      label: observable,
      tasks: observable,
      addTask: action
    });
  }

  // TODO - add needed methods to manipulate 'tasks'
  addTask(id, task) {
  }
  
  updateTask(id, property){
  }
  
  removeTask(id){
  }
}

export default new TasksStore();
