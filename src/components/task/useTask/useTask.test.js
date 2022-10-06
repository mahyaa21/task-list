import { renderHook } from "@testing-library/react";
import useTask from "./useTask";

const SINGLE_TASK = {
	id: "1665041624753",
	title: "bye",
	subTask: [],
};
const TASK_LIST_MOCK = {
	id: "1665041624743",
	title: "hello",
	subTask: [
		{
			id: "1665041624745",
			title: "hello",
			subTask: [],
		},
		{
			id: "1665041624746",
			title: "hello",
			subTask: [{ id: "1665041624747", title: "hello", subTask: [] }],
		},
		{
			id: "1665041624748",
			title: "hello",
			subTask: [],
		},
	],
};

const UPDATED_SINGLE_TASK = {
	id: "1665041624743",
	title: "hello",
	subTask: [
		{
			id: "1665041624745",
			title: "hello",
			subTask: [],
		},
		{
			id: "1665041624746",
			title: "salam",
			subTask: [{ id: "1665041624747", title: "hello", subTask: [] }],
		},
		{
			id: "1665041624748",
			title: "hello",
			subTask: [],
		},
	],
};

const REMOVED_TASK_LIST = {
	id: "1665041624743",
	title: "hello",
	subTask: [
		{
			id: "1665041624745",
			title: "hello",
			subTask: [],
		},
		{
			id: "1665041624748",
			title: "hello",
			subTask: [],
		},
	],
};

const ADDED_TASK_LIST = {
	id: "1665041624743",
	title: "hello",
	subTask: [
		{
			id: "1665041624745",
			title: "hello",
			subTask: [],
		},
		{
			id: "1665041624746",
			title: "hello",
			subTask: [
				{ id: "1665041624747", title: "hello", subTask: [] },
				{
					id: "1665041624753",
					title: "bye",
					subTask: [],
				},
			],
		},
		{
			id: "1665041624748",
			title: "hello",
			subTask: [],
		},
	],
};

test("task list should be updated", () => {
	const { result } = renderHook(() => useTask());
	expect(
		result.current
			.update("1665041624746", TASK_LIST_MOCK, "title", "salam")
			.toString()
	).toBe(UPDATED_SINGLE_TASK.toString());
});

test("task list should be removed an element", () => {
	const { result } = renderHook(() => useTask());
	expect(
		result.current.remove(TASK_LIST_MOCK.subTask, "1665041624746").toString()
	).toBe(REMOVED_TASK_LIST.subTask.toString());
});

test("task list should be add an element", () => {
	const { result } = renderHook(() => useTask());
	expect(
		result.current
			.add("1665041624746", TASK_LIST_MOCK.subTask, SINGLE_TASK)
			.toString()
	).toBe(ADDED_TASK_LIST.subTask.toString());
});
