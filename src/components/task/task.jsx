import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSquarePlus,
	faPlus,
	faTrashCan,
	faMinus,
} from "@fortawesome/free-solid-svg-icons";
import SubTask from "./subTask";
import useTask from "./useTask";
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

const ToDoList = ({ getList, TaskList }) => {
	const [tasks, setTasks] = useState(TaskList);
	const { add, remove, update } = useTask();

	useEffect(() => {
		getList(tasks);
	}, [tasks]);

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

	const renderTaskActions = (id) => (
		<div className="actionWrapper">
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
			<div className="subTaskContainer">
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
			<div className="groupBtnContainer">{renderTaskActions(item.id)}</div>
			<ul className="mainLevelTask">
				{item?.subTask?.map((tsk, index) => {
					return tsk?.subTask?.length ? Group(tsk) : Sub(tsk, index);
				})}
			</ul>
		</li>
	);
	const renderTask = useMemo(
		() => (
			<>
				<div className="groupBtnContainer">{renderTaskActions(null)}</div>
				<ul className="mainLevelTask">
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
