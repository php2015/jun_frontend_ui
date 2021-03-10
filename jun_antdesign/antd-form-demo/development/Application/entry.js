import "./Application.global.scss";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, NavLink } from "react-router-dom";

import TestCount from "../HooksTest/TestCount";
import TestFunction from "../HooksTest/TestFunction";

function Application(props) {
	return (
		<HashRouter>
			<div style={{ width: 900, margin: "0px auto" }}>
				<TestCount />
				<TestFunction />
			</div>
		</HashRouter>
	)
}


ReactDOM.render(<Application />, document.getElementById("AppView"))



