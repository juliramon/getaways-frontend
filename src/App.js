import React, {useState} from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/homepage/Homepage";
import GlobalStyle from "./fonts/fonts";
import {Route, Switch} from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Feed from "./components/feed/Feed";
import ProtectedRoute from "./services/protectedRoute";
import Cookies from "js-cookie";
import Logout from "./components/auth/Logout";
import ActivityForm from "./components/composer/ActivityForm";
import Dashboard from "./components/dashboard/Dashboard";
import ActivityList from "./components/listings/ActivityList";
import Listing from "./components/listingPage/Listing";

function App() {
	let loggedData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
	const initialState = {
		loggedUser: loggedData,
	};
	const [state, setState] = useState(initialState);
	const getLoggedUser = (user) => {
		setState({loggedUser: user});
		Cookies.set("user", user, {expires: 7});
	};

	return (
		<div className="app">
			<GlobalStyle />
			<Switch>
				<Route exact path="/" render={() => <Homepage />} />
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
					path="/logout"
					render={(props) => (
						<Logout {...props} getUserDetails={getLoggedUser} />
					)}
				/>
				<ProtectedRoute
					exact
					path="/feed"
					user={state.loggedUser}
					component={Feed}
				/>
				<ProtectedRoute
					exact
					path="/activity-composer"
					user={state.loggedUser}
					component={ActivityForm}
				/>
				<ProtectedRoute
					exact
					path="/dashboard"
					user={state.loggedUser}
					component={Dashboard}
				/>
				<ProtectedRoute
					exact
					path="/activities"
					user={state.loggedUser}
					component={ActivityList}
				/>
				<Route
					exact
					path="/activities/:id"
					render={(props) => <Listing {...props} user={state.loggedUser} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
