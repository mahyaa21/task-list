import React from "react";
import "./App.scss";
import { observer } from "mobx-react";
import useStores from "./useStores";
import ToDoList from "./components/task/task";

// TODO - feel free to modify "App" content and develope the solution
const App = observer(() => {
	const { TasksStore } = useStores();
	console.log(TasksStore);
	return (
		<div className="App">
			{TasksStore.label}
			<div className="todolistContainer">
			<ToDoList TaskList={TasksStore.TaskList} getList={(list) => {TasksStore.updateTasks(list)}} />
			</div>
		</div>
	);
});

export default App;
