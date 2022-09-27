import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import useStores from "./useStores";
import ToDoList from "./components/task/task";

// TODO - feel free to modify "App" content and develope the solution
const App = observer(() => {
  const { TasksStore } = useStores();
  return (
    <div className="App">
      {TasksStore.label}
      <ToDoList />
    </div>
  );
});

export default App;
