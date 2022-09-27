import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSquarePlus,
	faPlus,
	faTrashCan,
	faMinus,
} from "@fortawesome/free-solid-svg-icons";
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
	const [tasks, setTasks] = useState(renderInitialSubTask());
	function addSubTask(parentId, type) {
		const newChild =
			type === "group" ? renderInitialTask() : renderInitialSubTask();
		if (parentId) {
			const newSubTask = add(parentId, tasks?.subTask, newChild);
			setTasks({ ...tasks, subTask: [...newSubTask] });
		} else {
			const newSubTask = tasks?.subTask
				? [...tasks?.subTask, newChild]
				: [{ ...newChild }];
			setTasks({ ...tasks, subTask: [...newSubTask] });
		}
	}

	function removeSubTask(id) {
		if (id) {
			const subTask = remove(tasks?.subTask, id);
			console.log(subTask);
			setTasks({ ...tasks, subTask });
		} else {
			const subTask = [renderInitialSubTask()];
			setTasks({ ...tasks, subTask });
		}
	}

	function editSubTask(id, subTask) {
		const newTask = {
			...tasks,
			subTask: update(id, tasks.subTask, null, subTask),
		};
		setTasks({ ...newTask });
	}

	const renderConditionActions = (id) => (
		<div className="actionWrapper">
			{/*TODO add styles*/}
			<button className="actionBtnBlue" onClick={() => addSubTask(id, "group")}>
				<FontAwesomeIcon icon={faSquarePlus} className="fa-regular" />
			</button>
			<button className="actionBtnBlue" onClick={() => addSubTask(id, "sub")}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
			<button className="actionBtnRed" onClick={() => removeSubTask(id)}>
				<FontAwesomeIcon icon={faTrashCan} />
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
						<FontAwesomeIcon icon={faMinus} />
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
