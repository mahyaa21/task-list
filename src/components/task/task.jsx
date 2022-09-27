import React, { useState, useMemo } from "react";
import SubTask from "./subTask";
import { add, remove, update } from "./utils";
import "./task.scss";

const renderInitialTask = () => {
	return {
		id: Date.now().toString(),
		title: null,
		subTask: [
			{
				id: "1" + Date.now().toString(),
				title: null,
				subTask: [],
			},
		],
	};
};
const renderInitialSubTask = () => {
	return {
		id: Date.now().toString(),
		title: null,
		subTask: [],
	};
};

const ToDoList = () => {
	const [tasks, setTask] = useState(renderInitialSubTask());
	function addSubTask(parentId, type) {
		const newChild =
			type === "group" ? renderInitialTask() : renderInitialSubTask();
		if (parentId) {
			const newSubTask = add(parentId, tasks?.subTask, newChild);
			setTask({ ...tasks, subTask: [...newSubTask] });
		} else {
			const newSubTask = tasks?.subTask
				? [...tasks?.subTask, newChild]
				: [{ ...newChild }];
			setTask({ ...tasks, subTask: [...newSubTask] });
		}
	}

	function removeSubTask(id) {
		if (id) {
			const subConditions = remove(tasks?.subTask, id);
			console.log({ ...tasks, subConditions });
		} else {
			const subConditions = [renderInitialSubTask()];
			console.log({ ...tasks, subConditions });
		}
	}

	function editSubTask(id, subTask) {
		const newTask = {
			...tasks,
			subTask: update(id, tasks.subTask, null, subTask),
		};
		setTask({ ...newTask });
	}

	const renderConditionActions = (id) => (
		<div className="actionWrapper">
			{/*TODO add styles*/}
			<button className="actionBtnBlue" onClick={() => addSubTask(id, "group")}>
				<span className="icon-outlineGroupIcon" />
				addTask
			</button>
			<button className="actionBtnBlue" onClick={() => addSubTask(id, "sub")}>
				<span className="icon-outlinePlusIcon" />
				addSubTask
			</button>
			<button className="actionBtnRed" onClick={() => removeSubTask(id)}>
				<span className="icon-outlineMinusIcon" />
				remove
				{/*TODO add font-awesome icon*/}
			</button>
		</div>
	);

	const Sub = (item, index) => (
		<li>
			<div className="subConditionContainer">
				<SubTask
					subTask={item}
					onChange={(updatedTask) => editSubTask(item.id, updatedTask)}
				/>
				<div className="removeBtnContainer">
					<button className="removeBtn" onClick={() => removeSubTask(item.id)}>
						<span className="icon-outlineMinusIcon" />
					</button>
				</div>
			</div>
		</li>
	);

	const Group = (item) => (
		<li className="groupContainer">
			<div className="groupBtnContainer">{renderConditionActions(item.id)}</div>
			<ul className="mainLevelCondition">
				{item?.subTask?.map((tsk, index) => {
					return tsk?.subTask?.length ? Group(tsk) : Sub(tsk, index);
				})}
			</ul>
		</li>
	);
	const renderTask = useMemo(
		() => (
			<>
				<div className="groupBtnContainer">{renderConditionActions(null)}</div>
				<ul className="mainLevelCondition">
					{tasks?.subTask?.map((tsk, index) =>
						tsk?.subTask?.length ? Group(tsk) : Sub(tsk, index)
					)}
				</ul>
			</>
		),
		[tasks]
	);
	return <div>{renderTask}</div>;
};

export default ToDoList;
