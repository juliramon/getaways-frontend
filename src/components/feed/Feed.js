import React, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import PublicationModal from "../modals/PublicationModal";
import ContentService from "../../services/contentService";
import PublicSquareBox from "../listings/PublicSquareBox";

const Feed = ({user}) => {
	const initialState = {
		loggedUser: user,
		isFetching: false,
		hasActivities: false,
		hasPlaces: false,
		userCustomActivities: [],
		userCustomPlaces: [],
	};
	const [state, setState] = useState(initialState);
	const service = new ContentService();
	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	useEffect(() => {
		const fetchData = async () => {
			setState({...state, isFetching: true});
			const userCustomActivities = await service.getUserCustomActivities();
			const userCustomPlaces = await service.getUserCustomPlaces();
			let hasActivities, hasPlaces, hasListings;
			userCustomActivities.length > 0
				? (hasActivities = true)
				: (hasActivities = false);
			userCustomPlaces.length > 0 ? (hasPlaces = true) : (hasPlaces = false);
			userCustomActivities.length > 0 && userCustomPlaces.length > 0
				? (hasListings = true)
				: (hasListings = false);
			setState({
				...state,
				hasListings: hasListings,
				hasActivities: hasActivities,
				hasPlaces: hasPlaces,
				userCustomActivities: userCustomActivities,
				userCustomPlaces: userCustomPlaces,
			});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const resultsToShow = [];
	if (state.userCustomActivities.length > 0) {
		state.userCustomActivities.map((el) => resultsToShow.push(el));
	}
	if (state.userCustomPlaces.length > 0) {
		state.userCustomPlaces.map((el) => resultsToShow.push(el));
	}

	let resultsList;
	if (!state.hasListings) {
		resultsList = (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	} else {
		resultsList = resultsToShow.map((el) => {
			let location;
			if (el.type === "activity") {
				location = (
					<span className="listing-location">{`${
						el.activity_locality === undefined ? "" : el.activity_locality
					}${el.activity_locality === undefined ? "" : ","} ${
						el.activity_province || el.activity_state
					}, ${el.activity_country}`}</span>
				);
			}
			if (el.type === "place") {
				location = (
					<span className="listing-location">{`${
						el.place_locality === undefined ? "" : el.place_locality
					}${el.place_locality === undefined ? "" : ","} ${
						el.place_province || el.place_state
					}, ${el.place_country}`}</span>
				);
			}
			return (
				<PublicSquareBox
					key={el._id}
					id={el._id}
					type={el.type}
					cover_url={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					rating={el.activity_rating || el.place_rating}
					location={location}
				/>
			);
		});
	}

	let topicsFollowed = [];
	if (state.loggedUser.typesToFollow.length > 0) {
		state.loggedUser.typesToFollow.map((el) => topicsFollowed.push(el));
	}
	if (state.loggedUser.categoriesToFollow.length > 0) {
		state.loggedUser.categoriesToFollow.map((el) => topicsFollowed.push(el));
	}
	if (state.loggedUser.seasonsToFollow.length > 0) {
		state.loggedUser.seasonsToFollow.map((el) => topicsFollowed.push(el));
	}
	if (state.loggedUser.regionsToFollow.length > 0) {
		state.loggedUser.regionsToFollow.map((el) => topicsFollowed.push(el));
	}

	const topicsList = topicsFollowed.map((el, idx) => (
		<li key={idx}>
			<Link to="/">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-hash"
					width="28"
					height="28"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="#2c3e50"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" />
					<line x1="5" y1="9" x2="19" y2="9" />
					<line x1="5" y1="15" x2="19" y2="15" />
					<line x1="11" y1="4" x2="7" y2="20" />
					<line x1="17" y1="4" x2="13" y2="20" />
				</svg>{" "}
				{el}
			</Link>
		</li>
	));

	return (
		<div id="feed">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/c_scale,q_100,w_135/v1600008855/getaways-guru/static-files/logo-getaways-guru_vvbikk.svg"
				}
				user={user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="user-meta">
								<div className="user-meta-wrapper">
									<div className="avatar avatar-s">
										<img
											src={state.loggedUser.avatar}
											alt={state.loggedUser.fullName}
										/>
									</div>
									<div className="user-text">
										<p>Welcome back,</p>
										<h1>{user.fullName}</h1>
									</div>
								</div>
							</div>
							<div className="weather-meta"></div>
							<div className="left-menu">
								<div className="topics">
									<p>Topics you follow</p>
									<ul className="menu-topics">{topicsList}</ul>
								</div>
								<div className="content">
									<p>Explore and engage</p>
									<ul>
										<li>
											<Link to="/users">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-users"
													width="28"
													height="28"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="#0D1F44"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<circle cx="9" cy="7" r="4" />
													<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
													<path d="M16 3.13a4 4 0 0 1 0 7.75" />
													<path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
												</svg>
												Community
											</Link>
										</li>
									</ul>
								</div>
								<div className="links">
									<p>Manage your account</p>
									<ul>
										<li>
											<Link to="/dashboard">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-layout-list"
													width="28"
													height="28"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="#0D1F44"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<rect x="4" y="4" width="16" height="6" rx="2" />
													<rect x="4" y="14" width="16" height="6" rx="2" />
												</svg>
												Dashboard
											</Link>
										</li>
										<li>
											<Link to={`/bookmarks`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-bookmark"
													width="28"
													height="28"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="#0D1F44"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
												</svg>
												Bookmarks
											</Link>
										</li>
										<li>
											<Link to={`/users/${state.loggedUser._id}`}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-user"
													width="28"
													height="28"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="#0D1F44"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path stroke="none" d="M0 0h24v24H0z" />
													<circle cx="12" cy="7" r="4" />
													<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
												</svg>
												Profile
											</Link>
										</li>
									</ul>
								</div>
								<div className="new">
									<Button
										className="btn btn-primary text-center sidebar"
										onClick={handleModalVisibility}
									>
										Add getaway
									</Button>
								</div>
							</div>
						</div>
						<div className="col center">
							<div className="col-title">
								<p className="small">Results based on the topics you follow</p>
							</div>
							<div className="col-results">{resultsList}</div>
						</div>
					</div>
				</Row>
			</Container>
			<PublicationModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
			/>
		</div>
	);
};

export default Feed;
