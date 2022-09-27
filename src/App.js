import React from "react";
import "./App.scss";
import { observer } from "mobx-react";
import useStores from "./useStores";
import ToDoList from "./components/task/task";
const App = observer(() => {
	const { TasksStore } = useStores();
	console.log(TasksStore);
	return (
		<div className="App">
			<div className="label">{TasksStore.label}</div>
			<div className="description">{TasksStore.description}</div>
			<div className="todolistContainer">
				<ToDoList
					TaskList={TasksStore.TaskList}
					getList={(list) => {
						TasksStore.updateTasks(list);
					}}
				/>
			</div>
		</div>
	);
});

export default App;
