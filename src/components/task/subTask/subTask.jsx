import React, { useEffect, useState } from "react";
import "../task.scss";

const SubTask = ({ subTask, onChange }) => {
	const [subTaskTitle, setSubTaskTitle] = useState(subTask.title);

	useEffect(()=>{
	    const newSubTask ={
            ...subTask,
            title: subTaskTitle
        }
	    onChange(newSubTask);
	},[subTaskTitle, subTask.title])

	return (
			<input
				value={subTaskTitle}
				onChange={(e) => setSubTaskTitle(e.target.value)}
			/>
	);
};

export default SubTask;