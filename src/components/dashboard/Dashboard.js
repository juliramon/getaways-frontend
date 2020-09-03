import React, {useEffect, useState, useCallback} from "react";
import {Container, Row, Button, Spinner} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import ContentService from "../../services/contentService";
import ContentBox from "./ContentBox";
import PublicationModal from "../modals/PublicationModal";

const Dashboard = ({user}) => {
	const initialState = {
		loggedUser: user,
		allListings: [],
		activities: [],
		places: [],
		stories: [],
		hasListings: false,
		hasActivities: false,
		hasPlaces: false,
		hasStories: false,
		sortedTitle: false,
		activeTab: "all",
	};
	const [state, setState] = useState(initialState);

	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	const service = new ContentService();

	const getAllListings = async () => {
		const userActivities = await service.userActivities(state.loggedUser._id);
		const userPlaces = await service.getUserPlaces(state.loggedUser._id);
		let allListings = [];
		userActivities.map((el) => allListings.push(el));
		userPlaces.map((el) => allListings.push(el));
		setState({...state, allListings: allListings, activeTab: "all"});
	};

	useEffect(() => {
		const fetchData = async () => {
			const userActivities = await service.userActivities(state.loggedUser._id);
			const userPlaces = await service.getUserPlaces(state.loggedUser._id);
			let getAllListings = [];
			let hasListings, hasActivities, hasPlaces;
			userActivities.length > 0
				? (hasActivities = true)
				: (hasActivities = false);
			userPlaces.length > 0 ? (hasPlaces = true) : (hasPlaces = false);
			userActivities.length > 0 || userPlaces.length > 0
				? (hasListings = true)
				: (hasListings = false);
			userActivities.map((el) => getAllListings.push(el));
			userPlaces.map((el) => getAllListings.push(el));
			setState({
				...state,
				allListings: getAllListings,
				activities: userActivities,
				places: userPlaces,
				hasListings: hasListings,
				hasActivities: hasActivities,
				hasPlaces: hasPlaces,
			});
		};
		fetchData();
	}, []);

	const fetchData = useCallback(async () => {
		const userActivities = await service.userActivities(state.loggedUser._id);
		const userPlaces = await service.getUserPlaces(state.loggedUser._id);
		let hasListings, hasActivities, hasPlaces;
		userActivities.length > 0
			? (hasActivities = true)
			: (hasActivities = false);
		userPlaces.length > 0 ? (hasPlaces = true) : (hasPlaces = false);
		userActivities.length > 0 || userPlaces.length > 0
			? (hasListings = true)
			: (hasListings = false);
		let getAllListings = [];
		userActivities.map((el) => getAllListings.push(el));
		userPlaces.map((el) => getAllListings.push(el));
		setState({
			...state,
			allListings: getAllListings,
			activities: userActivities,
			places: userPlaces,
			hasListings: hasListings,
			hasActivities: hasActivities,
			hasPlaces: hasPlaces,
		});
	}, [service, state]);

	if (state.hasListings === false) {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	let noresults = (
		<div className="box empty d-flex">
			<div className="media">
				<img src="../../no-results.svg" alt="" />
			</div>
			<div className="text">
				<p>
					Oh no, this looks so empty.
					<br />
					Let's create your first activity to inspire others.
				</p>
				<Button
					className="btn btn-primary text-center"
					onClick={handleModalVisibility}
				>
					Add getaway
				</Button>
			</div>
		</div>
	);

	const sortTitle = (arr) => {
		if (state.sortedTitle === false || state.sortedTitle === "ZtoA") {
			const sortedArr = arr
				.sort((a, b) => {
					if (a.title > b.title) {
						return -1;
					}
					if (a.title < b.title) {
						return 1;
					}
					return 0;
				})
				.reverse();
			setState({...state, allListings: sortedArr, sortedTitle: "AtoZ"});
		} else if (state.sortedTitle === "AtoZ") {
			const sortedArr = arr.sort((a, b) => {
				if (a.title > b.title) {
					return -1;
				}
				if (a.title < b.title) {
					return 1;
				}
				return 0;
			});
			setState({...state, allListings: sortedArr, sortedTitle: "ZtoA"});
		}
	};

	let arrToSort;
	if (state.activeTab === "all") {
		arrToSort = state.allListings;
		console.log(arrToSort);
	} else if (state.activeTab === "activities") {
		arrToSort = state.activities;
		console.log(arrToSort);
	} else if (state.activeTab === "places") {
		arrToSort = state.places;
		console.log(arrToSort);
	} else {
		arrToSort = state.stories;
		console.log(arrToSort);
	}

	let filterBox, listings;
	if (state.hasListings === true) {
		filterBox = (
			<div className="filter-box d-flex align-items-center justify-content-between">
				<Button variant="none">Image</Button>
				<Button
					variant="none"
					className="filter"
					onClick={() => sortTitle(arrToSort)}
				>
					Title
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-arrows-sort"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#212529"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<path d="M3 9l4-4l4 4m-4 -4v14" />
						<path d="M21 15l-4 4l-4-4m4 4v-14" />
					</svg>
				</Button>
				<Button variant="none" className="filter">
					Subtitle
				</Button>
				<Button variant="none" className="filter">
					Date
				</Button>
				<Button variant="none">Actions</Button>
			</div>
		);
		if (state.activeTab === "all") {
			listings = state.allListings.map((el) => (
				<ContentBox
					key={el._id}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "activities") {
			listings = state.activities.map((el) => (
				<ContentBox
					key={el._id}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "places") {
			listings = state.places.map((el) => (
				<ContentBox
					key={el._id}
					type={el.type}
					id={el._id}
					image={el.images[0]}
					title={el.title}
					subtitle={el.subtitle}
					publicationDate={el.createdAt}
					fetchData={fetchData}
				/>
			));
		}
		if (state.activeTab === "stories") {
			if (state.hasStories === true) {
				listings = state.places.map((el) => (
					<ContentBox
						key={el._id}
						type={el.type}
						id={el._id}
						image={el.images[0]}
						title={el.title}
						subtitle={el.subtitle}
						publicationDate={el.createdAt}
						fetchData={fetchData}
					/>
				));
			} else {
				listings = noresults;
			}
		}
	} else {
		filterBox = null;
		listings = noresults;
	}

	const activeTab = {
		backgroundColor: "#abc3f4",
		borderRadius: "8px",
		cursor: "pointer",
		color: "#0d1f44",
	};

	return (
		<div id="dashboard">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={user}
			/>
			<Container fluid className="top-nav">
				<div className="top-nav-wrapper">
					<h1 className="top-nav-title db">Dashboard</h1>
				</div>
			</Container>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<ul>
								<li className="list-title">Your getaways</li>
								<li
									className="list-item"
									style={state.activeTab === "all" ? activeTab : null}
									onClick={() => {
										getAllListings();
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-layout-list"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#0d1f44"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<rect x="4" y="4" width="16" height="6" rx="2" />
										<rect x="4" y="14" width="16" height="6" rx="2" />
									</svg>
									All
								</li>
								<li
									className="list-item"
									style={state.activeTab === "activities" ? activeTab : null}
									onClick={() => setState({...state, activeTab: "activities"})}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-route"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#0d1f44"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<circle cx="6" cy="19" r="2" />
										<circle cx="18" cy="5" r="2" />
										<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
									</svg>
									Activities
								</li>
								<li
									className="list-item"
									style={state.activeTab === "places" ? activeTab : null}
									onClick={() => setState({...state, activeTab: "places"})}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-bed"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#0d1f44"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />
										<circle cx="7" cy="10" r="1" />
									</svg>
									Places
								</li>
								<li
									className="list-item"
									style={state.activeTab === "stories" ? activeTab : null}
									onClick={() => setState({...state, activeTab: "stories"})}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-notebook"
										width="28"
										height="28"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#0d1f44"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
										<line x1="13" y1="8" x2="15" y2="8" />
										<line x1="13" y1="12" x2="15" y2="12" />
									</svg>
									Stories
								</li>
							</ul>
							<div className="new">
								<ul>
									<li>
										<Button
											className="btn btn-primary text-center sidebar"
											onClick={handleModalVisibility}
										>
											Add getaway
										</Button>
									</li>
								</ul>
							</div>
						</div>
						<div className="col right">
							{filterBox}
							<div className="content-box-wrapper">{listings}</div>
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

export default Dashboard;
