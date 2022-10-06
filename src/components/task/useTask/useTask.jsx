import React from "react";

function useTask() {
	function update(id, arrayData, property, value) {
		for (let i = 0; i < arrayData.length; i++) {
			if (arrayData[i].id === id) {
				if (property) {
					arrayData[i][property] = value;
				} else {
					arrayData[i] = value;
				}
			} else if (arrayData[i].subTask?.length > 0) {
				update(id, arrayData[i].subTask, property, value);
			}
		}
		return arrayData;
	}

	function remove(parent, childIdToRemove) {
		parent = parent?.filter((child) => child.id !== childIdToRemove)?.map((child) => {
				if (child?.subTask?.length) {
					return {
						...child,
						subTask: remove(child?.subTask, childIdToRemove),
					};
				} else {
					return child;
				}
			});
		return parent;
	}

	function add(id, arrayData={}, newChild) {
		for (let i = 0; i < arrayData.length; i++) {
			if (arrayData[i].id === id) {
				arrayData[i] = {
					...arrayData[i],
					subTask: [...arrayData[i].subTask, newChild],
				};
			} else if (arrayData[i].subTask?.length > 0) {
				add(id, arrayData[i].subTask, newChild);
			}
		}
		return arrayData;
	}

	return {
		add,
		update,
		remove,
	};
}

export default useTask;