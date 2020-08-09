import React, {useState} from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/homepage/Homepage";
import GlobalStyle from "./fonts/fonts";
import {Route, Switch} from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Feed from "./components/feed/Feed";

function App() {
	const initialState = {
		loggedUser: null,
	};
	const [state, setState] = useState(initialState);
	const getLoggedUser = (user) => {
		setState({loggedUser: user});
	};
	return (
		<div className="app">
			<GlobalStyle />
			<Switch>
				<Route exact path="/" render={(props) => <Homepage />} />
				<Route
					exact
					path="/signup"
					render={(props) => (
						<Signup {...props} getUserDetails={getLoggedUser} />
					)}
				/>
				<Route
					exact
					path="/login"
					render={(props) => (
						<Login {...props} getUserDetails={getLoggedUser} />
					)}
				/>
				<Route
					exact
					path="/feed"
					render={(props) => <Feed {...props} user={state.loggedUser} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
