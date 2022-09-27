import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import TasksStore from "./store/task";

const stores = {
	TasksStore,
};

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<Provider {...stores}>
			<App />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
