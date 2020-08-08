import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/homepage/Homepage";
import GlobalStyle from "./fonts/fonts";
import {Route, Switch} from "react-router-dom";
import Signup from "./components/auth/Signup";

function App() {
	return (
		<div className="app">
			<GlobalStyle />
			<Switch>
				<Route exact path="/" render={(props) => <Homepage />} />
				<Route exact path="/signup" render={(props) => <Signup />} />
			</Switch>
		</div>
	);
}

export default App;
