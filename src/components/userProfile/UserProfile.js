import React, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar";
import {Container, Row, Button, Spinner} from "react-bootstrap";
import ContentService from "../../services/contentService";
import EditProfileModal from "../modals/EditProfileModal";
import {Link} from "react-router-dom";
import PublicContentBox from "../listings/PublicContentBox";

const UserProfile = (props) => {
	const initialState = {
		loggedUser: props.user,
		id: props.match.params.id,
		joinedYear: 0,
		userProfile: {},
		isUserAvailable: false,
		activities: [],
		places: [],
		stories: [],
		isFetching: false,
		hasListings: false,
		hasActivities: false,
		hasPlaces: false,
		hasStories: false,
		activeTab: "activities",
		cover: "",
		isCoverReadyToUpload: false,
	};
	const [state, setState] = useState(initialState);
	const [modalVisibility, setModalVisibility] = useState(false);
	const handleModalVisibility = () => setModalVisibility(true);
	const hideModalVisibility = () => setModalVisibility(false);

	const service = new ContentService();

	useEffect(() => {
		const fetchData = async () => {
			setState({...state, isFetching: true});
			const userDetails = await service.getUserProfile(state.id);
			const userActivities = await service.userActivities(state.id);
			const userPlaces = await service.getUserPlaces(state.loggedUser._id);
			const userStories = await service.getUserStories(state.loggedUser._id);
			let hasListings, hasActivities, hasPlaces, hasStories, yearJoined;
			userActivities.length > 0
				? (hasActivities = true)
				: (hasActivities = false);
			userPlaces.length > 0 ? (hasPlaces = true) : (hasPlaces = false);
			userStories.length > 0 ? (hasStories = true) : (hasStories = false);
			userActivities.length > 0 ||
			userPlaces.length > 0 ||
			userStories.length > 0
				? (hasListings = true)
				: (hasListings = false);

			const getJoinedDate = () => {
				const joinedDate = new Date(userDetails.createdAt);
				return (yearJoined = joinedDate.getFullYear());
			};
			getJoinedDate();
			setState({
				...state,
				userProfile: userDetails,
				joinedYear: yearJoined,
				isUserAvailable: true,
				activities: userActivities,
				places: userPlaces,
				stories: userStories,
				isFetching: false,
				hasListings: hasListings,
				hasActivities: hasActivities,
				hasPlaces: hasPlaces,
				hasStories: hasStories,
			});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchData = async () => {
		setState({...state, isFetching: true});
		const userActivities = await service.userActivities(state.id);
		const userPlaces = await service.getUserPlaces(state.loggedUser._id);
		const userStories = await service.getUserStories(state.loggedUser._id);
		let hasListings, hasActivities, hasPlaces, hasStories;
		userActivities.length > 0
			? (hasActivities = true)
			: (hasActivities = false);
		userPlaces.length > 0 ? (hasPlaces = true) : (hasPlaces = false);
		userStories.length > 0 ? (hasStories = true) : (hasStories = false);
		userActivities.length > 0 || userPlaces.length > 0 || userStories.length > 0
			? (hasListings = true)
			: (hasListings = false);
		setState({
			...state,
			activities: userActivities,
			places: userPlaces,
			stories: userStories,
			isFetching: false,
			hasListings: hasListings,
			hasActivities: hasActivities,
			hasPlaces: hasPlaces,
			hasStories: hasStories,
		});
	};

	let listings, contentType, linkTo, noResultsCTA;

	switch (state.activeTab) {
		case "activities":
			contentType = "activity";
			linkTo = "/activity-composer";
			noResultsCTA = (
				<Link to={linkTo} className="btn btn-primary text-center">
					Add {contentType}
				</Link>
			);
			break;
		case "places":
			contentType = "place";
			linkTo = "/place-composer";
			noResultsCTA = (
				<Link to={linkTo} className="btn btn-primary text-center">
					Add {contentType}
				</Link>
			);
			break;
		case "stories":
			contentType = "story";
			linkTo = "/story-composer";
			noResultsCTA = (
				<Link to={linkTo} className="btn btn-primary text-center">
					Add {contentType}
				</Link>
			);
			break;
		default:
			contentType = "getaway";
			linkTo = "/activity-composer";
			noResultsCTA = (
				<Button
					className="btn btn-primary text-center"
					onClick={handleModalVisibility}
				>
					Add getaway
				</Button>
			);
	}

	let noresults = (
		<div className="box empty d-flex">
			<div className="media">
				<img src="../../no-results.svg" alt="Graphic no results" />
			</div>
			<div className="text">
				<p>
					Oh no, this looks so empty.
					<br />
					Create your first {contentType} to inspire others.
				</p>
				{noResultsCTA}
			</div>
		</div>
	);

	if (state.hasListings === true) {
		if (state.activeTab === "activities") {
			if (state.hasActivities === true) {
				listings = state.activities.map((el) => (
					<PublicContentBox
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
		if (state.activeTab === "places") {
			if (state.hasPlaces === true) {
				listings = state.places.map((el) => (
					<PublicContentBox
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
		if (state.activeTab === "stories") {
			if (state.hasStories === true) {
				listings = state.stories.map((el) => (
					<PublicContentBox
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
		listings = noresults;
	}

	const activeTab = {
		backgroundColor: "#abc3f4",
		borderRadius: "8px",
		cursor: "pointer",
		color: "#0d1f44",
	};

	let mainButton;
	if (state.loggedUser) {
		if (state.userProfile._id === state.loggedUser._id) {
			mainButton = (
				<Button
					className="btn btn-primary text-center sidebar"
					onClick={handleModalVisibility}
				>
					Edit profile
				</Button>
			);
		} else {
			mainButton = (
				<Button className="btn btn-primary text-center sidebar d-flex align-items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-plus"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#fff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" />
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>{" "}
					Follow
				</Button>
			);
		}
	} else {
		mainButton = (
			<Button className="btn btn-primary text-center sidebar d-flex align-items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="icon icon-tabler icon-tabler-plus"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="#fff"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" />
					<line x1="12" y1="5" x2="12" y2="19" />
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>{" "}
				Sign up
			</Button>
		);
	}

	const handleFileUpload = async (e) => {
		const fileToUpload = e.target.files[0];
		const uploadData = new FormData();
		uploadData.append("imageUrl", fileToUpload);
		const uploadedFile = await service.uploadFile(uploadData);
		setState({...state, cover: uploadedFile.path, isCoverReadyToUpload: true});
	};

	const refreshUserData = () => {
		service.getUserProfile(state.id).then((res) => {
			props.getUserDetails(res);
			setState({
				...state,
				userProfile: res,
				loggedUser: res,
				isCoverReadyToUpload: false,
			});
		});
	};

	useEffect(() => {
		const handleSubmit = () => {
			const {_id} = state.loggedUser;
			const {cover} = state;
			service.editUserCover(_id, cover).then(() => {
				refreshUserData();
			});
			setState({...state, isCoverReadyToUpload: false});
		};
		if (state.isCoverReadyToUpload === true) {
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isCoverReadyToUpload]);

	if (state.isFetching === true) {
		return (
			<Container className="spinner d-flex justify-space-between">
				<Spinner animation="border" role="status" variant="primary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	return (
		<div id="userProfile">
			<NavigationBar
				logo_url={
					"https://res.cloudinary.com/juligoodie/image/upload/v1598554049/Getaways.guru/logo_getaways_navbar_tpsd0w.svg"
				}
				user={props.user}
			/>
			<Container fluid className="mw-1600">
				<Row>
					<div className="box d-flex">
						<div className="col left">
							<div className="user box bordered">
								<div className="avatar user-avatar">
									<img
										src={state.userProfile.avatar}
										alt={state.userProfile.fullName}
									/>
								</div>
								<div className="user-meta">
									<h1 className="user-fullName">
										{state.userProfile.fullName}
									</h1>
									<ul>
										<li className="user-username">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-at"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="12" cy="12" r="4" />
												<path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
											</svg>{" "}
											{state.userProfile.username || "username"}
										</li>
										<li className="user-followers">
											<span>225</span> following
										</li>
										<li className="user-following">
											<span>65</span> followers
										</li>
										<hr />
										<li className="user-bio">
											{state.userProfile.bio || "No bio"}
										</li>
										<hr />
										{/* <li className="user-property d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-building-arch"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<line x1="3" y1="21" x2="21" y2="21" />
												<path d="M4 21v-15a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v15" />
												<path d="M9 21v-8a3 3 0 0 1 6 0v8" />
											</svg>
											<div className="property-name">
												Manages<Link to="/">Cal Ouaire</Link>
											</div>
										</li>
										<li className="user-property d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-route"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="6" cy="19" r="2" />
												<circle cx="18" cy="5" r="2" />
												<path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
											</svg>
											<div className="property-name">
												Manages
												<Link to="/">Comarcaventura: Rutes amb Seagway</Link>
											</div>
										</li> */}
										<li className="user-location d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-map-pin"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<circle cx="12" cy="11" r="3" />
												<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
											</svg>
											Lives in {state.userProfile.location || "not set"}
										</li>
										<li className="user-registration d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-calendar"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<rect x="4" y="5" width="16" height="16" rx="2" />
												<line x1="16" y1="3" x2="16" y2="7" />
												<line x1="8" y1="3" x2="8" y2="7" />
												<line x1="4" y1="11" x2="20" y2="11" />
												<line x1="11" y1="15" x2="12" y2="15" />
												<line x1="12" y1="15" x2="12" y2="18" />
											</svg>
											Joined in {state.joinedYear}
										</li>
										<li className="user-verified d-flex align-items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-shield-check"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="#2c3e50"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<path d="M9 12l2 2l4 -4" />
												<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
											</svg>
											Verified
										</li>
									</ul>
									<div className="new">
										<ul>
											<li>{mainButton}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col center">
							<div
								className="cover-picture box bordered"
								style={{
									backgroundImage: `url("${state.userProfile.cover}")`,
								}}
							>
								<label className="edit-cover">
									<input type="file" onChange={handleFileUpload} />
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-photo"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#ffffff"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="15" y1="8" x2="15.01" y2="8" />
										<rect x="4" y="4" width="16" height="16" rx="3" />
										<path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
										<path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
									</svg>{" "}
									Edit cover
								</label>
							</div>
							<div className="filter-bar">
								<Button
									className="d-flex align-items-center justify-content-center"
									variant="none"
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
										stroke="#2c3e50"
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
								</Button>
								<Button
									variant="none"
									className="d-flex align-items-center justify-content-center"
									style={state.activeTab === "places" ? activeTab : null}
									onClick={() => setState({...state, activeTab: "places"})}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-building-arch"
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
										<line x1="3" y1="21" x2="21" y2="21" />
										<path d="M4 21v-15a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v15" />
										<path d="M9 21v-8a3 3 0 0 1 6 0v8" />
									</svg>
									Places
								</Button>
								<Button
									variant="none"
									className="d-flex align-items-center justify-content-center"
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
										stroke="#2c3e50"
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
								</Button>
							</div>
							<div className="content-bar">{listings}</div>
						</div>
						<div className="col right">
							<div className="box bordered"></div>
						</div>
					</div>
				</Row>
			</Container>
			<EditProfileModal
				visibility={modalVisibility}
				hideModal={hideModalVisibility}
				user={state.userProfile}
				refreshUserData={refreshUserData}
			/>
		</div>
	);
};

export default UserProfile;
