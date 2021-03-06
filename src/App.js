import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import {useCookies} from "react-cookie";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./fonts/fonts";
import ProtectedRoute from "./services/protectedRoute";
import Homepage from "./components/homepage/Homepage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Feed from "./components/feed/Feed";
import ActivityForm from "./components/composer/ActivityForm";
import Dashboard from "./components/dashboard/Dashboard";
import ActivityList from "./components/listings/ActivityList";
import ActivityListing from "./components/listingPage/ActivityListing";
import UserProfile from "./components/userProfile/UserProfile";
import UsersList from "./components/listings/UsersList";
import PlaceForm from "./components/composer/PlaceForm";
import PlaceListing from "./components/listingPage/PlaceListing";
import StoryForm from "./components/composer/StoryForm";
import StoryListing from "./components/listingPage/StoryListing";
import ActivityEditionForm from "./components/composer/ActivityEditionForm";
import PlaceEditionForm from "./components/composer/PlaceEditionForm";
import StoryEditionForm from "./components/composer/StoryEditionForm";
import PlaceList from "./components/listings/PlaceList";
import StoryList from "./components/listings/StoryList";
import BookmarksList from "./components/listings/BookmarksList";
import PageNotFound from "./components/errorPage/PageNotFound";
import Search from "./components/listings/Search";
import CompleteAccount from "./components/auth/CompleteAccount";

function App() {
	const [cookies, setCookie, removeCookie] = useCookies("");
	let loggedData;
	if (cookies.loggedInUser && cookies.loggedInUser !== null) {
		loggedData = cookies.loggedInUser;
	}
	const initialState = {
		loggedUser: loggedData,
	};
	const [state, setState] = useState(initialState);
	let cookieCreationDate = new Date();
	let cookieExpirationDate = new Date();
	cookieExpirationDate.setFullYear(cookieCreationDate.getFullYear() + 1);
	const getLoggedUser = (user) => {
		setState({loggedUser: user});
		setCookie("loggedInUser", user, {expires: cookieExpirationDate});
	};
	const refreshUserData = (updatedUser) => {
		removeCookie("loggedInUser", updatedUser);
		setState({loggedUser: updatedUser});
		setCookie("loggedInUser", updatedUser, {expires: cookieExpirationDate});
	};
	return (
		<div className="app">
			<GlobalStyle />
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => <Homepage {...props} user={state.loggedUser} />}
				/>
				<Route
					exact
					path="/signup"
					render={(props) => (
						<Signup
							{...props}
							user={state.loggedUser}
							getUserDetails={getLoggedUser}
						/>
					)}
				/>
				<Route
					exact
					path="/signup/complete-account"
					render={(props) => (
						<CompleteAccount
							{...props}
							user={state.loggedUser}
							refreshUserData={refreshUserData}
						/>
					)}
				/>
				<Route
					exact
					path="/login"
					render={(props) => (
						<Login
							{...props}
							user={state.loggedUser}
							getUserDetails={getLoggedUser}
						/>
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
					path="/place-composer"
					user={state.loggedUser}
					component={PlaceForm}
				/>
				<ProtectedRoute
					exact
					path="/story-composer"
					user={state.loggedUser}
					component={StoryForm}
				/>
				<ProtectedRoute
					exact
					path="/dashboard"
					user={state.loggedUser}
					component={Dashboard}
				/>
				<Route
					exact
					path="/activities"
					render={(props) => (
						<ActivityList {...props} user={state.loggedUser} />
					)}
				/>
				<Route
					exact
					path="/places"
					render={(props) => <PlaceList {...props} user={state.loggedUser} />}
				/>
				<Route
					exact
					path="/stories"
					render={(props) => <StoryList {...props} user={state.loggedUser} />}
				/>
				<ProtectedRoute
					path="/activities/:id/edit"
					user={state.loggedUser}
					component={ActivityEditionForm}
				/>
				<ProtectedRoute
					path="/places/:id/edit"
					user={state.loggedUser}
					component={PlaceEditionForm}
				/>
				<ProtectedRoute
					path="/stories/:id/edit"
					user={state.loggedUser}
					component={StoryEditionForm}
				/>
				<Route
					exact
					path="/activities/:id"
					render={(props) => (
						<ActivityListing {...props} user={state.loggedUser} />
					)}
				/>
				<Route
					exact
					path="/places/:id"
					render={(props) => (
						<PlaceListing {...props} user={state.loggedUser} />
					)}
				/>
				<Route
					exact
					path="/stories/:id"
					render={(props) => (
						<StoryListing {...props} user={state.loggedUser} />
					)}
				/>
				<Route
					exact
					path="/users/:id"
					render={(props) => (
						<UserProfile
							{...props}
							user={state.loggedUser}
							getUserDetails={getLoggedUser}
						/>
					)}
				/>
				<Route
					exact
					path="/users"
					render={(props) => <UsersList {...props} user={state.loggedUser} />}
				/>
				<ProtectedRoute
					path="/bookmarks"
					user={state.loggedUser}
					component={BookmarksList}
				/>
				<Route
					exact
					path="/search"
					render={(props) => <Search {...props} user={state.loggedUser} />}
				/>
				<Route path="*" component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;
